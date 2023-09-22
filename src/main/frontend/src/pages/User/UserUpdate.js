import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Modal,
  CardTitle,
  Col,
  Container,
  FormFeedback,
  Form,
  Input,
  Row,
} from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';
import Loader from 'src/components/Common/Loader';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getUserInfo, updateUser } from 'src/axios-apis/backend';

const UserUpdate = () => {
  const { state } = useLocation(); // 페이지 이동 전 상태 값
  const [searchParams] = useSearchParams();

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pwModal, setPwModal] = useState(false);
  const [pwCheck, setPwCheck] = useState();

  const [user, setUser] = useState({
    userId: '',
    loginId: '',
    userPassword: '',
    userPhoneNum: '',
    useStatus: '',
    userName: '',
    email: '',
    rollId: '',
  });

  useEffect(() => {
    getUserInfo(`${id}`).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, [id]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      loginId: user.loginId,
      userPhoneNum: user.userPhoneNum,
      useStatus: user.useStatus,
      userName: user.userName,
      email: user.email,
      rollId: user.rollId,
    },

    validationSchema: Yup.object({
      loginId: Yup.string().required('아이디를 입력해주세요.'),
      email: Yup.string()
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, '이메일 양식으로 등록바랍니다.')
        .required('이메일을 입력해주세요.'),
      userName: Yup.string().required('사용자 명을 입력해주세요.'),
      userPhoneNum: Yup.string()
        .matches(/^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/, '전화번호 양식으로 등록바랍니다.')
        .required('전화번호를 입력해주세요.'),
    }),

    onSubmit: (values) => {
      console.log('update values ======> ', values);

      updateUser(`${id}`, values)
        .then((response) => {
          console.log(response);
          if (response > 0) {
            alert('수정이 완료되었습니다!');
            navigate('/user');
          } else {
            alert('수정에 실패하였습니다.!');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  function pwUpdateModal() {
    setPwModal(!pwModal);
  }

  const validationPw = useFormik({
    enableReinitialize: true,

    initialValues: {
      userPassword: user.userPassword,
    },

    validationSchema: Yup.object({
      userPassword: Yup.string().required('비밀번호를 입력해주세요.'),
    }),
    onSubmit: (values) => {
      console.log('update values ======> ', values);
      updateUser(`${id}`, values)
        .then((response) => {
          console.log(response);
          if (response > 0) {
            alert('비밀번호 변경이 완료되었습니다!');
            setPwCheck(1);
            setPwModal(false);
          } else {
            alert('수정에 실패하였습니다.!');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  return (
    <React.Fragment>
      <Modal
        isOpen={pwModal}
        toggle={() => {
          pwUpdateModal();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            비밀번호 변경
          </h5>
          <button
            type="button"
            onClick={() => {
              setPwModal(false);
            }}
            className="btn-close"
          ></button>
        </div>
        <div className="modal-body">
          <Form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              validationPw.handleSubmit();
              // return false;
            }}
          >
            <div className="mb-3">
              <label className="col-form-label">비밀번호 입력:</label>
              <Input
                id="userPassword"
                name="userPassword"
                type="password"
                className="form-control"
                placeholder="비밀번호를 입력해주세요."
                onChange={validationPw.handleChange}
                value={validationPw.values.userPassword || ''}
                invalid={
                  validationPw.touched.userPassword && validationPw.errors.userPassword
                    ? true
                    : false
                }
              />
              {validationPw.touched.userPassword && validationPw.errors.userPassword ? (
                <FormFeedback type="invalid">{validationPw.errors.userPassword}</FormFeedback>
              ) : null}
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  setPwModal(false);
                }}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                취소
              </button>
              <button type="submit" className="btn btn-primary">
                확인
              </button>
            </div>
          </Form>
        </div>
      </Modal>
      {loading ? (
        <Loader />
      ) : (
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Projects" breadcrumbItem="Update" />

            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">
                      사용자 수정 <span style={{ float: 'right' }}>는 필수 항목입니다.</span>
                      <span style={{ color: 'red', marginRight: '3px', float: 'right' }}>*</span>
                    </CardTitle>
                    <Form
                      className="needs-validation"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        // return false;
                      }}
                    >
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>아이디
                        </label>
                        <div className="col-sm-10">
                          <Input
                            id="loginId"
                            name="loginId"
                            type="text"
                            className="form-control"
                            style={{ width: '300px' }}
                            placeholder="아이디를 입력해주세요."
                            onChange={validation.handleChange}
                            value={validation.values.loginId || ''}
                            invalid={
                              validation.touched.loginId && validation.errors.loginId ? true : false
                            }
                          />
                          {validation.touched.loginId && validation.errors.loginId ? (
                            <FormFeedback type="invalid">{validation.errors.loginId}</FormFeedback>
                          ) : null}
                        </div>
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
                            className="form-control"
                            style={{ width: '300px' }}
                            placeholder="사용자 명을 입력해주세요"
                            onChange={validation.handleChange}
                            value={validation.values.userName || ''}
                            invalid={
                              validation.touched.userName && validation.errors.userName
                                ? true
                                : false
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
                          <button
                            type="button"
                            className="btn-rounded btn btn-info"
                            onClick={() => {
                              pwUpdateModal();
                            }}
                          >
                            비밀번호 변경
                          </button>
                          {pwCheck === 1 ? (
                            <span style={{ color: 'red', marginLeft: '13px' }}>
                              비밀번호가 변경되었습니다.
                            </span>
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
                            type="text"
                            className="form-control"
                            style={{ width: '300px' }}
                            placeholder="전화번호를 입력해주세요"
                            onChange={validation.handleChange}
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
                            className="form-control"
                            style={{ width: '300px' }}
                            placeholder="이메일을 입력해주세요."
                            onChange={validation.handleChange}
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
                        <label className="col-sm-2 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>사용자 상태
                        </label>
                        <div className="col-sm-10">
                          <Input
                            type="radio"
                            name="useStatus"
                            value="Y"
                            defaultChecked={user.useStatus === 'Y'}
                            onChange={validation.handleChange}
                          />{' '}
                          운영
                          <Input
                            type="radio"
                            name="useStatus"
                            value="N"
                            defaultChecked={user.useStatus === 'N'}
                            onChange={validation.handleChange}
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
                            value="1"
                            defaultChecked={user.rollId === 1}
                            onChange={validation.handleChange}
                          />{' '}
                          관리자
                          <Input
                            type="radio"
                            name="rollId"
                            value="2"
                            defaultChecked={user.rollId === 2}
                            onChange={validation.handleChange}
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
                        <Button type="submit" className="btn-info">
                          수정
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserUpdate;
