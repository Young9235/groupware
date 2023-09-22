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
import { registerUser } from '../../store/actions';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

// import images
import profileImg from '../../assets/images/profile-img.png';
import logoImg from '../../assets/images/logo.svg';

const Register = (props) => {
  //meta title
  document.title = 'Register | Skote - React Admin & Dashboard Template';

  const history = useNavigate();
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      loginId: '',
      email: '',
      userName: '',
      userPassword: '',
      userPasswordCheck: '',
      userPhoneNum: '',
      rollId: 2,
      useStatus: 'Y',
    },
    validationSchema: Yup.object({
      loginId: Yup.string().required('아이디를 입력해주세요.'),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, '이메일 양식으로 등록바랍니다.')
        .required('이메일을 입력해주세요.'),
      userName: Yup.string().required('사용자 명을 입력해주세요.'),
      userPassword: Yup.string().required('비밀번호를 입력해주세요.'),
      userPasswordCheck: Yup.string()
        .oneOf([Yup.ref('userPassword'), null], '비밀번호를 확인해주세요')
        .required('비밀번호를 확인해주세요.'),
      // userPasswordCheck: Yup.string().matches.required("비밀번호를 확인해주세요."),
      userPhoneNum: Yup.string()
        .matches(/^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/, '전화번호 양식으로 등록바랍니다.')
        .required('전화번호를 입력해주세요.'),
    }),
    onSubmit: (values) => {
      console.log('values >>>>>>>>>>>>>>>>', values);
      dispatch(registerUser(values, history));
    },
  });

  const { user, registrationError, loading } = useSelector((state) => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }));

  // useEffect(() => {
  //   dispatch(apiError(''));
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
                        <h5 className="text-primary">회원가입</h5>
                        <p>계정을 생성해주세요.</p>
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
                      {/* {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null} */}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="row mb-4">
                        <label className="col-sm-2 col-form-label" style={{ width: '80px' }}>
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>아이디
                        </label>
                        <div className="col-sm-3">
                          <Input
                            name="loginId"
                            className="form-control"
                            placeholder="아이디를 입력해주세요."
                            type="text"
                            style={{ width: '250px', marginLeft: '35px' }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.loginId || ''}
                            invalid={
                              validation.touched.loginId && validation.errors.loginId ? true : false
                            }
                          />
                          {validation.touched.loginId && validation.errors.loginId ? (
                            <FormFeedback
                              type="invalid"
                              style={{ width: '150px', marginLeft: '35px' }}
                            >
                              {validation.errors.loginId}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>

                      <div className="row mb-4" style={{ marginTop: '30px' }}>
                        <label className="col-sm-2 col-form-label" style={{ width: '90px' }}>
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>비밀번호
                        </label>
                        <div className="col-sm-3">
                          <Input
                            name="userPassword"
                            className="form-control"
                            placeholder="비밀번호를 입력해주세요."
                            type="password"
                            style={{ width: '250px', marginLeft: '25px' }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.userPassword || ''}
                            invalid={
                              validation.touched.userPassword && validation.errors.userPassword
                                ? true
                                : false
                            }
                          />
                          {validation.touched.userPassword && validation.errors.userPassword ? (
                            <FormFeedback
                              type="invalid"
                              style={{ width: '150px', marginLeft: '25px' }}
                            >
                              {validation.errors.userPassword}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>

                      <div className="row mb-4" style={{ marginTop: '30px' }}>
                        <label className="col-sm-2 col-form-label" style={{ width: '115px' }}>
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>비밀번호 확인
                        </label>
                        <div className="col-sm-3">
                          <Input
                            name="userPasswordCheck"
                            className="form-control"
                            placeholder="비밀번호를 확인해주세요."
                            type="password"
                            style={{ width: '250px' }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.userPasswordCheck || ''}
                            invalid={
                              validation.touched.userPasswordCheck &&
                              validation.errors.userPasswordCheck
                                ? true
                                : false
                            }
                          />
                          {validation.touched.userPasswordCheck &&
                          validation.errors.userPasswordCheck ? (
                            <FormFeedback type="invalid" style={{ width: '200px' }}>
                              {validation.errors.userPasswordCheck}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>

                      <div className="row mb-4" style={{ marginTop: '30px' }}>
                        <label className="col-sm-2 col-form-label" style={{ width: '80px' }}>
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>이름
                        </label>
                        <div className="col-sm-3">
                          <Input
                            name="userName"
                            className="form-control"
                            placeholder="이름을 입력해주세요."
                            type="text"
                            style={{ width: '250px', marginLeft: '35px' }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.userName || ''}
                            invalid={
                              validation.touched.userName && validation.errors.userName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.userName && validation.errors.userName ? (
                            <FormFeedback
                              type="invalid"
                              style={{ width: '150px', marginLeft: '35px' }}
                            >
                              {validation.errors.userName}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>

                      <div className="row mb-4" style={{ marginTop: '30px' }}>
                        <label className="col-sm-2 col-form-label" style={{ width: '80px' }}>
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>이메일
                        </label>
                        <div className="col-sm-3">
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="이메일을 입력해주세요."
                            type="text"
                            style={{ width: '250px', marginLeft: '35px' }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ''}
                            invalid={
                              validation.touched.email && validation.errors.email ? true : false
                            }
                          />
                          {validation.touched.email && validation.errors.email ? (
                            <FormFeedback
                              type="invalid"
                              style={{ width: '150px', marginLeft: '35px' }}
                            >
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mb-4" style={{ marginTop: '30px' }}>
                        <label className="col-sm-2 col-form-label" style={{ width: '90px' }}>
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>전화번호
                        </label>
                        <div className="col-sm-3">
                          <Input
                            name="userPhoneNum"
                            className="form-control"
                            placeholder="전화번호를 입력해주세요."
                            type="text"
                            style={{ width: '250px', marginLeft: '25px' }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.userPhoneNum || ''}
                            invalid={
                              validation.touched.userPhoneNum && validation.errors.userPhoneNum
                                ? true
                                : false
                            }
                          />
                          {validation.touched.userPhoneNum && validation.errors.userPhoneNum ? (
                            <FormFeedback
                              type="invalid"
                              style={{ width: '150px', marginLeft: '25px' }}
                            >
                              {validation.errors.userPhoneNum}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          htmlFor="radio"
                          className="col-sm-2 col-form-label"
                          style={{ width: '105px' }}
                        >
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>사용자 상태
                        </label>
                        <div className="col-sm-7" style={{ marginTop: '10px' }}>
                          <Input
                            type="radio"
                            name="useStatus"
                            style={{ marginLeft: '10px' }}
                            // onChange={handleUseStatus}
                            onChange={validation.handleChange}
                            value="Y"
                            defaultChecked
                          />{' '}
                          운영
                          <Input
                            type="radio"
                            name="useStatus"
                            // onChange={handleUseStatus}
                            onChange={validation.handleChange}
                            value="N"
                            style={{ marginLeft: '20px' }}
                          />{' '}
                          미운영
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" style={{ width: '105px' }}>
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>사용자 유형
                        </label>
                        <div className="col-sm-7" style={{ marginTop: '10px' }}>
                          <Input
                            type="radio"
                            name="rollId"
                            style={{ marginLeft: '10px' }}
                            // onChange={handleRollId}
                            onChange={validation.handleChange}
                            value="1"
                          />{' '}
                          관리자
                          <Input
                            type="radio"
                            name="rollId"
                            // onChange={handleRollId}
                            onChange={validation.handleChange}
                            value="2"
                            defaultChecked
                            style={{ marginLeft: '20px' }}
                          />{' '}
                          사용자
                        </div>
                      </div>
                      <div className="mt-3 d-grid">
                        <button className="btn btn-info btn-block " type="submit">
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
