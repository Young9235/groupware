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
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getBoardInfo } from 'src/axios-apis/backend';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import Loader from 'src/components/Common/Loader';

const BoardUpdate = () => {
  //meta title
  document.title = 'Add Product | Skote - React Admin & Dashboard Template';

  const { id } = useParams();

  // console.log("update Page Id ", id);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [board, setBoard] = useState({
    boardId: '',
    title: '',
    contents: '',
    attachList: '',
    useYn: '',
    userName: '',
    fileSize: '',
    orgFileNm: '',
    attatchId: '',
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

  useEffect(() => {
    getBoardInfo(`${id}`).then((data) => {
      console.log('data ', data);
      setBoard(data);
      setLoading(false);
    });
  }, [id]);

  const changeValue = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  const submitBoard = (e) => {
    e.preventDefault();
    if (board.title === '') {
      alert('제목은 필수 입력값입니다.');
      return false;
    }
    if (board.contents === '') {
      alert('내용은 필수 입력값입니다.');
      return false;
    }
    Send();
  };

  // 첨부파일 저장, 전송
  function Send() {
    const fd = new FormData();
    fd.append('title', board.title);
    fd.append('contents', board.contents);
    fd.append('useYn', board.useYn);

    Object.values(selectedFiles).forEach((file) => fd.append('file', file));

    for (let key of fd.keys()) {
      console.log(key, ':', fd.get(key));
    }

    axios
      .post(`/board/update/${board.boardId}`, fd, {
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
      })
      .then(function (response) {
        console.log('response', response);
        if (response.data > 0) {
          alert('정상적으로 등록이 되었습니다!');
          navigate('/board', { replace: true });
        } else {
          alert('error code : ' + response.data);
          return false;
        }
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  }

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
        responseType: 'blob', // 지정 해두지 않으면 글자로 출력 된다.
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

  // 기존 첨부파일 삭제
  const delAttatch = (i) => {
    if (window.confirm('삭제하시겠습니까 ?')) {
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
        .post(`/board/delAttach/${param}`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data;',
          },
        })
        .then(function (response) {
          console.log('response', response);
          if (response.data > 0) {
            alert('삭제가 완료되었습니다.');
            window.location.reload();
          } else {
            console.log('error code : ' + response.data);
            return false;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="게시판" breadcrumbItem="게시판 수정" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4" style={{ marginLeft: '2%' }}>
                      게시판 수정
                    </CardTitle>
                    <Form
                      className="needs-validation"
                      onSubmit={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                    >
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="manufacturerbrand"
                          className="col-form-label col-lg-2"
                          style={{ marginLeft: '2%' }}
                        >
                          제목 <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Col lg="9">
                          <Input
                            id="title"
                            name="title"
                            type="text"
                            className="form-control"
                            onChange={changeValue}
                            value={board.title || ''}
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
                            id="userName"
                            name="userName"
                            type="text"
                            className="form-control"
                            value={board.userName || ''}
                            readOnly={true}
                            disabled={true}
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
                            id="contents"
                            name="contents"
                            type="text"
                            rows="10"
                            className="form-control"
                            onChange={changeValue}
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
                              <Input
                                className="form-check-input"
                                type="radio"
                                name="useYn"
                                value="Y"
                                onChange={changeValue}
                                defaultChecked={board.useYn === 'Y'}
                              />
                              <label className="form-check-label" htmlFor="useYn">
                                운영
                              </label>
                            </div>
                            <Input
                              className="form-check-input"
                              type="radio"
                              name="useYn"
                              value="N"
                              onChange={changeValue}
                              style={{ marginLeft: 20 }}
                              defaultChecked={board.useYn === 'N'}
                            />
                            <label className="form-check-label" htmlFor="useYn">
                              미운영
                            </label>
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
                      <FormGroup className="mb-4" row>
                        <label
                          htmlFor="attach"
                          className="col-form-label col-lg-2"
                          style={{ marginLeft: '2%' }}
                        >
                          파일 목록
                        </label>
                        <Col lg="9" className="mt-2 justify-content-end">
                          <Table
                            id="tech-companies-1"
                            className="table table-striped table-bordered"
                            style={{ textAlign: 'center' }}
                          >
                            <Thead>
                              <Tr>
                                <Th>파일 명</Th>
                                <Th>사이즈</Th>
                                <Th>Action</Th>
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
                                  const delAtt = [];
                                  delAtt.push(board.attatchId.split(','));

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
                                          <i
                                            style={{
                                              cursor: 'pointer',
                                              marginLeft: 20,
                                              color: 'red',
                                            }}
                                            onClick={() => delAttatch(i)}
                                            className="bx bx-no-entry"
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
                                        <i
                                          style={{
                                            cursor: 'pointer',
                                            marginLeft: 20,
                                            color: 'red',
                                          }}
                                          className="bx bx-no-entry"
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

                      <div className="d-flex justify-content-end gap-2">
                        <Button
                          type="submit"
                          color="primary"
                          className="btn "
                          onClick={submitBoard}
                        >
                          수정
                        </Button>
                        <Button
                          color="secondary"
                          className=""
                          onClick={() => {
                            navigate('/board');
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

export default BoardUpdate;
