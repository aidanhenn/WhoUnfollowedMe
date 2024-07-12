import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Hero from './Hero';
import FAQ from './FAQ'

ReactDOM.render(
  <React.StrictMode>
    <Hero/> 
    <App />
    <FAQ/>
  </React.StrictMode>,
  document.getElementById('root')
);
