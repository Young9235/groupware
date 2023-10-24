import React, { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

// import images
import logodark from 'src/assets/images/logo-dark.png';
import logolight from 'src/assets/images/logo-light.png';
import { sendAuthMailConfirm } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';

/**
 * 메일 인증 성공 화면
 * @returns {JSX.Element}
 * @constructor
 */
const EmailAuthConfirm = () => {
  //meta title
  document.title = 'Two Step Verification | Skote - React Admin & Dashboard Template';

  const [loading, setLoading] = useState(false);
  const { email, key } = useParams();
  const navigate = useNavigate();

  //// 조회 처리
  useEffect(() => {
    setLoading(true);
    console.log('email : ' + email + ', key : ' + key);
    sendAuthMailConfirm({ login_id: email, mail_key: key })
      .then((response) => {
        setLoading(false);
        console.log(response);
      })
      .catch((e) => {
        console.error(e.message);
        setLoading(false);
        alert('메일 인증 실패, 인증코드가 잘 못 되었습니다.');
        navigate('/login', { replace: true });
      });
  }, [navigate, email, key]);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mb-5 text-muted">
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
                            <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                          </div>
                        </div>
                        <div className="p-2 mt-4">
                          <h4>메일 인증 성공</h4>
                          <p className="mb-5">
                            <span className="fw-semibold">{email}님 가입을 축하드립니다.</span>
                            <br />
                            이제 로그인이 가능합니다.
                          </p>
                          <div className="mt-4">
                            <Link to="/dashboard" className="btn btn-success w-md">
                              로그인
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
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
export default EmailAuthConfirm;
