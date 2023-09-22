import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

import { getBoardInfo } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-datepicker/dist/react-datepicker.css';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import axios from 'axios';

//Import Breadcrumb
import Breadcrumb from 'src/components/Common/Breadcrumb';

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

const BoardDetail = () => {
  //meta title
  document.title = 'Board Detail | Skote - React Admin & Dashboard Template';

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const [board, setBoard] = useState({
    title: '',
    createUserNm: '',
    contents: '',
    boardId: '',
    fileSize: '',
    orgFileNm: '',
    saveFileNm: '',
    attachFileCnt: '',
    attatchId: '',
  });

  useEffect(() => {
    getBoardInfo(`${id}`).then((data) => {
      console.log('data ', data);
      setBoard(data);
      setLoading(false);
    });
  }, [id]);

  //첨부파일 다운
  const attachDown = (i) => {
    const attatch = [];
    attatch.push(board.attatchId.split(','));
    let param;
    const fd = new FormData();
    for (let j = 0; j < board.attatchId.split(',').length; j++) {
      if (i === j) {
        param = 'boardId=' + board.boardId + '&attatchId=' + attatch[0][j];
        fd.append('boardId', board.boardId);
        fd.append('attatchId', attatch[0][j]);
      }
    }

    axios
      .post(`/board/attachDown/${param}`, fd, {
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
        responseType: 'blob',
      })
      .then(function (response) {
        console.log('response', response);
        if (response.data !== null) {
          const blob = new Blob([response.data]);
          const fileObjectUrl = window.URL.createObjectURL(blob);

          // blob 객체 URL을 설정할 링크를 만듭니다.
          const link = document.createElement('a');
          link.href = fileObjectUrl;
          link.style.display = 'none';

          link.download = extractDownloadFilename(response);

          document.body.appendChild(link);
          link.click();
          link.remove();

          // 다운로드가 끝난 리소스(객체 URL)를 해제합니다.
          window.URL.revokeObjectURL(fileObjectUrl);
        } else {
          console.log('error code : ' + response.data);
          return false;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 다운로드 파일 이름을 추출하는 함수
  const extractDownloadFilename = (response) => {
    const disposition = response.headers['content-disposition'];
    const fileName = decodeURI(
      disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1].replace(/['"]/g, '')
    );
    return fileName;
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumb title="Projects" breadcrumbItem="Board > Create Board" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4" style={{ marginLeft: '2%' }}>
                      게시판 수정
                    </CardTitle>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                    >
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="Title"
                          className="col-form-label col-lg-2"
                          style={{ marginLeft: '2%' }}
                        >
                          제목 <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col lg="9">
                          <Input
                            id="Title"
                            name="Title"
                            type="text"
                            className="form-control"
                            value={board.title || ''}
                            disabled
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="createUserNm"
                          className="col-form-label col-lg-2"
                          style={{ marginLeft: '2%' }}
                        >
                          작성자
                        </Label>
                        <Col lg="2">
                          <Input
                            id="createUserNm"
                            name="createUserNm"
                            type="text"
                            disabled
                            className="form-control"
                            value={board.userName || ''}
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="Contents"
                          className="col-form-label col-lg-2"
                          style={{ marginLeft: '2%' }}
                        >
                          내용<span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col lg="9">
                          <textarea
                            className="form-control"
                            id="Contents"
                            name="Contents"
                            rows="10"
                            disabled
                            value={board.contents || ''}
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup className="mb-4" row>
                        <label
                          htmlFor="useYn"
                          className="col-form-label col-lg-2"
                          style={{ marginLeft: '2%' }}
                        >
                          사용 여부
                        </label>
                        <Col lg="3">
                          <div className="mt-2 d-flex justify-content-start">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                value="option1"
                                defaultChecked
                                disabled
                              />
                              <label className="form-check-label" htmlFor="exampleRadios1">
                                운영
                              </label>
                            </div>
                          </div>
                        </Col>
                      </FormGroup>

                      <FormGroup className="mb-4" row>
                        <label
                          htmlFor="attach"
                          className="col-form-label col-lg-2"
                          style={{ marginLeft: '2%' }}
                        >
                          파일 첨부
                        </label>
                        <Col lg="9" className="mt-2">
                          <Table
                            id="tech-companies-1"
                            className="table table-striped table-bordered"
                            style={{ textAlign: 'center' }}
                          >
                            <Thead>
                              <Tr>
                                <Th>파일 명</Th>
                                <Th>사이즈</Th>
                                <Th>다운로드</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {(() => {
                                if (board.orgFileNm === null || board.orgFileNm === 'null') {
                                } else if (board.orgFileNm.length > 1) {
                                  const array = [];
                                  array.push(board.orgFileNm.split(','));
                                  const size = [];
                                  size.push(board.fileSize.split(','));
                                  const td = [];
                                  for (let i = 0; i < board.orgFileNm.split(',').length; i++) {
                                    td.push(
                                      <tr key={i}>
                                        <td>{array[0][i]}</td>
                                        <td>{size[0][i]} [Byte]</td>
                                        <td>
                                          <i
                                            className="bx bx-download"
                                            onClick={() => attachDown(i)}
                                            style={{ cursor: 'pointer' }}
                                          />
                                        </td>
                                      </tr>
                                    );
                                  }
                                  return td;
                                } else if (board.orgFileNm.length === 1) {
                                  const td = [];
                                  td.push(
                                    <tr key={board.boardId}>
                                      <td>{board.orgFileNm}</td>
                                      <td>{board.fileSize} [Byte]</td>
                                      <td>
                                        <i
                                          className="bx bx-download"
                                          onClick={() => attachDown(board.orgFileNm)}
                                          style={{ cursor: 'pointer' }}
                                        />
                                      </td>
                                    </tr>
                                  );
                                  return td;
                                }
                              })()}
                            </Tbody>
                          </Table>
                        </Col>
                      </FormGroup>
                    </Form>
                    <Row className="justify-content-end">
                      <Col lg="2">
                        {/* <Button
                          type="submit"
                          color="primary"
                          style={{ marginRight: 10 }}
                          onClick={() => {
                            navigate("/board");
                          }}
                        >
                          확인
                        </Button> */}
                        <Button
                          type="submit"
                          color="primary"
                          onClick={() => {
                            navigate('/board' + location.search, {
                              replace: true,
                            });
                          }}
                        >
                          확인
                        </Button>
                      </Col>
                    </Row>
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

export default BoardDetail;
