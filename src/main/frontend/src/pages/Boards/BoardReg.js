import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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

import Dropzone from 'react-dropzone';

import { Link } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';

//Import Breadcrumb
import Breadcrumb from 'src/components/Common/Breadcrumb';
import axios from 'axios';

function BoardReg() {
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    BoardId: '',
    Title: '',
    Contents: '',
    useYn: '',
  });

  const [selectedFiles, setselectedFiles] = useState([]); // drag and drop State 관리

  function handleAcceptedFiles(files) {
    console.log('file.length >>>> ', files.length);
    // drage & drop 파일 셋팅
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    ); // Object.assign(target, ...sources) => 초기값, 객체들 ==>> 파일 초기값, 미리보기, 파일 사이즈를 합치는 부분

    setselectedFiles([...selectedFiles, ...files]); // 기존 파일 값 + 새로 받은 파일 (배열)값
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const handleCancle = (idx) => {
    // 업로드 파일 삭제
    setselectedFiles([
      ...selectedFiles.slice(0, idx),
      ...selectedFiles.slice(idx + 1, selectedFiles.length),
    ]);
  };

  const changeValue = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  const submitBoard = (e) => {
    e.preventDefault();
    if (board.Title === '') {
      alert('제목은 필수 입력값입니다.');
      return false;
    }
    if (board.Contents === '') {
      alert('내용은 필수 입력값입니다.');
      return false;
    }
    Send();
  };

  function Send() {
    const fd = new FormData();
    fd.append('title', board.Title);
    fd.append('contents', board.Contents);
    fd.append('useyn', board.useYn);

    Object.values(selectedFiles).forEach((file) => fd.append('file', file));

    axios
      .post('/board/reg', fd, {
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
      })
      .then(function (response) {
        console.log('response', response);
        if (response.data > 0) {
          alert('정상적으로 등록이 되었습니다!');
          navigate('/board');
        } else {
          alert('error code : ' + response.data);
          return false;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumb title="Projects" breadcrumbItem="Board > Create Board" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4" style={{ marginLeft: '2%' }}>
                    게시판 등록
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
                        제목<span style={{ color: 'red' }}>*</span>
                      </Label>
                      <Col lg="9">
                        <Input
                          id="Title"
                          name="Title"
                          type="text"
                          className="form-control"
                          placeholder="제목을 입력하세요."
                          onChange={changeValue}
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
                          placeholder="내용을 입력하세요."
                          onChange={changeValue}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-2" row>
                      <label
                        htmlFor="useYn"
                        className="col-form-label col-lg-2"
                        style={{ marginLeft: '2%' }}
                      >
                        사용 여부
                      </label>
                      <Col lg="1">
                        <div className="mt-2">
                          <div className="form-check mb-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value="option1"
                              defaultChecked
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
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            // drag and drop 될 때마다 실행
                            handleAcceptedFiles(acceptedFiles);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                              <div className="dz-message needsclick mt-2" {...getRootProps()}>
                                <input className="input-zone" {...getInputProps()} />
                                <div className="mb-3">
                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                </div>
                                <h4>Drop files here or click to upload.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div className="dropzone-previews mt-3" id="file-previews">
                          {selectedFiles.map((f, i) => {
                            return (
                              <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + '-file'}
                              >
                                <div className="p-2">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={f.name}
                                        src={f.preview}
                                      />
                                    </Col>
                                    <Col>
                                      <Link to="#" className="text-muted font-weight-bold">
                                        {f.name}
                                      </Link>
                                      <p className="mb-0">
                                        <strong>{f.formattedSize}</strong>
                                      </p>
                                    </Col>
                                    <Col lg="1">
                                      <i
                                        className="bx bx-no-entry"
                                        style={{ color: 'red' }}
                                        onClick={() => handleCancle(i)}
                                      ></i>
                                    </Col>
                                  </Row>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      </Col>
                    </FormGroup>
                  </Form>
                  <Row className="justify-content-end">
                    <Col lg="3">
                      <Button type="submit" color="primary" onClick={submitBoard}>
                        등록
                      </Button>
                      <button
                        className="btn btn-danger"
                        onClick={() => navigate('/board')}
                        style={{ marginLeft: '10px' }}
                      >
                        취소
                      </button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default BoardReg;
