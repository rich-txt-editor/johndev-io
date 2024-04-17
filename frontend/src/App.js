import React from 'react';
import './App.css';
import Projects from './components/Projects';


function App() {
  // eslint-disable-next-line
  const [isNavbarExpanded, setIsNavbarExpanded] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="flex-grow transition-margin duration-300 ease-in-out mb-20">
        <Projects />
      </main>
    </div>
  );
}

export default App;