import React from 'react';
import PropTypes from 'prop-types';
import withRouter from 'src/components/Common/withRouter';
import { removeCookie } from 'src/common/cookie';
import Login from 'src/pages/Authentication/Login';
// import { logoutUser } from "../../store/actions";

//redux
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

const Logout = () => {
  removeCookie('access_token');
  removeCookie('refresh_token');
  // const history = useNavigate();
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   dispatch(logoutUser(history));
  // }, [dispatch, history]);

  return <Login />;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
