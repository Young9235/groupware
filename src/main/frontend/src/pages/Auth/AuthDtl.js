import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';
import { getAuthInfo } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';
import AuthMenuList from 'src/pages/Auth/item/AuthMenuList';

toastr.options = {
  positionClass: 'toast-top-right',
  timeOut: 5000,
  extendedTimeOut: 1000,
  closeButton: false,
  debug: false,
  progressBar: false,
  preventDuplicates: true,
  newestOnTop: false,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
  showDuration: 300,
  hideDuration: 1000,
};

const AuthDtl = () => {
  //meta title
  document.title = 'Add Product | Skote - React Admin & Dashboard Template';

  const { authId } = useParams();
  const navigate = useNavigate();
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [auth, setAuth] = useState({
    authId: '',
    authName: '',
    authDesc: '',
    menuIdList: [],
  });

  useEffect(() => {
    getAuthInfo(`${authId}`).then((data) => {
      console.log(data);
      setAuth(data);
      setLoading(false);
    });
  }, [authId]);

  // const { state } = useLocation(); // 페이지 이동 전 상태 값
  // console.log(state);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="CMS 관리" breadcrumbItem="권한 관리" />
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody className="border-bottom pb-3 pt-3">
                    <CardTitle>
                      <h5 className="mt-2 card-title flex-grow-1">권한 정보 상세</h5>
                    </CardTitle>
                  </CardBody>
                  <CardBody>
                    <Row>
                      <Col sm="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="productname">
                            권한 ID <span style={{ color: 'red' }}>*</span>
                          </Label>
                          <Input
                            id="authId"
                            name="authId"
                            type="text"
                            className="form-control"
                            placeholder="코드 아이디를 입력해주세요."
                            value={auth.authId || ''}
                            disabled={true}
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="manufacturerbrand">
                            권한 명 <span style={{ color: 'red' }}>*</span>
                          </Label>
                          <Input
                            id="authName"
                            name="authName"
                            type="text"
                            className="form-control"
                            placeholder="코드 이름을 입력해주세요."
                            value={auth.authName || ''}
                            disabled={true}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12">
                        <FormGroup className="mb-12">
                          <Label htmlFor="price">권한 설명</Label>
                          <Input
                            id="authDesc"
                            name="authDesc"
                            type="text"
                            className="form-control"
                            placeholder="권한 설명을 입력해주세요."
                            value={auth.authDesc || ''}
                            disabled={true}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    {/* 메뉴 목록 */}
                    <Row>
                      <Col sm="12">
                        <AuthMenuList
                          menuIdList={auth.menuIdList}
                          setCheckItems={setCheckItems}
                          checkItems={checkItems}
                          pageValue="D"
                        />
                      </Col>
                    </Row>

                    <div className="d-flex flex-wrap gap-2 justify-content-end">
                      <Button
                        color="secondary"
                        className=""
                        onClick={() => {
                          navigate('/admin/auth', {
                            replace: true,
                          });
                        }}
                      >
                        목록으로
                      </Button>
                      <Button
                        type="submit"
                        color="primary"
                        className="btn "
                        onClick={() => {
                          navigate(`/admin/auth/update/${authId}`, { replace: true });
                        }}
                      >
                        수정하기
                      </Button>
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

export default AuthDtl;
