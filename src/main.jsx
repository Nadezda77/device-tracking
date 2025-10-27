import React from 'react'
import ReactDOM from "react-dom/client"; // <-- this is needed

import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "./homepage.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
