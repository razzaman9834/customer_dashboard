import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CityList.css';
const CityList = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cities');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <h2>City List</h2>
      <ul>
        {cities.map((city) => (
          <li key={city.city}>
            {city.city} - {city.customer_count} customers
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
