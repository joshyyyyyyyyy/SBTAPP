// src/App.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login.jsX';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/verifyToken', { headers: { 'x-access-token': token } })
        .then(response => {
          if (response.status === 200) {
            setIsLoggedIn(true);
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Login onLogin={handleLogin} />} />
          <PrivateRoute path="/home" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
