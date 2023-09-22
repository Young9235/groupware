import React, { useEffect, useCallback, useMemo, useState, useRef } from 'react';

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
import { useLocation, useNavigate } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';
import { getBoardList, deleteBoardList } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';
import DeleteModal from 'src/components/Common/DeleteModal';
import ActionButton from 'src/pages/Boards/items/ActionButton';

// ============================== [게시판 조회] ==============================
function QueryStringToJSON(qs) {
  qs = qs.substr(1);
  //파라메터별 분리
  var pairs = qs.split('&');

  var result = {}; //json 빈 객체

  //각 파라메터별 key/val 처리
  pairs.forEach(function (pair) {
    pair = pair.split('='); //key=val 분리
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return JSON.parse(JSON.stringify(result)); //json 객체를 문자열화해서 리턴
}

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [endPage, setEndPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [handleDelClick, setHandleDelClick] = useState(''); // 리스트 삭제버튼 이벤트
  const [deleteModal, setDeleteModal] = useState(false);
  const pagingCount = useRef(5); // 한페이지에서 보일 페이지 수 -> state변화가 필요하지 않다. -> 리렌더링방지

  const navigate = useNavigate();
  const location = useLocation();
  let queryString = useRef('');

  // 검색조건에 들어갈 데이터 셋팅
  const [formData, setFormData] = useState({
    schTitle: '',
  });

  // 검색 버튼 클릭 시, 조회 할 데이터 셋팅
  const [submit, setSubmit] = useState({});
  // 체크된 아이템을 담을 배열 -> 삭제할 boardId List
  const [checkItems, setCheckItems] = useState([]);

  // 페이징 검색 조건
  let search = useMemo(() => {
    return {
      startPage: currentPage,
      rowsPerPage: pageSize,
      currentPage: currentPage,
      pagingCount: pagingCount.current,
      schBoardName: submit.schTitle,
    };
  }, [pageSize, submit, currentPage]);

  useEffect(() => {
    const urlParam = location.search;
    const urlParamObj = QueryStringToJSON(urlParam);
    if (urlParam !== '' && urlParam !== null) {
      search.startPage = urlParamObj.startPage;
      search.rowsPerPage = urlParamObj.rowsPerPage;
      search.currentPage = urlParamObj.currentPage;
      search.schBoardName = urlParamObj.schBoardName;
      setFormData({
        schTitle: urlParamObj.schBoardName,
      });

      location.search = '';
    }
  }, [location, search]);

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
      boards.forEach((el) => idArray.push(el.boardId));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      //  setCheckItems([]);
      initCheckItem();
    }
  };

  const getBoards = useCallback(() => {
    setLoading(true);
    console.log('searchData', search);

    queryString.current = Object.entries(search)
      .map(([key, value]) => value && key + '=' + value)
      .filter((v) => v)
      .join('&');

    getBoardList({ params: search })
      .then((data) => {
        setBoards(data.dataList);
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
    getBoards();
  }, [getBoards]);

  // 한 페이지당 보일 데이터 선택
  const onChangeInSelect = (event) => {
    // console.log(event.target.value);
    setCurrentPage(1);
    setPageSize(Number(event.target.value));
  };

  const changeValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 조회 버튼 클릭 -> formData를 최종 보내야할 submit데이터에 담기
  // formData는 계속 change될 데이터, submit은 최종 보낼 데이터
  const onSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSubmit(formData);
  };

  // 삭제
  const deleteBoards = useCallback(
    (boards) => {
      // arrayList를 ","로 해서 파라미터 넘기기 서버에 리스트 형태로 들어간다
      console.log('boards', boards);
      deleteBoardList({ params: { boardIdList: boards.join(',') } })
        .then((response) => {
          if (response > 0) {
            getBoards();
            alert('삭제가 정상적으로 처리 되었습니다.');
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
    [getBoards]
  );

  // 일괄 삭제 버튼 클릭 이벤트
  const handleDelBoardsClick = (e) => {
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
    deleteBoards(checkItems);
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

  // 페이징
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
            <Breadcrumbs title="게시판" breadcrumbItem="게시판" />
            <Card>
              <CardBody className="border-bottom">
                <Row>
                  <Col md={4}>
                    <Row>
                      <Col md={3} style={{ minWidth: '140px' }}>
                        <h5 className="mt-2 card-title flex-grow-1">게시판</h5>
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
                      color="primary"
                      className="btn me-2"
                      onClick={() => {
                        navigate('/board/reg');
                      }}
                    >
                      <i className="mdi mdi-plus-circle-outline me-1" />
                      등록
                    </Button>
                    <Button
                      type="button"
                      color="danger"
                      className="btn me-2"
                      onClick={handleDelBoardsClick}
                    >
                      <i className="mdi mdi-plus-circle-outline me-1" />
                      삭제
                    </Button>
                  </Col>
                </Row>
              </CardBody>
              <CardBody>
                <Row>
                  <Col xxl={2} lg={4}>
                    <form onSubmit={onSubmit} className="mb-2">
                      <Input
                        placeholder={`제목을 입력하세요.`}
                        value={formData.schTitle || ''}
                        name="schTitle"
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
                  <Col xxl={1} lg={4}>
                    <div className="mb-3 mb-xxl-0">
                      <button
                        type="button"
                        className="btn btn-soft-secondary w-100"
                        onClick={onSubmit}
                      >
                        <i className="bx bx bx-search-alt align-middle"></i> 조회
                      </button>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <div className="table-rep-plugin">
                    <div className="table-responsive mb-0" data-pattern="priority-columns">
                      <Table
                        id="tech-companies-1"
                        className="table table-striped table-bordered table-hover"
                        style={{ textAlign: 'center' }}
                      >
                        <Thead>
                          <Tr>
                            <Th data-priority="1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="select-all"
                                onChange={(e) => handleAllCheck(e.target.checked)}
                                // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                                checked={checkItems.length === boards.length ? true : false}
                              />
                            </Th>
                            <Th>board ID</Th>
                            <Th>제목</Th>
                            <Th>작성자</Th>
                            <Th>수정 일자</Th>
                            <Th>조회수</Th>
                            <Th>첨부파일</Th>
                            <Th style={{ width: '10%' }}>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {boards.map((board) => (
                            <Tr
                              key={board.boardId}
                              onDoubleClick={() => {
                                // 상세
                                //  navigate("/board/detail/" + board.boardId);
                                navigate(`/board/detail/${board.boardId}?` + queryString.current);
                              }}
                            >
                              <Td>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name={`select-${board.boardId}`}
                                  onChange={(e) =>
                                    handleSingleCheck(e.target.checked, board.boardId)
                                  }
                                  // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                  checked={checkItems.includes(board.boardId) ? true : false}
                                />
                              </Td>
                              <Td>{board.boardId}</Td>
                              <Td>{board.title}</Td>
                              <Td>{board.createUserNm}</Td>
                              <Td>{board.updateDate}</Td>
                              <Td>{board.readCnt}</Td>

                              <Td>
                                {(() => {
                                  if (board.attachFileCnt > 0) {
                                    const td = [];

                                    td.push(
                                      <i
                                        key={board.attachFileCnt}
                                        className="bx bx-archive-in"
                                        id="viewtooltip"
                                      />
                                    );

                                    return td;
                                  }
                                })()}
                              </Td>
                              <Td>
                                <ActionButton
                                  boardId={board.boardId}
                                  setHandleDelClick={setHandleDelClick}
                                />
                              </Td>
                            </Tr>
                          ))}
                          <DeleteModal
                            show={deleteModal}
                            description={`(BoardID : ${handleDelClick})\n선택한 정보를 삭제하시겠습니까?`}
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
        </div>
      )}
    </React.Fragment>
  );
};

export default BoardList;
