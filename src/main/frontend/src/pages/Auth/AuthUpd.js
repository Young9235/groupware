import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getAuthInfo, updateAuth } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';
import AuthMenuList from 'src/pages/Auth/item/AuthMenuList';

function AuthUpd() {
  //meta title
  document.title = 'Add Product | Skote - React Admin & Dashboard Template';

  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { authId } = useParams();

  const [auth, setAuth] = useState({
    authId: '',
    authName: '',
    authDesc: '',
    useStatus: '',
    menuIdList: [],
  });

  useEffect(() => {
    getAuthInfo(`${authId}`).then((data) => {
      console.log(data);
      setAuth(data);
      setLoading(false);
    });
  }, [authId]);

  useEffect(() => {
    const userInfo = sessionStorage.getItem('authUser');
    const id = JSON.parse(userInfo).idx;
    // console.log("userId", id);
    setUserId(id);
  }, []);

  // 벨리데이션 처리
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      authId: auth.authId,
      authName: auth.authName,
      authDesc: auth.authDesc,
      useStatus: auth.useStatus,
    },

    validationSchema: Yup.object({
      authName: Yup.string().required('권한 명은 필수 입력 값입니다.'),
    }),

    onSubmit: (values) => {
      setLoading(true);
      if (userId <= 0) {
        alert('사용자 ID가 존재하지 않는 잘못된 접근입니다.');
        return false;
      }

      if (values.authDesc === '') values.authDesc = null;
      values.userId = userId;
      values.menuIdList = checkItems;
      console.log('update values ======> ', values);

      updateAuth(`${authId}`, values)
        .then((response) => {
          console.log(response);
          if (response.result > 0) {
            alert('정상적으로 수정이 완료 되었습니다!');
            navigate('/auth', { replace: true });
          } else {
            alert('error code : ' + response.result);
          }
          setLoading(false);
        })
        .catch((e) => {
          alert(e.message);
          setLoading(false);
        });
    },
  });

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
                      <h5 className="mt-2 card-title flex-grow-1">권한 정보 수정</h5>
                    </CardTitle>
                  </CardBody>
                  <CardBody>
                    <Form
                      className="needs-validation"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                      }}
                    >
                      <Row>
                        <Col sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="authName">
                              권한 명 <span style={{ color: 'red' }}>*</span>
                            </Label>
                            <Input
                              id="authName"
                              name="authName"
                              type="text"
                              className="form-control"
                              placeholder="권한 명을 입력해주세요."
                              onChange={validation.handleChange}
                              value={validation.values.authName || ''}
                              invalid={
                                validation.touched.authName && validation.errors.authName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.authName && validation.errors.authName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.authName}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>

                        <Col sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="authDesc">권한 설명</Label>
                            <div className="input-group">
                              <Input
                                id="authDesc"
                                name="authDesc"
                                type="text"
                                className="form-control"
                                placeholder="권한 설명을 입력해주세요."
                                onChange={validation.handleChange}
                                value={validation.values.authDesc || ''}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                          style={{ width: '100px' }}
                        >
                          사용 여부
                        </label>
                        <div className="col-md-6 pt-2">
                          <Label style={{ paddingRight: '20px' }}>
                            <Input
                              defaultChecked
                              type="radio"
                              name="useStatus"
                              value="Y"
                              onChange={validation.handleChange}
                              style={{ width: '15px', height: '15px' }}
                            />{' '}
                            사용
                          </Label>
                          <Label>
                            <Input
                              type="radio"
                              name="useStatus"
                              value="N"
                              onChange={validation.handleChange}
                              style={{ width: '15px', height: '15px' }}
                            />{' '}
                            미사용
                          </Label>
                        </div>
                      </Row>

                      {/* 메뉴 목록 */}
                      <Row>
                        <Col sm="12">
                          <AuthMenuList
                            menuIdList={auth.menuIdList}
                            setCheckItems={setCheckItems}
                            checkItems={checkItems}
                            pageValue="U"
                          />
                        </Col>
                      </Row>

                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        <Button
                          color="secondary"
                          className=""
                          onClick={() => {
                            navigate('/auth', { replace: true });
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
}

export default AuthUpd;
