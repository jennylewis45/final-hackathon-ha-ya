import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../css/styles.css';


const NewForm = ({ onClose }) => {
  const navigate=useNavigate()
  const [projectTitle, setProjectTitle] = useState('');
  const [developerName, setDeveloperName] = useState('');
  const [description, setDescription] = useState('');
  const [hostedURL, setHostedURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        projectTitle,
        developerName,
        description,
        hostedURL,
      };

      // Send form data to the server
      const response = await axios.post('http://localhost:8000/submitProject', formData);

      // Check if the submission was successful
      if (response.status === 200) {
        navigate('/project')
        // Close the form after successful submission
        onClose();
        alert('Project submitted successfully!');
      } else {
        alert('Failed to submit project. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Failed to submit project. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Your Project</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="projectTitle">Project Title:</label>
        <input
          type="text"
          id="projectTitle"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          required
        />

        <label htmlFor="developerName">Developer Name:</label>
        <input
          type="text"
          id="developerName"
          value={developerName}
          onChange={(e) => setDeveloperName(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="hostedURL">Hosted URL:</label>
        <input
          type="url"
          id="hostedURL"
          value={hostedURL}
          onChange={(e) => setHostedURL(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewForm;

