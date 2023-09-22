import { combineReducers } from 'redux';

// ==================== [reducer 컴포넌트 모음] =====================

// Front
import Layout from 'src/store/layout/reducer';

// Authentication
// import Login from "./auth/login/reducer";
import Account from './auth/register/reducer';
import ForgetPassword from './auth/forgetpwd/reducer';
import Profile from './auth/profile/reducer';

//jobs
import JobReducer from 'src/store/jobs/reducer';

//pages
import pagesReducer from 'src/store/pages/reducer';

//contacts
import contacts from 'src/store/contacts/reducer';

const rootReducer = combineReducers({
  // public
  Layout,
  // Login,
  Account,
  ForgetPassword,
  Profile,
  JobReducer,
  pagesReducer,
  contacts,
});

export default rootReducer;
