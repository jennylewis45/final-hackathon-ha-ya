import React, { useState } from 'react';
import axios from 'axios';
import '../css/signuplogin.css';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom

const Login = ({setUserData}) => {
  const navigate=useNavigate()
    const [formData, setFormData] = useState({
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
          const response = await axios.post('http://localhost:8000/login', formData);
          if (response.status === 200) {

            alert('Login successful!');
          

            navigate('/project')

            // Redirect or perform any other action after successful login
          } else {
            alert('Login failed. Please check your credentials.');
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            alert(`Login failed: ${error.response.data.error}`);
          } else {
            alert('Login failed. Please try again.');
          }
          console.error('Error submitting form:', error.message);
        }
      };
  return (
    <div className='login-container'>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
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

      {/* Add a link to the signup page */}
      <p>Don't have an account? <Link to="/signup">Signup here</Link></p>
    </div>
  );
};

export default Login;





