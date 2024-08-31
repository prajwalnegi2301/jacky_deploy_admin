import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext } from 'react';
import { useState } from 'react';


export const Context = createContext({ isAdminAuthenticated: false });

const AppWrapper = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});

  return (
    <Context.Provider
      value={{ isAdminAuthenticated, setIsAdminAuthenticated, admin, setAdmin }}
    >
      <App />
    </Context.Provider>

  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppWrapper />
)
