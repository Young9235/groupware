import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  PaginationItem,
  PaginationLink,
  Pagination,
} from 'reactstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';
import { deleteCodeList, getCodeList } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import { errorMsg, successMsg } from "components/Common/Toaster";
import DeleteModal from 'src/components/Common/DeleteModal';
import ActionButton from 'src/components/Common/ActionButton';
// import { useDispatch, useSelector } from "react-redux";

// =============================== [코드 정보 조회] ===============================
// function QueryStringToJSON(qs) {
//   qs = qs.substr(1);
//   //파라메터별 분리
//   var pairs = qs.split("&");

//   var result = {}; //json 빈 객체

//   //각 파라메터별 key/val 처리
//   pairs.forEach(function (pair) {
//     pair = pair.split("="); //key=val 분리
//     result[pair[0]] = decodeURIComponent(pair[1] || "");
//   });

//   return JSON.parse(JSON.stringify(result)); //json 객체를 문자열화해서 리턴
// }

const CodeList = () => {
  const [codes, setCodes] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [endPage, setEndPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [handleDelClick, setHandleDelClick] = useState(''); // 리스트 삭제버튼 이벤트
  const [deleteModal, setDeleteModal] = useState(false);
  const pagingCount = useRef(5); // 한페이지에서 보일 페이지 수 -> state변화가 필요하지 않다. -> 리렌더링방지
  // const [flag, setFlag] = useState(false);

  // 검색 버튼 클릭 시, 조회 할 데이터 셋팅
  // const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  //const location = useLocation();
  //let queryString = useRef("");

  // 검색조건에 들어갈 데이터 셋팅
  const [formData, setFormData] = useState({
    codeName: '',
    codeId: '',
    parentCodeId: '',
  });

  // 검색 버튼 클릭 시, 조회 할 데이터 셋팅
  const [submit, setSubmit] = useState({});
  // 체크된 아이템을 담을 배열 -> 삭제할 codeId List
  const [checkItems, setCheckItems] = useState([]);

  // 페이징, 검색 조건
  let search = useMemo(() => {
    return {
      startPage: currentPage,
      rowsPerPage: pageSize,
      currentPage: currentPage,
      pagingCount: pagingCount.current,
      schInputBox: submit.codeName,
    };
  }, [pageSize, submit, currentPage]);

  // useEffect(() => {
  //   const urlParam = location.search;
  //   console.log("urlParam : ", urlParam);
  //   const urlParamObj = QueryStringToJSON(urlParam);
  //   console.log("urlParamObj : ", urlParamObj);
  //   if (urlParam !== "" && urlParam !== null) {
  //     search.startPage = urlParamObj.startPage;
  //     search.rowsPerPage = urlParamObj.rowsPerPage;
  //     search.currentPage = urlParamObj.currentPage;
  //     search.schCodeName = urlParamObj.schCodeName;
  //     setFormData({
  //       codeName: urlParamObj.schCodeName,
  //     });

  //     location.search = "";
  //   }
  // }, [location, search]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      codes.forEach((el) => idArray.push(el.codeId));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      initCheckItem();
    }
  };

  const getCodes = useCallback(() => {
    setLoading(true);
    console.log('searchData : ', search);

    // queryString.current = Object.entries(search)
    //   .map(([key, value]) => value && key + "=" + value)
    //   .filter((v) => v)
    //   .join("&");

    //console.log("queryString : ", queryString);
    // setSearchParams(queryString);

    getCodeList({ params: search })
      .then((data) => {
        setCodes(data.dataList);
        setStartPage(data.startPage);
        setCurrentPage(data.currentPage);
        setEndPage(data.endPage);
        setTotalPage(data.totalPage);
        setLoading(false);
        console.log('listData', data);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [search]);

  // 조회 처리
  useEffect(() => {
    getCodes();
  }, [getCodes]);

  // 한 페이지당 보일 데이터 선택
  const onChangeInSelect = (event) => {
    // console.log(event.target.value);
    setCurrentPage(1);
    setPageSize(Number(event.target.value));
  };

  // useEffect(() => {
  //   console.log("pageSize", pageSize);
  //   search.rowsPerPage = pageSize;
  // }, [pageSize]);

  // 첫번째 페이지 수 셋팅
  // const onChangeInInput = (event) => {
  //   const page = event.target.value ? Number(event.target.value) : 0;
  //   console.log("onChangeInInput page ", page);
  //   setStartPage(page);
  // };

  //  페이징을 제외한 검색 조건 셋팅 todo: formData에 object 형태로 담을 것임
  const changeValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData.codeName);
  };

  // 조회 버튼 클릭 -> formData를 최종 보내야할 submit데이터에 담기
  // formData는 계속 change될 데이터, submit은 최종 보낼 데이터
  const onSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSubmit(formData);
    // setSchCodeName(codeName);
  };

  const deleteCodes = useCallback(
    (codes) => {
      console.log('codes', codes);
      // arrayList를 ","로 해서 파라미터 넘기기 서버에 리스트 형태로 들어간다
      deleteCodeList({ params: { codeIdList: codes.join(',') } })
        .then((response) => {
          if (response > 0) {
            console.log('response ==> ' + response);
            getCodes();
            alert('삭제가 정상적으로 처리 되었습니다.');
          } else if (response === -1) {
            setLoading(false);
            alert(
              '삭제할 코드에 부모 코드가 존재합니다. \n자식 코드를 모두 삭제 한 후에 진행 해주세요.'
            );
          } else {
            setLoading(false);
            alert('삭제 실패');
          }
        })
        .catch((e) => {
          setLoading(false);
          console.error(e);
        });
    },
    [getCodes]
  );

  // 일괄 삭제 버튼 클릭 이벤트
  const handleDelCodesClick = (e) => {
    e.preventDefault();
    console.log(checkItems);
    setDeleteModal(true);
  };

  // 한건 삭제
  useEffect(() => {
    if (handleDelClick !== '' && handleDelClick !== null) {
      setDeleteModal(true);
      setCheckItems([handleDelClick]);
    }
  }, [handleDelClick, setCheckItems]);

  const onClickDelete = (param) => {
    console.log(param);
    deleteCodes(checkItems);
    initCheckItem();
    setDeleteModal(false);
  };

  const onCloseClick = () => {
    initCheckItem();
    setDeleteModal(false);
  };

  const initCheckItem = () => {
    setHandleDelClick('');
    setCheckItems([]);
  };

  //////// 구현중
  // const dispatch = useDispatch();
  // const { pages } = useSelector((state) => ({
  //   pages: state.pagesReducer.pages,
  // }));

  // console.log(pages);

  // useEffect(() => {
  //   if (pages && !pages.length) {
  //     dispatch();
  //   }
  // }, [dispatch, pages]);

  const pagination = () => {
    const result = [];
    for (let i = startPage; i <= endPage; i++) {
      result.push(
        <PaginationItem key={i} active={i === currentPage && true}>
          <PaginationLink
            onClick={() => {
              initCheckItem();
              setCurrentPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return result;
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="코드 관리" breadcrumbItem="공통 코드 관리" />
            <Card>
              <CardBody className="border-bottom">
                <Row>
                  <Col md={4}>
                    <Row>
                      <Col md={3} style={{ minWidth: '140px' }}>
                        <h5 className="mt-2 card-title flex-grow-1">공통 코드 목록</h5>
                      </Col>
                      <Col md={6}>
                        <select
                          className="form-select"
                          value={pageSize}
                          onChange={onChangeInSelect}
                        >
                          {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                              Show {pageSize}
                            </option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={8} style={{ textAlign: 'right' }}>
                    <Button
                      type="button"
                      color="danger"
                      className="btn me-2"
                      onClick={handleDelCodesClick}
                    >
                      <i className="mdi mdi-plus-circle-outline me-1" />
                      삭제
                    </Button>
                    <Button
                      type="button"
                      color="primary"
                      className="btn me-2"
                      onClick={(e) => {
                        navigate('/code/reg', { replace: true });
                      }}
                    >
                      <i className="mdi mdi-plus-circle-outline me-1" />
                      등록
                    </Button>

                    {/* <Link to="#!" className="btn btn-success me-1">
                      <i className="mdi mdi-refresh"></i>
                    </Link> */}
                  </Col>
                </Row>
              </CardBody>
              <CardBody>
                <Row>
                  <Col xxl={2} lg={4}>
                    <form onSubmit={onSubmit}>
                      <Input
                        placeholder={`코드 명을 입력해주세요.`}
                        value={formData.codeName || ''}
                        name="codeName"
                        onChange={changeValue}
                        autoFocus
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     //console.log(e.target.value);
                        //     onSubmit(e);
                        //   }
                        // }}
                      />
                    </form>
                  </Col>
                  <Col xxl={1} lg={4} style={{ minWidth: '100px' }}>
                    <div className="mb-3 mb-xxl-0">
                      <button
                        type="button"
                        className="btn btn-light "
                        onClick={onSubmit}
                        style={{ width: '100%' }}
                      >
                        <i className="bx bx bx-search-alt font-size-16 align-middle me-2"></i>
                        조회
                      </button>
                    </div>
                  </Col>
                </Row>
                {/* <CardTitle>공통 코드 목록 </CardTitle> */}
                {/* <CardSubtitle className="mb-3">
                    This is an experimental awesome solution for responsive
                    tables with complex data.
                  </CardSubtitle>  */}
                <Row className="mt-2">
                  <div className="table-rep-plugin">
                    <div className="table-responsive mb-0" data-pattern="priority-columns">
                      <Table id="tech-companies-1" className="table table-striped table-bordered">
                        <Thead>
                          <Tr>
                            <Th data-priority="1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="select-all"
                                onChange={(e) => handleAllCheck(e.target.checked)}
                                // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                                checked={checkItems.length === codes.length ? true : false}
                              />
                            </Th>
                            <Th>코드 ID</Th>
                            <Th>부모코드 ID</Th>
                            <Th>코드 명</Th>
                            <Th>코드 값</Th>
                            <Th>설명</Th>
                            <Th>생성자</Th>
                            <Th>생성일자</Th>
                            <Th style={{ width: '10%' }}>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {codes.map((code) => (
                            <Tr key={code.codeId}>
                              <Th>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name={`select-${code.codeId}`}
                                  onChange={(e) => handleSingleCheck(e.target.checked, code.codeId)}
                                  // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                  checked={checkItems.includes(code.codeId) ? true : false}
                                />
                              </Th>
                              <Td>{code.codeId}</Td>
                              <Td>{code.parentCodeId}</Td>
                              <Td>{code.codeName}</Td>
                              <Td>{code.codeValue}</Td>
                              <Td>{code.description}</Td>
                              <Td>{code.createUserNm}</Td>
                              <Td>{code.createDate}</Td>
                              <Td>
                                <ActionButton
                                  id={code.codeId}
                                  // detailPage={
                                  //   `/code/detail/${code.codeId}?` +
                                  //   queryString.current
                                  // }
                                  detailPage={`/code/detail/${code.codeId}`}
                                  updatePage={`/code/update/${code.codeId}`}
                                  state={{ state: search }}
                                  setHandleDelClick={setHandleDelClick}
                                />
                              </Td>
                            </Tr>
                          ))}
                          <DeleteModal
                            show={deleteModal}
                            description={`(코드ID : ${handleDelClick})\n선택한 정보를 삭제하시겠습니까?`}
                            onDeleteClick={onClickDelete}
                            onCloseClick={onCloseClick}
                          />
                        </Tbody>
                      </Table>
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </div>

          {/* 페이징 처리 구현 중 */}
          <Row>
            <Col lg={12}>
              <Pagination
                aria-label="Page navigation example"
                listClassName="justify-content-center"
              >
                <PaginationItem>
                  <PaginationLink
                    onClick={() => {
                      if (startPage === 1) return false;
                      setCurrentPage(
                        endPage % pagingCount.current === 0
                          ? endPage - pagingCount.current
                          : pagingCount.current * parseInt(endPage / pagingCount.current)
                      );
                    }}
                    previous={startPage === 1 ? false : true}
                  >
                    <i className="mdi mdi-chevron-left" />
                  </PaginationLink>
                </PaginationItem>
                {pagination()}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => {
                      if (endPage === totalPage) return false;
                      setCurrentPage(startPage + pagingCount.current);
                    }}
                    next={endPage === totalPage ? false : true}
                  >
                    <i className="mdi mdi-chevron-right" />
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </Col>
          </Row>
          {/* <Row className="justify-content-md-end justify-content-center align-items-center mb-4">
            <Col className="col-md-auto">
              <div className="d-flex gap-1">
                <Button
                  color="primary"
                  // onClick={() => gotoPage(0)}
                  // disabled={!canPreviousPage}
                >
                  {"<<"}
                </Button>
                <Button
                  color="primary"
                  // onClick={previousPage}
                  // disabled={!canPreviousPage}
                >
                  {"<"}
                </Button>
              </div>
            </Col>
            <Col className="col-md-auto d-none d-md-block">
              Page{" "}
              <strong>
                {" "}
                {startPage} of {endPage}
              </strong>
            </Col>
            <Col className="col-md-auto">
              <Input
                type="number"
                min={1}
                style={{ width: 70 }}
                max={endPage}
                defaultValue={startPage}
                onChange={onChangeInInput}
              />
            </Col>

            <Col className="col-md-auto">
              <div className="d-flex gap-1">
                <Button
                  color="primary"
                  // onClick={nextPage} disabled={!canNextPage}
                >
                  {">"}
                </Button>
                <Button
                  color="primary"
                  // onClick={() => gotoPage(pageCount - 1)}
                  // disabled={!canNextPage}
                >
                  {">>"}
                </Button>
              </div>
            </Col>
          </Row> */}
        </div>
      )}
    </React.Fragment>
  );
};

export default CodeList;
