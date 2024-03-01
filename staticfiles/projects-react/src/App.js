import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [projects.setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects/')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Projects</h1>
        {projects.map(project => (
          <div key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;:let arrayIndex = array.length
while (arrayIndex--) {
  
}
