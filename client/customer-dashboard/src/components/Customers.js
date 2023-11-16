import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Customers.css';
const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/customers?page=${page}&search=${search}`);
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };

    fetchData();
  }, [page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='container'>
      <h2>Customer Dashboard</h2>
      <input type="text" placeholder="Search..." value={search} onChange={handleSearchChange} />
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <Link to={`/customers/${customer.id}`}>
              {customer.first_name} {customer.last_name} - {customer.city}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default Customers;
