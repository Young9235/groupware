import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { insertCode } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';
import CodeListModal from 'src/pages/Codes/pop/CodeListModal';
// import { useDispatch, useSelector } from "react-redux";
// import { savePagesItem } from "store/actions";
// import { errorMsg, successMsg } from "components/Common/Toaster";

function CodeReg() {
  //meta title
  document.title = 'Add Product | Skote - React Admin & Dashboard Template';

  const navigate = useNavigate();
  const [codeError, setCodeError] = useState(false); // submit 후, 코드 아이디가 중복될 경우 활성화시킨다
  const childComponentRef = useRef();
  const [loading, setLoading] = useState(false);
  const [parentCodeId, setParentCodeId] = useState('');

  // const { pages } = useSelector((state) => ({
  //   pages: state.pagesReducer.pages,
  // }));

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(savePagesItem(pages));
  // }, [dispatch, pages]);

  // useEffect(() => {
  //   console.log("pages", pages);
  // }, [pages]);

  function getPopCallback(callbackData) {
    console.log(callbackData);
    // validation.values.parentCodeId = callbackData;
    setParentCodeId(callbackData);
  }

  // 벨리데이션 처리
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      codeId: '',
      codeName: '',
      parentCodeId: '',
      codeValue: '',
      description: '',
    },

    validationSchema: Yup.object({
      codeId: Yup.string().required('코드 아이디는 필수 입력 값입니다.'),
      codeName: Yup.string().required('코드 이름은 필수 입력 값입니다.'),
    }),

    onSubmit: (values) => {
      setLoading(true);
      if (parentCodeId === '') {
        values.parentCodeId = null;
      } else {
        values.parentCodeId = parentCodeId;
      }
      if (values.description === '') values.description = null;
      if (values.codeValue === '') values.codeValue = null;

      console.log('insert values ======> ', values);

      insertCode(values)
        .then((response) => {
          console.log(response);

          if (response.result > 0) {
            // successMsg("정상적으로 등록이 되었습니다!");
            alert('정상적으로 등록이 되었습니다!');
            // navigate("/code/detail/" + response.codeId);
            navigate('/code', { replace: true });
          } else if (response.result === -1) {
            // errorMsg("코드ID가 중복됩니다.", "fail");
            setCodeError(true);
          } else {
            alert('error code : ' + response.result);
            // errorMsg("error code : " + response.result);
          }
          setLoading(false);
        })
        .catch((e) => {
          alert(e.message);
          setLoading(false);
          // errorMsg(e.message);
        });
    },
  });

  return (
    <React.Fragment>
      {/* 코드 리스트 팝업창 */}
      <CodeListModal ref={childComponentRef} callback={getPopCallback} />
      {loading ? (
        <Loader />
      ) : (
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="코드 관리" breadcrumbItem="공통 코드 관리" />
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody className="border-bottom pb-3 pt-3">
                    <CardTitle>
                      <h5 className="mt-2 card-title flex-grow-1">공통 코드 등록</h5>
                    </CardTitle>
                  </CardBody>
                  <CardBody>
                    <Form
                      className="needs-validation"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        // return false;
                      }}
                    >
                      <Row>
                        <Col sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="productname">
                              Code ID <span style={{ color: 'red' }}>*</span>
                            </Label>
                            <Input
                              id="codeId"
                              name="codeId"
                              type="text"
                              className="form-control"
                              placeholder="코드 아이디를 입력해주세요."
                              onChange={validation.handleChange}
                              value={validation.values.codeId || ''}
                              onKeyDown={() => {
                                setCodeError(false);
                              }}
                              invalid={
                                (validation.touched.codeId && validation.errors.codeId) || codeError
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.codeId && validation.errors.codeId ? (
                              <FormFeedback type="invalid">{validation.errors.codeId}</FormFeedback>
                            ) : null}
                            {codeError && (
                              <FormFeedback type="invalid">코드ID가 중복됩니다.</FormFeedback>
                            )}
                          </FormGroup>
                          <FormGroup className="mb-3">
                            <Label htmlFor="manufacturerbrand">
                              Code Name <span style={{ color: 'red' }}>*</span>
                            </Label>
                            <Input
                              id="codeName"
                              name="codeName"
                              type="text"
                              className="form-control"
                              placeholder="코드 이름을 입력해주세요."
                              onChange={validation.handleChange}
                              value={validation.values.codeName || ''}
                              invalid={
                                validation.touched.codeName && validation.errors.codeName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.codeName && validation.errors.codeName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.codeName}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <Label htmlFor="price">Code Value</Label>
                            <Input
                              id="codeValue"
                              name="codeValue"
                              type="text"
                              className="form-control"
                              placeholder="코드 값을 입력해주세요."
                              onChange={validation.handleChange}
                              value={validation.values.codeValue || ''}
                            />
                          </FormGroup>
                        </Col>

                        <Col sm="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="manufacturername">Parent Code ID</Label>
                            <div className="input-group">
                              <Input
                                id="parentCodeId"
                                name="parentCodeId"
                                readOnly={true}
                                type="text"
                                className="form-control"
                                placeholder="부모 코드 아이디를 선택해주세요."
                                value={parentCodeId || ''}
                                aria-describedby="buttonWithparentCodeId"
                                onClick={() => {
                                  childComponentRef.current.tog_backdrop();
                                }}
                              />
                              <button
                                id="buttonWithparentCodeId"
                                type="button"
                                className="btn btn-primary "
                                onClick={() => {
                                  childComponentRef.current.tog_backdrop();
                                }}
                                data-toggle="modal"
                              >
                                아이디 선택
                              </button>
                              <button
                                id="initCodeId"
                                type="button"
                                className="btn btn-secondary "
                                onClick={() => {
                                  validation.values.parentCodeId = null;
                                  setParentCodeId('');
                                }}
                                data-toggle="modal"
                              >
                                초기화
                              </button>
                            </div>
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <Label htmlFor="description">Comments</Label>
                            <Input
                              className="form-control mb-3"
                              id="description"
                              name="description"
                              type="textarea"
                              rows="5"
                              placeholder="기타 내용을 입력해주세요."
                              onChange={validation.handleChange}
                              value={validation.values.description || ''}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        <Button
                          color="secondary"
                          className=""
                          onClick={() => {
                            navigate('/code', { replace: true });
                          }}
                        >
                          취소
                        </Button>
                        <Button type="submit" color="primary" className="btn ">
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
      )}
    </React.Fragment>
  );
}

export default CodeReg;
