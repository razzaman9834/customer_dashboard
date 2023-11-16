import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Customers from './components/Customers';
import CustomerDetails from './components/CustomerDetails';
import CityList from './components/CityList';
import EditCustomer from './components/EditCustomer'; 

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/cities">City List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/cities" element={<CityList />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path="/customers/:id/edit" element={<EditCustomer />} />
          <Route path="/" element={<Customers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
