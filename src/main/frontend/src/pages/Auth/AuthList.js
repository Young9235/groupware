import React, { useCallback, useEffect, useState } from 'react';

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
import Loader from 'src/components/Common/Loader';
import { useNavigate } from 'react-router-dom';
// import { errorMsg, successMsg } from "components/Common/Toaster";
import DeleteModal from 'src/components/Common/DeleteModal';
import ActionButton from 'src/components/Common/ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { savePagesItem } from 'src/store/actions';
import { deleteAuthList, getAuthList } from 'src/axios-apis/backend';

// =============================== [권한 정보 조회] ===============================

const AuthList = () => {
  const [auths, setAuths] = useState([]);
  const [endPage, setEndPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [handleDelClick, setHandleDelClick] = useState(''); // 리스트 삭제버튼 이벤트 -> 삭제 한개의 값
  const [deleteModal, setDeleteModal] = useState(false);

  // 검색 버튼 클릭 시, 조회 할 데이터 셋팅
  const navigate = useNavigate();

  ///// redux 페이지 이동 검색조건 유지 : currentPage, rowsPerPage, pagingCount, input search값
  const dispatch = useDispatch();
  const { pages } = useSelector((state) => ({
    pages: state.pagesReducer.pages,
  }));

  // console.log(pages);

  // 검색조건에 들어갈 데이터 셋팅
  const [formData, setFormData] = useState({
    authName: pages.schInputBox,
    authId: '',
  });

  // 체크된 아이템을 담을 배열 -> 삭제할 id List
  const [checkItems, setCheckItems] = useState([]);

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
      auths.forEach((el) => idArray.push(el.authId));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      initCheckItem();
    }
  };

  //// 조회 처리
  const getAuths = useCallback(() => {
    setLoading(true);
    console.log('searchData : ', pages);
    getAuthList({ params: pages })
      .then((data) => {
        setAuths(data.dataList);
        setStartPage(data.startPage);
        setEndPage(data.endPage);
        setTotalPage(data.totalPage);
        setLoading(false);

        console.log('listData', data);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [pages]);

  useEffect(() => {
    getAuths();
  }, [getAuths]);

  // 한 페이지당 보일 데이터 선택
  const onChangeInSelect = (event) => {
    // console.log(event.target.value);
    dispatch(
      savePagesItem({
        ...pages,
        currentPage: 1,
        rowsPerPage: Number(event.target.value),
      })
    );
  };

  //  페이징을 제외한 검색 조건 셋팅 todo: formData에 object 형태로 담을 것임
  const changeValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData.authName);
  };

  // 조회 버튼 클릭
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      savePagesItem({
        ...pages,
        currentPage: 1,
        schInputBox: formData.authName,
      })
    );
  };

  //// 삭제 처리
  const deleteAuths = useCallback(
    (datas) => {
      setLoading(true);
      console.log('auths', datas);
      // arrayList를 ","로 해서 파라미터 넘기기 서버에 리스트 형태로 들어간다
      deleteAuthList({ params: { authIdList: datas.join(',') } })
        .then((response) => {
          if (response > 0) {
            console.log('response ==> ' + response);
            getAuths();
            alert('삭제가 정상적으로 처리 되었습니다.');
          } else {
            alert('삭제 실패');
          }
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    },
    [getAuths]
  );

  // 일괄 삭제 버튼 클릭 이벤트
  const handleDelCheckListClick = (e) => {
    e.preventDefault();
    console.log(checkItems);
    if (checkItems.length <= 0) {
      alert('삭제할 건이 선택되지 않았습니다.');
      return false;
    }
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
    deleteAuths(checkItems);
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

  const pagination = () => {
    const result = [];
    for (let i = startPage; i <= endPage; i++) {
      result.push(
        <PaginationItem key={i} active={i === pages.currentPage && true}>
          <PaginationLink
            onClick={() => {
              initCheckItem();
              dispatch(savePagesItem({ ...pages, currentPage: i }));
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
            <Breadcrumbs title="CMS 관리" breadcrumbItem="권한 관리" />
            <Card>
              <CardBody className="border-bottom">
                <Row>
                  <Col md={4}>
                    <Row>
                      <Col md={3} style={{ minWidth: '140px' }}>
                        <h5 className="mt-2 card-title flex-grow-1">권한 목록</h5>
                      </Col>
                      <Col md={6}>
                        <select
                          className="form-select"
                          value={pages.rowsPerPage}
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
                      onClick={handleDelCheckListClick}
                    >
                      <i className="mdi mdi-plus-circle-outline me-1" />
                      삭제
                    </Button>
                    <Button
                      type="button"
                      color="primary"
                      className="btn me-2"
                      onClick={(e) => {
                        navigate('/admin/auth/reg', { replace: true });
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
                        placeholder={`권한 명을 입력해주세요.`}
                        value={formData.authName || ''}
                        name="authName"
                        onChange={changeValue}
                        autoFocus
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
                {/* <CardTitle>권한 목록 </CardTitle> */}
                {/* <CardSubtitle className="mb-3">
                                  This is an experimental awesome solution for responsive
                                  tables with complex data.
                                </CardSubtitle>  */}
                <Row className="mt-2">
                  <div className="table-rep-plugin">
                    <div className="table-responsive mb-0" data-pattern="priority-columns">
                      <Table
                        id="tech-companies-1"
                        className="table table-striped table-bordered table-hover"
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
                                checked={checkItems.length === auths.length ? true : false}
                              />
                            </Th>
                            <Th>권한 ID</Th>
                            <Th>권한 명</Th>
                            <Th>권한 설명</Th>
                            <Th>생성자</Th>
                            <Th>생성일자</Th>
                            <Th style={{ width: '10%' }}>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {auths.map((auth) => (
                            <Tr
                              key={auth.authId}
                              onDoubleClick={() => {
                                navigate(`/admin/auth/detail/${auth.authId}`);
                              }}
                            >
                              <Th>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name={`select-${auth.authId}`}
                                  onChange={(e) => handleSingleCheck(e.target.checked, auth.authId)}
                                  // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                  checked={checkItems.includes(auth.authId) ? true : false}
                                />
                              </Th>
                              <Td>{auth.authId}</Td>
                              <Td>{auth.authName}</Td>
                              <Td>{auth.authDesc}</Td>
                              <Td>{auth.createUserNm}</Td>
                              <Td>{auth.createDate}</Td>
                              <Td>
                                <ActionButton
                                  id={auth.authId}
                                  detailPage={`/admin/auth/detail/${auth.authId}`}
                                  updatePage={`/admin/auth/update/${auth.authId}`}
                                  setHandleDelClick={setHandleDelClick}
                                />
                              </Td>
                            </Tr>
                          ))}
                          <DeleteModal
                            show={deleteModal}
                            description={`${checkItems.length}건의 정보를 \n삭제하시겠습니까?`}
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

          {/* 페이징 처리 */}
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
                      dispatch(
                        savePagesItem({
                          ...pages,
                          currentPage:
                            endPage % pages.pagingCount === 0
                              ? endPage - pages.pagingCount
                              : pages.pagingCount * parseInt(endPage / pages.pagingCount),
                        })
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
                      dispatch(
                        savePagesItem({
                          ...pages,
                          currentPage: startPage + pages.pagingCount,
                        })
                      );
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

export default AuthList;
