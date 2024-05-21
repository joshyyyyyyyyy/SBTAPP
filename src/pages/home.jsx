import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './app.css'; // Import CSS file for styling

const ProductList = [
  { code: 'FL001', description: 'Rose', shipped: 0, waste: 0 },
  { code: 'FL002', description: 'Lily', shipped: 0, waste: 0 },
  { code: 'FL003', description: 'Tulip', shipped: 0, waste: 0 },
  // Add more products as needed
];

const StoreOptions = ['Store #1', 'Store #2', 'Store #3']; // Add more store options as needed

const App = () => {
  const [store, setStore] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [products, setProducts] = useState(ProductList);

  const handleQuantityChange = (index, type, value) => {
    const updatedProducts = [...products];
    if (type === 'shipped') {
      updatedProducts[index].shipped += value;
    } else if (type === 'waste') {
      updatedProducts[index].waste += value;
    }
    setProducts(updatedProducts);
  };

  return (
    <div className="app-container"> {/* Apply container class for layout */}
      <h1 className="heading">Product Quantities</h1> {/* Apply heading style */}
      <div className="select-container">
        <label htmlFor="store" className="label">Select Store:</label>
        <select id="store" value={store} onChange={(e) => setStore(e.target.value)} className="select">
          <option value="">Select Store</option>
          {StoreOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="date-picker-container">
        <label htmlFor="deliveryDate" className="label">Select Delivery Date:</label>
        <DatePicker
          id="deliveryDate"
          selected={deliveryDate}
          onChange={date => setDeliveryDate(date)}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select Delivery Date"
          className="date-picker"
        />
      </div>
      <table className="product-table"> {/* Apply table style */}
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Description</th>
            <th>Shipped</th>
            <th>Waste</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.code}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => handleQuantityChange(index, 'shipped', -1)}>-</button>
                {product.shipped}
                <button onClick={() => handleQuantityChange(index, 'shipped', 1)}>+</button>
              </td>
              <td>
                <button onClick={() => handleQuantityChange(index, 'waste', -1)}>-</button>
                {product.waste}
                <button onClick={() => handleQuantityChange(index, 'waste', 1)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
