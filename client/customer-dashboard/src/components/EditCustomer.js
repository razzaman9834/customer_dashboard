
import React, { useState } from 'react';
import { useParams} from 'react-router-dom';
import './EditCustomer.css';
const EditCustomer = () => {
    const { id } = useParams();
    
   // console.log("checkk",id);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    city: '',
    company: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange  = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

 
    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('company', formData.company);
    formDataToSend.append('file', formData.file);

   
    fetch(`http://localhost:4000/api/customers/${id}`, {
      method: 'PUT',
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Customer updated successfully', data);
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error updating customer', error);
       
      });
  };

  return (
    <div className='container'>
      <h2>Edit Customer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
        <br />
        <label>
          Company:
          <input type="text" name="company" value={formData.company} onChange={handleChange} />
        </label>
        <br />
        <label>
          Upload File:
          <input type="file" name="file" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditCustomer;
