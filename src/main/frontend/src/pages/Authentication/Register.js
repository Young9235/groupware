import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
  UncontrolledAlert,
} from 'reactstrap';

// Formik Validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Link } from 'react-router-dom';

// import images
import profileImg from 'src/assets/images/profile-img.png';
import logoImg from 'src/assets/images/logo.svg';
import phoneNumber from 'src/components/Common/phoneNumber';
import { signUp } from 'src/axios-apis/backend';

const Register = (props) => {
  //meta title
  document.title = 'Register | Skote - React Admin & Dashboard Template';
  // const dispatch = useDispatch();
  // console.log('register');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      login_id: '',
      user_name: '',
      password: '',
      password_confirm: '',
      phone_num: '',
    },
    validationSchema: Yup.object({
      login_id: Yup.string()
        .required('이메일을 입력해주세요.')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, '이메일 양식이 아닙니다.'),
      user_name: Yup.string().required('이름을 입력해주세요.'),
      password: Yup.string().required('비밀번호를 입력해주세요.'),
      password_confirm: Yup.string()
        .required('비밀번호 확인을 입력해주세요.')
        .oneOf([Yup.ref('password'), null], '패스워드가 일치하지 않습니다.'),
      phone_num: Yup.string()
        .min(10, '최소 10글자 이상입니다.')
        .max(13, '최대 13글자 이하입니다.')
        .matches(/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/, '전화번호 양식이 아닙니다.'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      signUp(values)
        .then((response) => {
          console.log(response);
          alert('가입을 환영합니다! ' + response.login_id + '님!');
          setLoading(false);
        })
        .catch((e) => {
          console.log('status code >>>> ' + e.response.status);
          if (e.response.status === 409) {
            setErrMsg('가입이 이미 완료 된 이메일입니다.');
          } else {
            setErrMsg(e.message);
          }
          setLoading(false);
        });
    },
  });
  useEffect(() => {
    validation.values.phone_num = phoneNumber(validation.values.phone_num);
  }, [validation.values]);

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
                      <div className="avatar-md profile-user-wid mb-3">
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
                      {errMsg && !loading ? (
                        <UncontrolledAlert color="danger" role="alert">
                          <i className="mdi mdi-block-helper me-2"></i>
                          {errMsg}
                        </UncontrolledAlert>
                      ) : null}
                      {/*{user && user ? (*/}
                      {/*  <Alert color="success">Register User Successfully</Alert>*/}
                      {/*) : null}*/}

                      {/*{registrationError && registrationError ? (*/}
                      {/*  <Alert color="danger">{registrationError}</Alert>*/}
                      {/*) : null}*/}

                      <div className="mb-3">
                        <Label className="form-label">
                          이메일(아이디) <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Input
                          id="login_id"
                          name="login_id"
                          className="form-control"
                          placeholder="Enter Email(ID)"
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
                          name="user_name"
                          type="text"
                          placeholder="Enter user_name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.user_name || ''}
                          invalid={!!(validation.touched.user_name && validation.errors.user_name)}
                        />
                        {validation.touched.user_name && validation.errors.user_name ? (
                          <FormFeedback type="invalid">{validation.errors.user_name}</FormFeedback>
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
                          type="password"
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
                        <Label className="form-label">연락처</Label>
                        <Input
                          id="phone_num"
                          name="phone_num"
                          className="form-control"
                          placeholder="Enter Phone Number"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone_num || ''}
                          invalid={!!(validation.touched.phone_num && validation.errors.phone_num)}
                        />
                        {validation.touched.phone_num && validation.errors.phone_num ? (
                          <FormFeedback type="invalid">{validation.errors.phone_num}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4">
                        <button className="col-12 btn btn-primary btn-block " type="submit">
                          {loading ? (
                            <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                          ) : (
                            '회원가입'
                          )}
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
