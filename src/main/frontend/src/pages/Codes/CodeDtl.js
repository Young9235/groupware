import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

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
import { getCodeInfo } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';

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

const CodeDtl = () => {
  //meta title
  document.title = 'Add Product | Skote - React Admin & Dashboard Template';

  const { codeId } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();
  const [loading, setLoading] = useState(true);

  const [code, setCode] = useState({
    codeId: '',
    codeName: '',
    codeValue: '',
    description: '',
    parentCodeId: '',
  });

  useEffect(() => {
    getCodeInfo(`${codeId}`).then((data) => {
      console.log(data);
      setCode(data);
      setLoading(false);
    });
  }, [codeId]);

  // const { state } = useLocation(); // 페이지 이동 전 상태 값
  // console.log(state);

  // const [searchParams, setSearchParams] = useSearchParams();
  // console.log(location);

  return (
    <React.Fragment>
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
                      <h5 className="mt-2 card-title flex-grow-1">공통 코드 상세</h5>
                    </CardTitle>
                  </CardBody>
                  <CardBody>
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
                            value={code.codeId || ''}
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
                            value={code.codeName || ''}
                            disabled={true}
                          />
                        </FormGroup>

                        <FormGroup className="mb-3">
                          <Label htmlFor="price">Code Value</Label>
                          <Input
                            id="codeValue"
                            name="codeValue"
                            type="text"
                            className="form-control"
                            placeholder="코드 값을 입력해주세요."
                            value={code.codeValue || ''}
                            disabled={true}
                          />
                        </FormGroup>
                      </Col>

                      <Col sm="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="manufacturername">Parent Code ID</Label>
                          <Input
                            id="parentCodeId"
                            name="parentCodeId"
                            type="text"
                            className="form-control"
                            placeholder="부모 코드 아이디를 선택해주세요."
                            value={code.parentCodeId || ''}
                            disabled={true}
                          />
                        </FormGroup>
                        <FormGroup className="mb-3">
                          <Label htmlFor="description">Comments</Label>
                          <Input
                            className="form-control mb-3"
                            id="description"
                            name="description"
                            type="textarea"
                            rows="5"
                            value={code.description || ''}
                            disabled={true}
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
                          // navigate("/code", { replace: true });
                        }}
                      >
                        목록으로
                      </Button>
                      <Button
                        type="submit"
                        color="primary"
                        className="btn "
                        onClick={() => {
                          navigate(`/code/update/${codeId}`, { replace: true });
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

export default CodeDtl;
