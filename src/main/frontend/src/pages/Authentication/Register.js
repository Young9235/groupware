import React, { useEffect } from 'react';
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from 'reactstrap';

// Formik Validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

// action
import { registerUser, apiError } from 'src/store/actions';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

// import images
import profileImg from 'src/assets/images/profile-img.png';
import logoImg from 'src/assets/images/logo.svg';

const Register = (props) => {
  //meta title
  document.title = 'Register | Skote - React Admin & Dashboard Template';

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      login_id: '',
      email: '',
      username: '',
      password: '',
      password_confirm: '',
      phone_num: '',
    },
    validationSchema: Yup.object({
      login_id: Yup.string().required('Please Enter Your Id'),
      username: Yup.string().required('Please Enter Your Username'),
      password: Yup.string().required('Please Enter Your Password'),
      password_confirm: Yup.string().required('Please Enter Your Password Confirm'),
      email: Yup.string().required('Please Enter Your Email'),
      phone_num: Yup.string().required('Please Enter Your Phone Number'),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  const { user, registrationError, loading } = useSelector((state) => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }));

  // useEffect(() => {
  //   dispatch(apiError(""));
  // }, []);

  return (
    <React.Fragment>
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
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free Skote account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img src={logoImg} alt="" className="rounded-circle" height="34" />
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
                        return false;
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">Register User Successfully</Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">
                          아이디 <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Input
                          id="login_id"
                          name="login_id"
                          className="form-control"
                          placeholder="Enter Your ID"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.login_id || ''}
                          invalid={!!(validation.touched.login_id && validation.errors.login_id)}
                        />
                        {validation.touched.login_id && validation.errors.login_id ? (
                          <FormFeedback type="invalid">{validation.errors.login_id}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">
                          이름 <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Input
                          name="username"
                          type="text"
                          placeholder="Enter username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ''}
                          invalid={!!(validation.touched.username && validation.errors.username)}
                        />
                        {validation.touched.username && validation.errors.username ? (
                          <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">
                          비밀번호 <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ''}
                          invalid={!!(validation.touched.password && validation.errors.password)}
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">
                          비밀번호 확인 <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Input
                          name="password_confirm"
                          type="password_confirm"
                          placeholder="Enter Password confirm"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password_confirm || ''}
                          invalid={
                            !!(
                              validation.touched.password_confirm &&
                              validation.errors.password_confirm
                            )
                          }
                        />
                        {validation.touched.password_confirm &&
                        validation.errors.password_confirm ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password_confirm}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">
                          이메일 <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ''}
                          invalid={!!(validation.touched.email && validation.errors.email)}
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4">
                        <button className="col-12 btn btn-primary btn-block " type="submit">
                          회원가입
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Skote{' '}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{' '}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {' '}
                    Login
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
    </React.Fragment>
  );
};

export default Register;
