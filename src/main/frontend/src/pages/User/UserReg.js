import React, { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  FormFeedback,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Row,
} from 'reactstrap';
import axios from 'axios';

// Formik Validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

//Import Date Picker
import 'react-datepicker/dist/react-datepicker.css';
import { addNewUser } from 'src/axios-apis/backend';
// import { errorMsg, successMsg } from "components/Common/Toaster";

//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';

const RegUser = () => {
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const { state } = useLocation(); // 페이지 이동 전 상태 값
  console.log(state);

  // const [userName,setUserName] = useState('')
  // const [email,setEmail] = useState('')
  // const [userPhoneNum,setUserPhoneNum] = useState('')
  // const [userPassword,setUserPassword] = useState('')
  // const [rollId,setRollId] = useState(2)
  // const [useStatus,setUseStatus] = useState('Y')

  // input value 저장
  // const handleLoginId = (e) => {
  //   e.preventDefault();
  //   setLoginId(e.target.value);
  // };

  // const handleUserName = (e) => {
  //   e.preventDefault();
  //   setUserName(e.target.value);
  // };

  // const handleEmail = (e) => {
  //   e.preventDefault();
  //   setEmail(e.target.value);
  // };

  // const handleUserPassword = (e) => {
  //   e.preventDefault();
  //   setUserPassword(e.target.value);
  // };

  // const handleUserPhoneNum = (e) => {
  //   e.preventDefault();
  //   setUserPhoneNum(e.target.value);
  // };
  // const handleRollId = (e) => {
  //   e.preventDefault();
  //   setRollId(e.target.value);  };

  // const handleUseStatus = (e) => {
  //   e.preventDefault();
  //   setUseStatus(e.target.value);
  // };

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
      if (loginCheck === '' || loginCheck === 2 || loginCheck === 1)
        alert('아이디 중복확인 바랍니다.');
      else {
        // onClickSave(values);
        addNewUser(values)
          .then((res) => {
            console.log('res >>>>>>>>>>>>', res);
            if (res > 0) {
              alert('등록이 완료되었습니다!');
              navigate('/user', { replace: true, state: { state } });
            } else {
              alert('등록을 실패하였습니다.!');
            }
          })
          .catch((e) => {
            console.error(e);
          });
        console.log('values >>>>>>>>>>>>>>>>', values);
      }
    },
  });

  // const onClickSave = (e) => {
  //   const user = new FormData();
  //   // Object.values(file);
  //   // user.append("loginId", loginId);
  //   user.append("userName", userName);
  //   user.append("email", email);
  //   user.append("userPhoneNum", userPhoneNum);
  //   user.append("userPassword", userPassword);
  //   user.append("rollId", rollId);
  //   user.append("useStatus", useStatus);

  //   for (let value of user.values()) {
  //     console.log("value : ", value);
  //   }

  //   axios
  //     .post("/user/insert", user, {
  //       headers: {
  //         "Content-Type": "multipart/form-data;",
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  const onClickLoginCheck = (e) => {
    console.log('loginIds : ', validation.values.loginId);

    // const loginId = new FormData();
    // loginId.append("loginId", validation.values.loginId);

    // for (let value of loginId.values()) {
    //   console.log("value : ", value);
    // }

    axios
      .get('/user/check', {
        params: {
          loginId: validation.values.loginId,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setLoginCheck(res.data);
        if (res.data === 0) {
          // successMsg("사용가능한 아이디 입니다.");
          alert('사용가능한 아이디 입니다.');
        } else if (res.data === 1) {
          // errorMsg("중복된 아이디 입니다.");
          alert('중복된 아이디 입니다.');
        } else if (res.data === 2) {
          // errorMsg("아이디를 입력해주세요.");
          alert('아이디를 입력해주세요.');
        }
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Create New" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    사용자 등록 <span style={{ float: 'right' }}>는 필수 항목입니다.</span>
                    <span style={{ color: 'red', marginRight: '3px', float: 'right' }}>*</span>
                  </CardTitle>
                  <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        <span style={{ color: 'red', marginRight: '3px' }}>*</span>아이디
                      </label>
                      <div className="col-sm-3">
                        <Input
                          id="loginId"
                          name="loginId"
                          type="text"
                          // onChange={handleLoginId}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          className="form-control"
                          style={{ width: '300px' }}
                          placeholder="아이디를 입력해주세요."
                          value={validation.values.loginId || ''}
                          invalid={
                            validation.touched.loginId && validation.errors.loginId ? true : false
                          }
                        />
                        {validation.touched.loginId && validation.errors.loginId ? (
                          <FormFeedback type="invalid">{validation.errors.loginId}</FormFeedback>
                        ) : null}
                      </div>
                      <Button
                        onClick={onClickLoginCheck}
                        style={{
                          width: '100px',
                          float: 'left',
                          height: '35px',
                          marginLeft: '10px',
                        }}
                        className="btn-rounded btn-light"
                      >
                        중복확인
                      </Button>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        <span style={{ color: 'red', marginRight: '3px' }}>*</span>사용자 명
                      </label>
                      <div className="col-sm-10">
                        <Input
                          id="userName"
                          name="userName"
                          type="text"
                          onChange={validation.handleChange}
                          // onChange={handleUserName}
                          className="form-control"
                          style={{ width: '300px' }}
                          placeholder="사용자 명을 입력해주세요"
                          value={validation.values.userName || ''}
                          invalid={
                            validation.touched.userName && validation.errors.userName ? true : false
                          }
                        />
                        {validation.touched.userName && validation.errors.userName ? (
                          <FormFeedback type="invalid">{validation.errors.userName}</FormFeedback>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        <span style={{ color: 'red', marginRight: '3px' }}>*</span>비밀번호
                      </label>
                      <div className="col-sm-10">
                        <Input
                          id="userPassword"
                          name="userPassword"
                          type="password"
                          onChange={validation.handleChange}
                          // onChange={handleUserPassword}
                          className="form-control"
                          style={{ width: '300px' }}
                          placeholder="비밀번호를 입력해주세요."
                          value={validation.values.userPassword || ''}
                          invalid={
                            validation.touched.userPassword && validation.errors.userPassword
                              ? true
                              : false
                          }
                        />
                        {validation.touched.userPassword && validation.errors.userPassword ? (
                          <FormFeedback type="invalid">
                            {validation.errors.userPassword}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        <span style={{ color: 'red', marginRight: '3px' }}>*</span>비밀번호 확인
                      </label>
                      <div className="col-sm-10">
                        <Input
                          id="userPasswordCheck"
                          name="userPasswordCheck"
                          type="password"
                          onChange={validation.handleChange}
                          className="form-control"
                          style={{ width: '300px' }}
                          placeholder="비밀번호를 확인해주세요."
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
                          <FormFeedback type="invalid">
                            {validation.errors.userPasswordCheck}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        <span style={{ color: 'red', marginRight: '3px' }}>*</span>전화번호
                      </label>
                      <div className="col-sm-10">
                        <Input
                          id="userPhoneNum"
                          name="userPhoneNum"
                          onChange={validation.handleChange}
                          // onChange={handleUserPhoneNum}
                          type="text"
                          className="form-control"
                          style={{ width: '300px' }}
                          placeholder="전화번호를 입력해주세요"
                          value={validation.values.userPhoneNum || ''}
                          invalid={
                            validation.touched.userPhoneNum && validation.errors.userPhoneNum
                              ? true
                              : false
                          }
                        />
                        {validation.touched.userPhoneNum && validation.errors.userPhoneNum ? (
                          <FormFeedback type="invalid">
                            {validation.errors.userPhoneNum}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">이메일</label>
                      <div className="col-sm-10">
                        <Input
                          id="email"
                          name="email"
                          type="text"
                          onChange={validation.handleChange}
                          // onChange={handleEmail}
                          className="form-control"
                          style={{ width: '300px' }}
                          placeholder="이메일을 입력해주세요."
                          value={validation.values.email || ''}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        <span style={{ color: 'red', marginRight: '3px' }}>*</span>사용자 권한
                      </label>
                      <div className="col-sm-10">
                        <select
                          name="select"
                          id="exampleSelect"
                          className="form-select"
                          style={{ width: '300px' }}
                        >
                          <option>예술인 마을 권한</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="radio" className="col-sm-2 col-form-label">
                        <span style={{ color: 'red', marginRight: '3px' }}>*</span>사용자 상태
                      </label>
                      <div className="col-sm-10">
                        <Input
                          type="radio"
                          name="useStatus"
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
                      <label className="col-sm-2 col-form-label">
                        <span style={{ color: 'red', marginRight: '3px' }}>*</span>사용자 유형
                      </label>
                      <div className="col-sm-10">
                        <Input
                          type="radio"
                          name="rollId"
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
                    <div className="d-flex flex-wrap gap-2 justify-content-end">
                      <Button
                        color="danger"
                        onClick={() => {
                          if (searchParams.get('userName') !== null)
                            navigate(
                              '/user/?userName=' +
                                searchParams.get('userName') +
                                '&page=' +
                                searchParams.get('page'),
                              { replace: true, state: { state } }
                            );
                          else
                            navigate('/user/?page=' + searchParams.get('page'), {
                              replace: true,
                              state: { state },
                            });
                        }}
                      >
                        취소
                      </Button>
                      <Button type="submit" color="primary">
                        등록
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RegUser;
