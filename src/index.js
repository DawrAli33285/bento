import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login';
import CreateBento from './CreateBento';
import Middleware from './components/Middleware';
import Redirect from './components/Redirect';
import AboutUs from './AboutUs';
import ChangeLog from './changelog';

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      <Redirect>
        <Login />
      </Redirect>
    ),
  },
  {
    path: "/create-bento/:userName",
    element: (
      <Middleware>
        <CreateBento />
      </Middleware>
    ),
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/changelog",
    element: <ChangeLog />,
  },
]);

// Render the root component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Measure performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
