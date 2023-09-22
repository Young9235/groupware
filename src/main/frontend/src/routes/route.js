import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../common/cookie';

const Authmiddleware = (props) => {
  if (!getCookie('refresh_token')) {
    return <Navigate to={{ pathname: '/login', state: { from: props.location } }} />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Authmiddleware;
