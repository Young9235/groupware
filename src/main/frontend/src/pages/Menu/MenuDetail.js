import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Col, Container, Form, Input, Row } from 'reactstrap';
import { getMenuInfo } from 'src/axios-apis/backend';

//Import Date Picker
import 'react-datepicker/dist/react-datepicker.css';
// import { errorMsg, successMsg } from "components/Common/Toaster";

//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';
import Loader from 'src/components/Common/Loader';

const MenuDtl = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // 페이지 이동 전 상태 값
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [menu, setMenu] = useState({
    menuId: '',
    menuName: '',
    parentMenuNm: '',
    menuUrl: '',
    menuImgPath: '',
    menuType: '',
    menuLevel: '',
    menuOrder: '',
    useStatus: '',
  });

  useEffect(() => {
    getMenuInfo(`${id}`).then((data) => {
      setMenu(data);
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
            <Breadcrumbs title="CMS 관리" breadcrumbItem="메뉴 관리" />

            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">
                      메뉴 상세 <span style={{ float: 'right' }}>는 필수 항목입니다.</span>
                      <span
                        style={{
                          color: 'red',
                          marginRight: '3px',
                          float: 'right',
                        }}
                      >
                        *
                      </span>
                    </CardTitle>
                    <Form className="form-horizontal">
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">메뉴ID</label>
                        <div className="col-sm-3">
                          <Input
                            id="menuId"
                            name="menuId"
                            type="text"
                            value={menu.menuId || ''}
                            className="form-control"
                            style={{ width: '300px' }}
                            disabled
                          />
                        </div>
                        <label className="col-sm-1 col-form-label">상위 메뉴ID</label>
                        <div className="col-sm-3">
                          <Input
                            id="loginId"
                            name="loginId"
                            type="text"
                            value={menu.parentMenuNm || ''}
                            className="form-control"
                            style={{ width: '300px' }}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>
                          메뉴명
                        </label>
                        <div className="col-sm-3">
                          <Input
                            id="menuName"
                            name="menuName"
                            type="text"
                            value={menu.menuName || ''}
                            className="form-control"
                            style={{ width: '1000px' }}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">메뉴 URL</label>
                        <div className="col-sm-10">
                          <Input
                            id="menuUrl"
                            name="menuUrl"
                            type="text"
                            value={menu.menuUrl || ''}
                            className="form-control"
                            style={{ width: '1000px' }}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">메뉴 이미지 Path</label>
                        <div className="col-sm-10">
                          <Input
                            id="menuImg"
                            name="menuImg"
                            type="text"
                            value={menu.menuImgPath || ''}
                            className="form-control"
                            style={{ width: '1000px' }}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>
                          메뉴타입
                        </label>
                        <div className="col-sm-3">
                          <select
                            name="select"
                            id="exampleSelect"
                            className="form-select"
                            style={{ width: '300px' }}
                            disabled
                          >
                            <option>기능</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                        <label className="col-sm-1 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>
                          메뉴 레벨
                        </label>
                        <div className="col-sm-3">
                          <select
                            name="select"
                            id="exampleSelect"
                            className="form-select"
                            style={{ width: '300px' }}
                            disabled
                          >
                            <option>HEADER</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>
                          메뉴순서
                        </label>
                        <div className="col-sm-10">
                          <Input
                            id="menuOrder"
                            name="menuOrder"
                            value={menu.menuOrder || 0}
                            type="number"
                            className="form-control"
                            style={{ width: '300px' }}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label htmlFor="radio" className="col-sm-2 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>
                          사용 여부
                        </label>
                        <div className="col-sm-10">
                          <Input
                            type="radio"
                            name="useStatus"
                            checked={menu.useStatus === 'Y'}
                            disabled
                          />{' '}
                          운영
                          <Input
                            type="radio"
                            name="useStatus"
                            checked={menu.useStatus === 'N'}
                            style={{ marginLeft: '20px' }}
                            disabled
                          />{' '}
                          미운영
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">메뉴 설명</label>
                        <Col lg="9">
                          <textarea
                            className="form-control"
                            id="menuDesc"
                            name="menuDesc"
                            rows="10"
                            value={menu.menuDesc || ''}
                            disabled
                          />
                        </Col>
                      </div>
                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        <Button
                          color="danger"
                          onClick={() => {
                            if (
                              searchParams.get('menuName') !== null &&
                              searchParams.get('menuType') !== null
                            )
                              navigate(
                                '/menu/?menuName=' +
                                  searchParams.get('menuName') +
                                  '&menuType=' +
                                  searchParams.get('menuType') +
                                  '&page=' +
                                  searchParams.get('page'),
                                { replace: true, state: { state } }
                              );
                            else if (
                              searchParams.get('menuName') !== null &&
                              searchParams.get('menuType') === null
                            )
                              navigate(
                                '/menu/?menuName=' +
                                  searchParams.get('menuName') +
                                  '&page=' +
                                  searchParams.get('page'),
                                { replace: true, state: { state } }
                              );
                            else if (
                              searchParams.get('menuType') !== null &&
                              searchParams.get('menuName') === null
                            )
                              navigate(
                                '/menu/?menuType=' +
                                  searchParams.get('menuType') +
                                  '&page=' +
                                  searchParams.get('page'),
                                { replace: true, state: { state } }
                              );
                            else
                              navigate('/menu/?page=' + searchParams.get('page'), {
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

export default MenuDtl;
