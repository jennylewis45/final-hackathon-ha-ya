import React, { useState } from 'react';
import '../css/styles.css'

const NewForm = ({ onClose, onSubmit }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [developerName, setDeveloperName] = useState('');
  const [description, setDescription] = useState('');
  const [hostedURL, setHostedURL] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form data, you can add more validation logic as needed

    // Create an object with the form data
    const formData = {
      projectTitle,
      developerName,
      description,
      hostedURL,
    };

    // Pass the form data to the parent component for further processing
    onSubmit(formData);

    // Close the form after submission
    onClose();
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
