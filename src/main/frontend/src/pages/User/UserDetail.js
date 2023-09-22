import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Col, Container, Form, Input, Row } from 'reactstrap';
import { getUserInfo } from 'src/axios-apis/backend';

//Import Date Picker
import 'react-datepicker/dist/react-datepicker.css';

//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';
import Loader from 'src/components/Common/Loader';

const UserDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // 페이지 이동 전 상태 값
  console.log(state);

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

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

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Projects" breadcrumbItem="Detail" />

            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">
                      사용자 상세 <span style={{ float: 'right' }}>는 필수 항목입니다.</span>
                      <span style={{ color: 'red', marginRight: '3px', float: 'right' }}>*</span>
                    </CardTitle>
                    <Form>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>아이디
                        </label>
                        <div className="col-sm-10">
                          <Input
                            id="loginId"
                            name="loginId"
                            type="text"
                            // onChange={handleLoginId}
                            className="form-control"
                            style={{ width: '300px' }}
                            value={user.loginId || ''}
                            disabled
                          />
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
                            // onChange={handleUserName}
                            className="form-control"
                            style={{ width: '300px' }}
                            value={user.userName || ''}
                            disabled
                          />
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
                            // onChange={handleUserPassword}
                            className="form-control"
                            style={{ width: '300px' }}
                            value={user.userPassword || ''}
                            disabled
                          />
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
                            // onChange={handleUserPhoneNum}
                            type="text"
                            className="form-control"
                            style={{ width: '300px' }}
                            value={user.userPhoneNum || ''}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">이메일</label>
                        <div className="col-sm-10">
                          <Input
                            id="email"
                            name="email"
                            type="text"
                            // onChange={handleEmail}
                            className="form-control"
                            style={{ width: '300px' }}
                            value={user.email || ''}
                            disabled
                          />
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
                            disabled
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
                            checked={user.useStatus === 'Y'}
                            // onChange={handleUseStatus}
                            value="Y"
                            disabled
                          />{' '}
                          운영
                          <Input
                            type="radio"
                            name="useStatus"
                            disabled
                            checked={user.useStatus === 'N'}
                            // onChange={handleUseStatus}
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
                            disabled
                            checked={user.rollId === 1}
                            // onChange={handleRollId}
                          />
                          관리자
                          <Input
                            type="radio"
                            name="rollId"
                            disabled
                            checked={user.rollId === 2}
                            // onChange={handleRollId}
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

export default UserDetail;
