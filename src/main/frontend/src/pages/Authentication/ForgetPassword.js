import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import withRouter from 'src/components/Common/withRouter';

// Formik Validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

// import images
import profile from 'src/assets/images/profile-img.png';
import logo from 'src/assets/images/logo.svg';
import { createNewPassword } from 'src/axios-apis/backend';

const ForgetPasswordPage = (props) => {
  //meta title
  document.title = 'Forget Password | Skote - React Admin & Dashboard Template';

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      login_id: '',
    },
    validationSchema: Yup.object({
      login_id: Yup.string().required('이메일을 입력 해 주세요.'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      createNewPassword(values)
        .then((response) => {
          setLoading(false);
          console.log(response);
          setMessage('success');
        })
        .catch((e) => {
          setLoading(false);
          console.error(e.message);
          setMessage('fail');
        });
    },
  });

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
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Skote.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-light">
                        <img src={logo} alt="" className="rounded-circle" height="34" />
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    {!loading && message === 'fail' ? (
                      <Alert color="danger">
                        가입이 안 된 메일이거나, 메일주소가 잘 못 되었습니다.
                      </Alert>
                    ) : null}
                    {!loading && message === 'success' ? (
                      <Alert color="success">
                        임시 비밀번호가 발송되었습니다. 메일을 확인해주세요.
                      </Alert>
                    ) : null}
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="login_id"
                          className="form-control"
                          placeholder="Enter login_id"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.login_id || ''}
                          disabled={loading}
                          invalid={
                            validation.touched.login_id && validation.errors.login_id ? true : false
                          }
                        />
                        {validation.touched.login_id && validation.errors.login_id ? (
                          <FormFeedback type="invalid">{validation.errors.login_id}</FormFeedback>
                        ) : null}
                      </div>
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? (
                              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                            ) : (
                              'Reset'
                            )}
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{' '}
                  <Link to="/login" className="font-weight-medium text-primary">
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

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
