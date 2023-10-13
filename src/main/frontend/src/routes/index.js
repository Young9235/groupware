import React from 'react';
import { Navigate } from 'react-router-dom';

// Profile
import UserProfile from 'src/pages/Authentication/user-profile';

// Authentication related pages
import Login from 'src/pages/Authentication/Login';
import Logout from 'src/pages/Authentication/Logout';
import Register from 'src/pages/Authentication/Register';
import ForgetPwd from 'src/pages/Authentication/ForgetPassword';
import ContactsList from 'src/pages/Contacts/ContactList/contacts-list';

// Dashboard
import Dashboard from 'src/pages/Dashboard/index';
import JobList from 'src/pages/JobList';
import Codes from 'src/pages/Codes';
import User from 'src/pages/User';
import Menu from 'src/pages/Menu';
import Boards from 'src/pages/Boards';
import Auths from 'src/pages/Auth';
import Monitoring from 'src/pages/Monitoring';
import EmailVerification from 'src/pages/Authentication/EmailVerification';
import EmailAuthConfirm from 'src/pages/Authentication/EmailAuthConfirm';

// 로그인 한(인증O) 사람에게 보일 페이지 메뉴
const authProtectedRoutes = [
  { path: '/dashboard', component: <Dashboard /> },

  // //profile
  { path: '/profile', component: <UserProfile /> },

  { path: '/code/*', component: <Codes /> },
  { path: '/board/*', component: <Boards /> },
  { path: '/user/*', component: <User /> },
  { path: '/menu/*', component: <Menu /> },
  { path: '/admin/auth/*', component: <Auths /> },
  { path: '/monitoring/*', component: <Monitoring /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: '/',
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: '/job-list', component: <JobList /> },
  { path: '/contacts-list', component: <ContactsList /> },
];

// 로그인 안한(인증X) 사람에게 보일 페이지 메뉴
const publicRoutes = [
  { path: '/logout', component: <Logout /> },
  { path: '/login', component: <Login /> },
  { path: '/forgot-password', component: <ForgetPwd /> },
  { path: '/register', component: <Register /> },
  { path: '/auth-email-verification', component: <EmailVerification /> },
  { path: '/auth-email-confirm/:email/:key', component: <EmailAuthConfirm /> },
];

export { authProtectedRoutes, publicRoutes };
