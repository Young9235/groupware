import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';
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

// Formik Validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

//Import Date Picker
import 'react-datepicker/dist/react-datepicker.css';
import { getMenuInfo, updateMenu } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';

// import { errorMsg, successMsg } from "components/Common/Toaster";

//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';
import MenuListModal from 'src/pages/Menu/pop/MenuListModal';

const RegMenu = () => {
  const { id } = useParams();
  function getPopCallback(callbackData) {
    console.log(callbackData);
    setParentMenuNm(callbackData);
  }

  const childComponentRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [parentMenuNm, setParentMenuNm] = useState('');

  const { state } = useLocation(); // 페이지 이동 전 상태 값
  const [searchParams] = useSearchParams();

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
      setParentMenuNm(data.parentMenuNm);
      setMenu(data);
      setLoading(false);
    });
  }, [id]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      menuId: menu.menuId,
      menuName: menu.menuName,
      parentMenuNm: parentMenuNm,
      menuUrl: menu.menuUrl,
      menuImgPath: menu.menuImgPath,
      menuType: menu.menuType,
      menuLevel: menu.menuLevel,
      menuOrder: menu.menuOrder,
      menuDesc: menu.menuDesc,
      useStatus: menu.useStatus,
    },
    validationSchema: Yup.object({
      menuName: Yup.string().required('메뉴명을 입력해주세요.'),
      menuUrl: Yup.string().required('메뉴 URL을 입력해주세요.'),
      menuOrder: Yup.number().default(0).required('메뉴순서를 입력해주세요.'),
    }),
    onSubmit: (values) => {
      if (parentMenuNm === '' || parentMenuNm === null) {
        alert('상위 메뉴ID는 필수 입력값입니다.');
        return false;
      }
      if (values.menuType === '' || values.menuType === null) {
        alert('메뉴타입은 필수 입력값입니다.');
        return false;
      }
      if (values.menuLevel === '' || values.menuLevel === null) {
        alert('메뉴 레벨은 필수 입력값입니다.');
        return false;
      }
      values.parentMenuNm = parentMenuNm;
      console.log('update values ======> ', values.menuType);
      updateMenu(`${id}`, values)
        .then((response) => {
          console.log(response);
          if (response > 0) {
            alert('수정이 완료되었습니다!');
            navigate('/menu', { replace: true, state: { state } });
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
      {/* 상위메뉴 리스트 팝업창 */}
      <MenuListModal ref={childComponentRef} callback={getPopCallback} />
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
                      메뉴 수정 <span style={{ float: 'right' }}>는 필수 항목입니다.</span>
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
                        <label className="col-sm-2 col-form-label">메뉴ID</label>
                        <div className="col-sm-3">
                          <Input
                            id="menuId"
                            name="menuId"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.menuId || ''}
                            className="form-control"
                            style={{ width: '300px' }}
                            disabled
                          />
                          {validation.touched.menuId && validation.errors.menuId ? (
                            <FormFeedback type="invalid">{validation.errors.menuId}</FormFeedback>
                          ) : null}
                        </div>
                        <label className="col-sm-1 col-form-label">상위 메뉴ID</label>
                        <div className="col-sm-3">
                          <Input
                            id="parentMenuNm"
                            name="parentMenuNm"
                            type="text"
                            className="form-control"
                            style={{ width: '300px' }}
                            aria-describedby="buttonWithparentMenu"
                            disabled
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.parentMenuNm || ''}
                          />
                        </div>
                        <Button
                          id="buttonWithparentMenu"
                          type="button"
                          className="btn btn-info "
                          onClick={() => {
                            childComponentRef.current.tog_backdrop();
                          }}
                          data-toggle="modal"
                          style={{ width: '100px', float: 'left', marginLeft: '10px' }}
                        >
                          선택
                        </Button>
                        <button
                          id="initCodeId"
                          type="button"
                          className="btn btn-secondary "
                          onClick={() => {
                            validation.values.parentMenuNm = null;
                            setParentMenuNm('');
                          }}
                          data-toggle="modal"
                          style={{ width: '100px', float: 'left', marginLeft: '10px' }}
                        >
                          초기화
                        </button>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>메뉴명
                        </label>
                        <div className="col-sm-3">
                          <Input
                            id="menuName"
                            name="menuName"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            className="form-control"
                            style={{ width: '1000px' }}
                            placeholder="메뉴명을 입력해주세요."
                            value={validation.values.menuName || ''}
                            invalid={
                              validation.touched.menuName && validation.errors.menuName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.menuName && validation.errors.menuName ? (
                            <FormFeedback type="invalid">{validation.errors.menuName}</FormFeedback>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">메뉴 URL</label>
                        <div className="col-sm-10">
                          <Input
                            id="menuUrl"
                            name="menuUrl"
                            type="text"
                            onChange={validation.handleChange}
                            className="form-control"
                            style={{ width: '1000px' }}
                            placeholder="메뉴 URL을 입력해주세요"
                            value={validation.values.menuUrl || ''}
                            invalid={
                              validation.touched.menuUrl && validation.errors.menuUrl ? true : false
                            }
                          />
                          {validation.touched.menuUrl && validation.errors.menuUrl ? (
                            <FormFeedback type="invalid">{validation.errors.menuUrl}</FormFeedback>
                          ) : null}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">메뉴 이미지 Path</label>
                        <div className="col-sm-10">
                          <Input
                            id="menuImgPath"
                            name="menuImgPath"
                            type="text"
                            onChange={validation.handleChange}
                            className="form-control"
                            style={{ width: '1000px' }}
                            placeholder="메뉴 이미지 Path를 입력해주세요."
                            value={validation.values.menuImgPath || ''}
                            invalid={
                              validation.touched.menuImgPath && validation.errors.menuImgPath
                                ? true
                                : false
                            }
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>메뉴타입
                        </label>
                        <div className="col-sm-3">
                          <select
                            name="menuType"
                            id="menuType"
                            onChange={validation.handleChange}
                            value={validation.values.menuType || ''}
                            className="form-select"
                            style={{ width: '300px' }}
                          >
                            <option value="">전체</option>
                            <option value="FUNC">기능</option>
                            <option value="MENU">메뉴</option>
                          </select>
                        </div>
                        <label className="col-sm-1 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>메뉴 레벨
                        </label>
                        <div className="col-sm-3">
                          <select
                            name="menuLevel"
                            id="menuLevel"
                            onChange={validation.handleChange}
                            value={validation.values.menuLevel || ''}
                            className="form-select"
                            style={{ width: '300px' }}
                          >
                            <option value="">전체</option>
                            <option value="HEADER">HEADER</option>
                            <option value="ROOT">CMS 최상위 메뉴</option>
                            <option value="SUB_MENU">상세 메뉴</option>
                            <option value="DETAIL_FUNC">상세 기능</option>
                          </select>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>메뉴순서
                        </label>
                        <div className="col-sm-10">
                          <Input
                            id="menuOrder"
                            name="menuOrder"
                            onChange={validation.handleChange}
                            type="number"
                            min="0"
                            className="form-control"
                            style={{ width: '300px' }}
                            value={validation.values.menuOrder || 0}
                            invalid={
                              validation.touched.menuOrder && validation.errors.menuOrder
                                ? true
                                : false
                            }
                          />
                          {validation.touched.menuOrder && validation.errors.menuOrder ? (
                            <FormFeedback type="invalid">
                              {validation.errors.menuOrder}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label htmlFor="radio" className="col-sm-2 col-form-label">
                          <span style={{ color: 'red', marginRight: '3px' }}>*</span>사용 여부
                        </label>
                        <div className="col-sm-10">
                          <Input
                            type="radio"
                            name="useStatus"
                            defaultChecked={menu.useStatus === 'Y'}
                            onChange={validation.handleChange}
                            value="Y"
                          />{' '}
                          운영
                          <Input
                            type="radio"
                            name="useStatus"
                            defaultChecked={menu.useStatus === 'N'}
                            onChange={validation.handleChange}
                            value="N"
                            style={{ marginLeft: '20px' }}
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
                            placeholder="내용을 입력하세요."
                            value={validation.values.menuDesc || ''}
                            onChange={validation.handleChange}
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
                        <Button type="submit" color="primary" className="btn ">
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

export default RegMenu;
