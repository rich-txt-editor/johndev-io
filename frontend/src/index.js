import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// ReactDOM.render(<App />, document.getElementById('react-root'));
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
