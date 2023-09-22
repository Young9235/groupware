import React, { useEffect, useRef, useState } from 'react';
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
import { getCodeInfo, updateCode } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';
import CodeListModal from 'src/pages/Codes/pop/CodeListModal';

const CodeUpd = () => {
  //meta title
  document.title = 'Add Product | Skote - React Admin & Dashboard Template';

  const { codeId } = useParams();

  // console.log("update Page Id ", id);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const childComponentRef = useRef();
  const [parentCodeId, setParentCodeId] = useState('');

  const [code, setCode] = useState({
    codeId: '',
    codeName: '',
    codeValue: '',
    description: '',
    useStatus: '',
  });

  useEffect(() => {
    getCodeInfo(`${codeId}`).then((data) => {
      console.log(data);
      setCode(data);
      setParentCodeId(data.parentCodeId); // 팝업으로 콜백받아서 셋팅하는 것은 따로 뺀다
      setLoading(false);
    });
  }, [codeId]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      codeName: code.codeName,
      codeValue: code.codeValue,
      description: code.description,
      useStatus: code.useStatus,
      // parentCodeId: "",
    },

    validationSchema: Yup.object({
      codeName: Yup.string().required('코드 이름은 필수 입력 값입니다.'),
    }),

    onSubmit: (values) => {
      if (parentCodeId === '') {
        values.parentCodeId = null;
      } else {
        values.parentCodeId = parentCodeId;
      }

      if (values.description === '') values.description = null;
      if (values.codeValue === '') values.codeValue = null;

      console.log('update values ======> ', values);

      updateCode(`${codeId}`, values)
        .then((response) => {
          console.log(response);
          if (response.result > 0) {
            // toastr.success("정상적으로 변경이 되었습니다!", "success");
            alert('정상적으로 변경이 되었습니다!');
            // navigate("/code/detail/" + response.codeId);
            navigate('/code', { replace: true });
          } else {
            alert('error code : ' + response.result);
            // toastr.error("error code : " + response.result, "error");
          }
        })
        .catch((e) => {
          alert(e.message);
          // toastr.error(e.message, "error");
        });
    },
  });

  function getPopCallback(callbackData) {
    console.log('callbackData', callbackData);
    setParentCodeId(callbackData); // 이변수는 콜백으로 조회하고 변화시켜야 하기 때문에 code state와 분리하여 저장한다.
    // setCode((prevState) => {
    //   return { ...prevState, parentCodeId: p };
    // });
  }

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
                      <h5 className="mt-2 card-title flex-grow-1">공통 코드 수정</h5>
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
                              value={code.codeId || ''}
                              readOnly={true}
                              disabled={true}
                            />
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
                                type="text"
                                className="form-control"
                                placeholder="부모 코드 아이디를 선택해주세요."
                                readOnly={true}
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
                      <Row>
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                          style={{ width: '100px', fontWeight: 'bold' }}
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

export default CodeUpd;
