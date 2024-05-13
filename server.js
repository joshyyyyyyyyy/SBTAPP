const http = require('http');
const fs = require('fs');
const path = require('path');
const { createServer } = require('http');
const { readFile } = require('fs').promises;
const { extname } = require('path');
const { renderToString } = require('react-dom/server');
const React = require('react');

const PORT = 3000;

const server = createServer(async (req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './public/index.html'; // Serve index.html from the public folder for root URL
    }

    const ext = extname(filePath);
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    }[ext] || 'application/octet-stream';

    try {
        const content = await readFile(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': contentType });

        if (ext === '.jsx') {
            // Render the JSX file
            const Home = require(filePath.replace('.jsx', '')); // Import your Home component
            const jsxContent = React.createElement(Home);
            const html = renderToString(jsxContent);
            res.end(html);
        } else {
            res.end(content);
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            // File not found
            res.writeHead(404);
            res.end('404 Not Found');
        } else {
            // Server error
            res.writeHead(500);
            res.end('500 Internal Server Error');
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
