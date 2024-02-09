import React, { useState,useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import '../css/styles.css';
import pas from '../images/pas.jpg';
import bgggg from '../images/bgggg.jpg';
import merii from '../images/merii.jpeg';
import test from '../images/test.jpg';
import meme from '../images/meme.jpg';
import filter from '../images/filter.gif';
import NewForm from './NewForm'; // Assuming you have created a NewForm component

const Project = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []); // Fetch projects when the component mounts

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/projects');
      setShowProjects(response.data); // Update projects state with data from backend
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };


  const toggleForm = () => {
    setShowForm(!showForm);
    setShowProjects(false);
  };

  const showProjectsList = () => {
    setShowProjects(true);
    setShowForm(false);
  };

  const projects = [
    {
      title: 'Project 1',
      description:
        'A project in which I make a random password generator using react ',
      technologies: ['React.js'],
      link: 'https://aquamarine-meringue-c832ba.netlify.app/',
      thumbnail: pas,
    },
    {
      title: 'Project 2',
      description:
        'A project in which I make a background changer using react',
      technologies: ['React.js'],
      link: 'https://nimble-macaron-34d61c.netlify.app/',
      thumbnail: bgggg,
    },
    {
      title: 'Project 3',
      description: 'My First Portfolio Website using Html,Css and Javascript',
      technologies: ['html', 'css', 'Js'],
      link: 'https://brilliant-blini-cd2491.netlify.app/',
      thumbnail: merii,
    },
    {
      title: 'Project 4',
      description:
        'A project in which I make a Testimonial Slider using Html,Css and Javascript',
      technologies: ['html', 'css', 'Js'],
      link: 'https://sparkling-toffee-134c61.netlify.app/',
      thumbnail: test,
    },
    {
      title: 'Project 5',
      description:
        'A project in which I make a random Meme generator using Html,Css and Javascript',
      technologies: ['html', 'css', 'Js'],
      link: 'https://glittering-fenglisu-69dff4.netlify.app/',
      thumbnail: meme,
    },
    {
      title: 'Project 6',
      description:
        'A project in which I make a Filterable Image gallery using Html,Css and Javascript',
      technologies: ['html', 'css', 'Js'],
      link: 'https://admirable-lily-b972f6.netlify.app/',
      thumbnail: filter,
    },
  ];

  return (
    <div className="projects-container">
      <h2 className="projects-heading">Projects</h2>

      <button onClick={toggleForm}>
        {showForm ? 'Show Projects' : 'Submit a Project'}
      </button>

      {showForm && <NewForm onClose={showProjectsList} />}

      {showProjects && (
        <div className="projects-list">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>
                <strong>Technologies:</strong> {project.technologies.join(', ')}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
              <img
                src={project.thumbnail}
                alt={`Thumbnail for ${project.title}`}
              />
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default Project;




