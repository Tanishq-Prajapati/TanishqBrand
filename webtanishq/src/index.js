import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import ForgotPassword from './screens/ForgotPassword';
import VerifyAccount from './screens/VerifyAccount';
import {useCookies} from "react-cookie";
import Profile from './screens/Profile';

const RootComponent = ()=>{
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App></App>
    }
    // {
    //   path: '/login',
    //   element: <Login></Login>
    // },
    // {
    //   path: '/signup',
    //   element: <Signup></Signup>
    // },
    // {
    //   path: '/forgotpassword',
    //   element: <ForgotPassword></ForgotPassword>
    // },
    // {
    //   path: '/verifyAccount',
    //   element: <VerifyAccount></VerifyAccount>
    // },
    // {
    //   path: '/profile',
    //   element: <Profile></Profile>
    // }
  ])
  return <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RootComponent></RootComponent>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();