import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import axios from "axios";

import { Row, Col, Card, CardBody, Button, UncontrolledTooltip } from 'reactstrap';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { getUsers, deleteUser } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';
import DeleteModal from 'src/components/Common/DeleteModal';
import Paging from 'src/pages/User/items/Paging';
// import UserAction from "./UserAction";
// import { errorMsg, successMsg } from "components/Common/Toaster";

//redux

// 유저 정보 출력

const UserList = () => {
  const [users, setUsers] = useState([]);
  // const [schUserName,setSchUserName] = useState('')
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [endPage, setEndPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  //delete customer
  //삭제 Key값
  // const [key, setKey] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const pagingCount = useRef(5); // 한페이지에서 보일 페이지 수 -> state변화가 필요하지 않다. -> 리렌더링방지

  // 검색 버튼 클릭 시, 조회 할 데이터 셋팅
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const onClickDelete = () => {
    // setUsers(users)
    // setCheckItems(userId)
    setDeleteModal(true);
  };

  // 페이징
  const [totalCnt, setTotalCnt] = useState();
  const [page, setPage] = useState(1); //현재 페이지 저장
  const [back, setBack] = useState(); // 이전페이지 저장

  const handlePageChange = (page) => {
    setPage(page);
    setBack(searchParams.get('page'));
  };
  const [postPerPage, setPostPerPage] = useState(10); //페이지당 포스트 개수

  // 검색조건에 들어갈 데이터 셋팅
  const [formData, setFormData] = useState({
    userName: '',
  });

  // // 뒤로가기 제어
  window.onpopstate = () => {
    const num = Math.abs(back - page);

    //이전페이지와 현재페이지의 차이가 1보다 크면 이전페이지로 이동(ex) 1p -> 5p 갔다가 뒤로가기 )
    if (num > 1) {
      setPage(back);
    }
    // 상세,등록,수정 뒤로가기
    else if (isNaN(num)) {
      setPage(searchParams.get('page'));
    }
    // 페이징 뒤로가기
    else if (searchParams.get('page') > 1) {
      setPage(searchParams.get('page') - 1);
    }
  };

  // // 페이지 변경 시 변경된 페이지 저장
  useMemo(() => {
    if (searchParams.get('page') !== null) {
      setPage(searchParams.get('page'));
    }
  }, []);

  const handleDeleteUser = () => {
    console.log('전', checkItems);
    deleteUser({ params: { userIdList: checkItems.join(',') } })
      .then((response) => {
        console.log(response);
        if (response > 0) {
          alert('삭제가 정상적으로 처리 되었습니다.');
          setDeleteModal(false);
          getUsers().then((data) => {
            console.log('삭제 후 data >>>>>>>>>', data);
            setUsers(data.dataList);
            setLoading(false);
            setStartPage(data.startPage);
            setCurrentPage(data.currentPage);
            setEndPage(data.endPage);
            setTotalPage(data.totalPage);
          });
        } else {
          alert('삭제를 실패하였습니다.');
        }
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  // //유저 정보 조회
  //   useEffect(() => {
  //     setLoading(true);
  //     console.log("searchData : ", pages);
  //     getUsers({ params: pages })
  //       .then((data) => {
  //         setUsers(data.dataList);
  //         setStartPage(data.startPage);
  //         setCurrentPage(data.currentPage);
  //         setEndPage(data.endPage);
  //         setTotalPage(data.totalPage);
  //         setLoading(false);
  //         console.log("listData", data);
  //       })
  //       .catch((e) => {
  //         console.error(e);
  //         setLoading(false);
  //       });
  //   }, [pages]);

  // 검색조건 저장
  let search = useMemo(() => {
    setPostPerPage(pageSize);
    return {
      schUserName: submit.userName,
      startPage: page,
      rowsPerPage: pageSize,
      currentPage: page,
      pagingCount: pagingCount.current,
    };
  }, [pageSize, submit, page]);

  // 조회 처리
  useEffect(() => {
    console.log('메인 호출 함수 실행');
    setLoading(true);

    if (searchParams.get('userName') !== null) {
      if (searchParams.get('userName') !== search.schUserName && search.schUserName !== undefined) {
        search.schUserName = submit.userName;
        formData.userName = submit.userName;
      } else if (search.schUserName === undefined) {
        search.schUserName = searchParams.get('userName');
        formData.userName = searchParams.get('userName');
      }
    }
    if (search.schUserName !== undefined && search.schUserName !== null) {
      setSearchParams({ userName: search.schUserName, page: search.currentPage });
    } else {
      setSearchParams({ page: search.currentPage });
    }
    console.log('서버에 보낼 사용자 명', search.schUserName);
    console.log('서버에 보낼 현재페이지', search.currentPage);
    getUsers({ params: search })
      .then((data) => {
        setUsers(data.dataList);
        setStartPage(data.startPage);
        setCurrentPage(data.currentPage);
        setEndPage(data.endPage);
        setTotalPage(data.totalPage);
        setTotalCnt(data.totalCnt);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [search]);

  // 한 페이지당 보일 데이터 선택
  const onChangeInSelect = (event) => {
    setCurrentPage(1);
    setPageSize(Number(event.target.value));
  };

  //  페이징을 제외한 검색 조건 셋팅 todo: formData에 object 형태로 담을 것임
  const changeValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData.codeName);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit(formData);
    setPage(1);
  };

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
      console.log('checkItems1 >>>>>>', checkItems);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
      console.log('checkItems4 >>>>>>', checkItems);
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      users.dataList.forEach((el) => idArray.push(el.userId));
      setCheckItems(idArray);
      console.log('checkItems2 >>>>>>', checkItems);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
      console.log('checkItems3 >>>>>>', checkItems);
    }
  };
  // 주석
  // 일괄 삭제 버튼 클릭 이벤트
  const handleDelUserListClick = (e) => {
    e.preventDefault();
    console.log(checkItems);
    setDeleteModal(true);
  };

  const initCheckItem = () => {
    setCheckItems([]);
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="page-content">
          <div className="container-fluid">
            <Row>
              <Col>
                <Card>
                  <CardBody className="border-bottom">
                    <Row>
                      <Col md={1} style={{ minWidth: '100px', marginBottom: '30px' }}>
                        <h5 className="mt-2 card-title flex-grow-1">사용자 목록</h5>
                      </Col>
                      <Col md={2}>
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
                    <div className="text-sm-end">
                      <form onSubmit={onSubmit}>
                        <Row className="mb-9" style={{ float: 'left' }}>
                          <label htmlFor="example-search-input" className="col-md-4 col-form-label">
                            ■ 사용자 명
                          </label>
                          <div className="col-md-8">
                            <input
                              value={formData.userName || ''}
                              className="form-control"
                              // onChange={handleSearchData}
                              onChange={changeValue}
                              autoFocus
                              name="userName"
                              type=" search"
                              placeholder="사용자 명을 입력해주세요"
                            />
                          </div>
                        </Row>
                        <Button
                          onClick={onSubmit}
                          // onClick={onClickSearch}
                          style={{ width: '100px', float: 'left', marginLeft: '10px' }}
                          className="btn btn-light"
                        >
                          <i className="bx bx bx-search-alt font-size-16 align-middle me-2"></i>
                          조회
                        </Button>
                      </form>
                      <Button
                        onClick={() => {
                          if (search.schUserName !== undefined && search.schUserName !== '')
                            navigate('/user/reg/?userName=' + search.schUserName + '&page=' + page);
                          else navigate('/user/reg/?page=' + page);
                        }}
                        type="button"
                        color="primary"
                        className="btn mb-2 me-2"
                      >
                        <i className="mdi mdi-plus-circle-outline me-1" />
                        등록
                      </Button>
                      <Button
                        type="button"
                        color="danger"
                        className="btn mb-2 me-2"
                        onClick={handleDelUserListClick}
                      >
                        <i className="mdi mdi-plus-circle-outline me-1" />
                        삭제
                      </Button>
                    </div>
                  </CardBody>
                  <CardBody>
                    <div className="table-rep-plugin">
                      <div className="table-responsive mb-0" data-pattern="priority-columns">
                        <Table id="tech-companies-1" className="table table-striped table-bordered">
                          <Thead>
                            <Tr>
                              <Th>
                                <input
                                  type="checkbox"
                                  name="select-all"
                                  onChange={(e) => handleAllCheck(e.target.checked)}
                                  // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                                  checked={checkItems.length === users.length ? true : false}
                                />
                              </Th>
                              <Th>사용자 ID</Th>
                              <Th>사용자 명</Th>
                              <Th>이메일</Th>
                              <Th>전화번호</Th>
                              <Th>작성자</Th>
                              <Th>등록일</Th>
                              <Th style={{ width: '10%' }}>기능</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {users.map((user) => (
                              <Tr
                                key={user.userId}
                                onDoubleClick={() => {
                                  if (search.schUserName !== undefined)
                                    navigate(
                                      '/user/detail/' +
                                        user.userId +
                                        '?userName=' +
                                        search.schUserName +
                                        '&page=' +
                                        page
                                    );
                                  else navigate('/user/detail/' + user.userId + '?page=' + page);
                                }}
                              >
                                <Td>
                                  <input
                                    type="checkbox"
                                    name={`select-${user.userId}`}
                                    onChange={(e) =>
                                      handleSingleCheck(e.target.checked, user.userId)
                                    }
                                    // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                    checked={checkItems.includes(user.userId) ? true : false}
                                  />
                                </Td>
                                {/* <Td>{user.userId}</Td> */}
                                <Td>{user.loginId}</Td>
                                <Td>{user.userName}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.userPhoneNum}</Td>
                                <Td>{user.rollName}</Td>
                                <Td>{user.createDate}</Td>
                                {/* <Td>
                                <UserAction userId={user.userId} />
                              </Td> */}
                                <Td>
                                  {/* <Link
                            to={`/user/detail/${user.userId}`}
                            className="btn btn-sm btn-soft-primary"
                          >
                            <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
                            <UncontrolledTooltip placement="top" target="edittooltip">
                              Detail
                            </UncontrolledTooltip>
                          </Link> */}
                                  <Button
                                    onClick={() => {
                                      if (searchParams.get('userName') !== null)
                                        navigate(
                                          '/user/update/' +
                                            user.userId +
                                            '?userName=' +
                                            search.schUserName +
                                            '&page=' +
                                            page
                                        );
                                      else
                                        navigate('/user/detail/' + user.userId + '?page=' + page);
                                    }}
                                    to={`/user/update/${user.userId}`}
                                    className="btn btn-sm btn-soft-info"
                                    style={{ marginLeft: '10px' }}
                                  >
                                    <i className="mdi mdi-pencil-outline" id="edittooltip" />
                                    <UncontrolledTooltip placement="top" target="edittooltip">
                                      Edit
                                    </UncontrolledTooltip>
                                  </Button>
                                  <Link
                                    onClick={() => {
                                      // setUserId(user.userId)
                                      setCheckItems('');
                                      setCheckItems((prev) => [...prev, user.userId]);
                                      onClickDelete();
                                    }}
                                    className="btn btn-sm btn-soft-danger"
                                    style={{ marginLeft: '10px' }}
                                  >
                                    <i className="mdi mdi-delete-outline" id="deletetooltip" />
                                    <UncontrolledTooltip placement="top" target="deletetooltip">
                                      Delete
                                    </UncontrolledTooltip>
                                  </Link>
                                </Td>
                              </Tr>
                            ))}
                            <DeleteModal
                              show={deleteModal}
                              description={`(유저ID : ${checkItems})\n선택한 정보를 삭제하시겠습니까?`}
                              onDeleteClick={handleDeleteUser}
                              onCloseClick={() => setDeleteModal(false)}
                            />
                          </Tbody>
                        </Table>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
          {/* 페이징 함수 */}
          <Paging
            totalCount={totalCnt}
            page={page}
            postPerPage={postPerPage}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default UserList;
