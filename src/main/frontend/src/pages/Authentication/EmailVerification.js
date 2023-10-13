import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row, Spinner } from 'reactstrap';

// import images
import logodark from 'src/assets/images/logo-dark.png';
import logolight from 'src/assets/images/logo-light.png';
import { sendAuthMailConfirm } from 'src/axios-apis/backend';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

/**
 * 메일 전송 완료 화면
 * @returns {JSX.Element}
 * @constructor
 */
const EmailVerification = () => {
  //meta title
  document.title = 'Email Verification | Skote - React Admin & Dashboard Template';
  toastr.options = {
    timeOut: 3000,
  };
  const { state } = useLocation();
  const { email, type } = state;
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // const [value, setValue] = useState({});

  // const value = { login_Id: email, mail_Key: null };
  console.log('처음 진입 ', state);
  const fnMailConfirm = (e) => {
    e.preventDefault();

    const value = { login_id: email, mail_Key: null, type: type };
    console.log('버튼 눌렀을 때 ', value);
    setLoading(true);

    sendAuthMailConfirm(value)
      .then((response) => {
        setLoading(false);
        console.log(response);
        // state.email = response.loginId;
        toastr.success('전송 완료!');
      })
      .catch((e) => {
        setLoading(false);
        console.error(e.message);
        toastr.error('전송 실패!');
      });
  };

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="d-block text-center mb-5 text-muted">
                <Link to="dashboard" className="d-block auth-logo">
                  <img src={logodark} alt="" height="20" className="auth-logo-dark mx-auto" />
                  <img src={logolight} alt="" height="20" className="auth-logo-light mx-auto" />
                </Link>
                <p className="mt-3">React Admin & Dashboard Template</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bx-mail-send h1 mb-0 text-primary"></i>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>
                          {type === 'Login' && '이메일을 확인하세요'}
                          {type === 'Register' && '메일 전송 성공!'}
                        </h4>
                        <p>
                          <span className="fw-semibold">{email}으로 </span>
                          {type === 'Register' && '인증 메일을 보냈습니다.'}
                          <br />
                          인증 완료 후,로그인 하시길 바랍니다. <br />한 시간 안에 인증을 못할 경우,
                          가입한 계정은 삭제됩니다.
                        </p>
                        <div className="mt-4">
                          <Link
                            to="/login"
                            className="btn btn-success w-md"
                            style={loading ? { pointerEvents: 'none' } : null}
                          >
                            로그인 페이지
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                {loading ? (
                  <Spinner color="primary">Loading...</Spinner>
                ) : (
                  <p>
                    메일을 받지 못하셨습니까?{' '}
                    <Link
                      to="#"
                      onClick={fnMailConfirm}
                      className="fw-medium text-primary"
                      style={loading ? { pointerEvents: 'none' } : null}
                    >
                      재전송
                    </Link>
                  </p>
                )}
                <p>
                  © {new Date().getFullYear()} Skote. Crafted with{' '}
                  <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default EmailVerification;
