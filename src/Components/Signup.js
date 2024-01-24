import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate,  } from 'react-router-dom'; // Import Link for routing
import '../css/signuplogin.css';

const Signup = ({setUserData}) => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/signup', formData);
      // Check if the response is successful
      if (response.status === 200) {
        alert('Signup successful!');

        navigate('/project')
         // Display a success message
      } else {
        alert('Signup failed. Please try again.'); // Display an error message
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(`Signup failed: ${error.response.data.error}`); // Display a specific error message
      } else {
        alert('Signup failed. Please try again.'); // Display a generic error message
      }
      console.error('Error submitting form:', error.message);
    }
  };
  return (
    <div className="signup-container">
      <h1>Signup Form</h1>
      <form onSubmit={handleSubmit} className="signup-form">
      <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {/* Add a link to the login page */}
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Signup;
