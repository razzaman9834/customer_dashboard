import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './CustomerDetails.css';
const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='container'>
      <h2>Customer Details</h2>
      {customer ? (
        <div>
          <p>
            <strong>Name:</strong> {customer.first_name} {customer.last_name}
          </p>
          <p>
            <strong>City:</strong> {customer.city}
          </p>
          <p>
            <strong>Company:</strong> {customer.company}
          </p>
          
          <Link to="/">Back to Dashboard</Link>
          <Link to={`/customers/${id}/edit`}><button>Edit</button></Link>

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CustomerDetails;
