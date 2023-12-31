import PropTypes from 'prop-types';
import React, { useState, useMemo, useEffect } from 'react';

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback } from 'reactstrap';

//redux
import { Link, useNavigate } from 'react-router-dom';
import withRouter from 'src/components/Common/withRouter';

// Formik validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

//Social Media Imports
// import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

// import images
import profile from 'src/assets/images/profile-img.png';
import logo from 'src/assets/images/logo.svg';
import Loader from 'src/components/Common/Loader';
import { getCookie, removeCookie, setCookie } from 'src/common/cookie';
import { JWT_LOGIN } from 'src/axios-apis/url';
import { getAuthenticate } from 'src/axios-apis/api';
import { useSelector } from 'react-redux';

const Login = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useMemo(() => {
    if (getCookie('login_id')) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, []);

  useEffect(() => {
    console.log('login page');
    removeCookie('access_token');
    removeCookie('refresh_token');
  }, []);

  //meta title
  document.title = 'Login | Skote - React Admin & Dashboard Template';

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      login_id: getCookie('login_id') || '',
      password: '',
    },
    validationSchema: Yup.object({
      login_id: Yup.string().required('이메일을 입력해주세요.'),
      password: Yup.string().required('비밀번호를 입력해주세요.'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      getAuthenticate(JWT_LOGIN, values)
        .then((resData) => {
          if (resData.status === 'success') {
            // alert('로그인 성공!');
            if (isChecked) {
              setCookie('login_id', values.login_id);
            } else {
              removeCookie('login_id');
            }
            navigate('/dashboard', { replace: true }); // replace true 뒤로가기 불가, false 뒤로가기 가능(default)
          } else if (resData.status === 'authFail') {
            navigate('/auth-email-verification', {
              state: { email: values.login_id, type: 'Login' },
            });
          } else {
            setError('로그인 실패');
          }
        })
        .catch((e) => {
          // alert('로그인 실패');
          setError('아이디와 비밀번호를 잘 못 입력하였거나, 존재하지 않는 계정입니다.');
          console.log(e.message);
        });
      setLoading(false);
    },
  });

  // const { error } = useSelector((state) => ({
  //   error: state.props.error,
  // }));

  const onChangeCheckbox = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="home-btn d-none d-sm-block">
            <Link to="/" className="text-dark">
              <i className="bx bx-home h2" />
            </Link>
          </div>
          <div className="account-pages my-5 pt-sm-5">
            <Container>
              <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                  <Card className="overflow-hidden">
                    <div className="bg-primary bg-soft">
                      <Row>
                        <Col xs={7}>
                          <div className="text-primary p-4">
                            <h5 className="text-primary">
                              그룹웨어 사이트에 오신 것을 환영합니다!{' '}
                            </h5>
                            <p>로그인 해주세요.</p>
                          </div>
                        </Col>
                        <Col className="col-5 align-self-end">
                          <img src={profile} alt="" className="img-fluid" />
                        </Col>
                      </Row>
                    </div>
                    <CardBody className="pt-0">
                      <div>
                        <Link to="/" className="logo-light-element">
                          <div className="avatar-md profile-user-wid mb-4">
                            <span className="avatar-title rounded-circle bg-light">
                              <img src={logo} alt="" className="rounded-circle" height="34" />
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="p-2">
                        <Form
                          className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            // return false;
                          }}
                        >
                          {error !== '' ? <Alert color="danger">{error}</Alert> : null}

                          <div className="row mb-4" style={{ marginTop: '30px' }}>
                            <label className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-4">
                              <Input
                                name="login_id"
                                className="form-control"
                                placeholder="이메일을 입력해주세요."
                                type="text"
                                style={{ width: '300px' }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.login_id || ''}
                                invalid={
                                  !!(validation.touched.login_id && validation.errors.login_id) //touched.loginId && errors.loginId ? true : false
                                }
                              />
                              {validation.touched.login_id && validation.errors.login_id ? (
                                <FormFeedback type="invalid" style={{ width: '150px' }}>
                                  {validation.errors.login_id}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>

                          <div className="row mb-4">
                            <label className="col-3 col-form-label">Password</label>
                            <div className="col-5">
                              <Input
                                name="password"
                                value={validation.values.password || ''}
                                type="password"
                                style={{ width: '300px' }}
                                placeholder="비밀번호를 입력해주세요."
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                invalid={
                                  !!(validation.touched.password && validation.errors.password)
                                }
                              />
                              {validation.touched.password && validation.errors.password ? (
                                <FormFeedback type="invalid" style={{ width: '150px' }}>
                                  {validation.errors.password}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>

                          <div className="form-check">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              name="lsRememberMe"
                              onChange={onChangeCheckbox}
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label className="form-check-label" htmlFor="customControlInline">
                              이메일 저장
                            </label>
                          </div>

                          <div className="mt-3 d-grid">
                            <button className="btn btn-info btn-block" type="submit">
                              로그인
                            </button>
                          </div>

                          <Link to="/register" className="fw-medium text-primary">
                            <div className="mt-3 d-grid">
                              <button className="btn btn-light btn-block">회원가입</button>
                            </div>
                          </Link>

                          <div className="mt-4 text-center">
                            <Link to="/forgot-password" className="text-muted">
                              <i className="mdi mdi-lock me-1" />
                              Forgot your password?
                            </Link>
                          </div>
                        </Form>
                      </div>
                    </CardBody>
                  </Card>
                  <div className="mt-5 text-center">
                    <p>
                      Don&#39;t have an account ?{' '}
                      <Link to="/register" className="fw-medium text-primary">
                        {' '}
                        Signup now{' '}
                      </Link>{' '}
                    </p>
                    <p>
                      © {new Date().getFullYear()} Skote. Crafted with{' '}
                      <i className="mdi mdi-heart text-danger" /> by Themesbrand
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
