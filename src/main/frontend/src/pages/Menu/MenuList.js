import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Row, Col, Card, CardBody, Button } from 'reactstrap';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { getMenuList, deleteMenu } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';
import DeleteModal from 'src/components/Common/DeleteModal';
import Paging from './items/Paging';
import ActionButton from 'src/pages/Menu/items/ActionButton';
// import { errorMsg, successMsg } from "components/Common/Toaster";

// 메뉴 정보 출력

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [handleDelClick, setHandleDelClick] = useState(''); // 리스트 삭제버튼 이벤트
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [endPage, setEndPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  //삭제 Key값
  const [key, setKey] = useState(1);
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);
  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);
  const pagingCount = useRef(5); // 한페이지에서 보일 페이지 수 -> state변화가 필요하지 않다. -> 리렌더링방지

  // 검색 버튼 클릭 시, 조회 할 데이터 셋팅
  const [searchParams, setSearchParams] = useSearchParams();
  // const location = useLocation();
  const navigate = useNavigate();

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
    menuName: '',
    menuType: '',
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

  // 검색조건 저장
  let search = useMemo(() => {
    setPostPerPage(pageSize);
    return {
      schMenuName: submit.menuName,
      schMenuType: submit.menuType,
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

    // 메뉴명,타입 둘 다 조회시
    if (searchParams.get('menuName') !== null && searchParams.get('menuType') !== null) {
      if (searchParams.get('menuName') !== search.schMenuName && search.schMenuName !== undefined) {
        search.schMenuName = submit.menuName;
        formData.menuName = submit.menuName;
        search.schMenuType = searchParams.get('menuType');
      } else if (search.schMenuName === undefined) {
        search.schMenuName = searchParams.get('menuName');
        search.schMenuType = searchParams.get('menuType');
        formData.menuName = searchParams.get('menuName');
      }
    }
    // 메뉴명만 검색시
    else if (searchParams.get('menuName') !== null && searchParams.get('menuType') === null) {
      if (searchParams.get('menuName') !== search.schMenuName && search.schMenuName !== undefined) {
        search.schMenuName = submit.menuName;
        formData.menuName = submit.menuName;
      } else if (search.schMenuName === undefined) {
        search.schMenuName = searchParams.get('menuName');
        formData.menuName = searchParams.get('menuName');
      }
    }
    // 메뉴 타입만 검색시
    else if (searchParams.get('menuType') !== null && searchParams.get('menuName') === null) {
      if (searchParams.get('menuType') !== search.schMenuType && search.schMenuType !== undefined) {
        search.schMenuType = submit.menuType;
      } else if (search.menuType === undefined) {
        search.schMenuType = searchParams.get('menuType');
      }
    }

    // 쿼리스트링 세팅
    if (
      search.schMenuName !== undefined &&
      search.schMenuType !== undefined &&
      search.schMenuName !== '' &&
      search.schMenuType !== ''
    ) {
      setSearchParams({
        menuName: search.schMenuName,
        menuType: search.schMenuType,
        page: search.currentPage,
      });
    } else if (search.schMenuName !== undefined && search.schMenuName !== '') {
      setSearchParams({ menuName: search.schMenuName, page: search.currentPage });
    } else if (search.schMenuType !== undefined && search.schMenuType !== '') {
      setSearchParams({ menuType: search.schMenuType, page: search.currentPage });
    } else {
      setSearchParams({ page: search.currentPage });
    }
    console.log('서버에 보낼 메뉴 명', search.schMenuName);
    console.log('서버에 보낼 메뉴 타입', search.schMenuType);
    console.log('서버에 보낼 현재페이지', search.currentPage);
    getMenuList({ params: search })
      .then((data) => {
        setMenus(data.dataList);
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
  }, [search, key]);

  // 한 페이지당 보일 데이터 선택
  const onChangeInSelect = (event) => {
    setCurrentPage(1);
    setPageSize(Number(event.target.value));
  };

  const changeValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit(formData);
    setPage(1);
  };

  const deleteMenus = (menus) => {
    if (menus.length === 0) alert('삭제할 정보를 선택바랍니다.');
    console.log('menus', menus);
    // arrayList를 ","로 해서 파라미터 넘기기 서버에 리스트 형태로 들어간다
    deleteMenu({ params: { menuIdList: menus.join(',') } })
      .then((response) => {
        if (response > 0) {
          console.log('response ==> ' + response);
          setKey(key + 1);
          alert('삭제가 정상적으로 처리 되었습니다.');
        } else {
          setLoading(false);
          alert('삭제를 실패하였습니다.');
        }
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
      });
  };
  // [getMenus]

  // 일괄 삭제 버튼 클릭 이벤트
  const handleDelMenuListClick = (e) => {
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
    deleteMenus(checkItems);
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
      menus.forEach((el) => idArray.push(el.menuId));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
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
                        <h5 className="mt-2 card-title flex-grow-1">메뉴 목록</h5>
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
                        <Row className="mb-11" style={{ float: 'left' }}>
                          <label
                            htmlFor="example-search-input"
                            className="col-md-2 col-form-label"
                            style={{ width: '100px' }}
                          >
                            <span style={{ marginRight: '8px' }}>■</span>
                            메뉴 명
                          </label>
                          <div className="col-md-4">
                            <input
                              className="form-control"
                              style={{ width: '180px' }}
                              value={formData.menuName || ''}
                              onChange={changeValue}
                              autoFocus
                              name="menuName"
                              type=" search"
                              placeholder="메뉴 명을 입력해주세요"
                            />
                          </div>
                          <label
                            style={{ marginLeft: '10px', width: '108px' }}
                            htmlFor="example-search-input"
                            className="col-md-2 col-form-label"
                          >
                            <span style={{ marginRight: '8px' }}>■</span>
                            메뉴 타입
                          </label>
                          <div className="col-md-3">
                            <select
                              name="menuType"
                              id="menuType"
                              onChange={handleSelect}
                              defaultValue={search.schMenuType}
                              className="form-select"
                              style={{ width: '150px' }}
                            >
                              <option value="">전체</option>
                              <option value="MENU">메뉴</option>
                              <option value="FUNC">기능</option>
                            </select>
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
                          if (
                            search.schMenuName !== undefined &&
                            search.schMenuType !== undefined &&
                            search.schMenuName !== '' &&
                            search.schMenuType !== ''
                          )
                            navigate(
                              '/menu/reg/?menuName=' +
                                search.schMenuName +
                                '&menuType=' +
                                search.schMenuType +
                                '&page=' +
                                page
                            );
                          else if (search.schMenuName !== '' && search.schMenuType === '')
                            navigate('/menu/reg/?menuName=' + search.schMenuName + '&page=' + page);
                          else if (search.schMenuType !== '' && search.schMenuName === '')
                            navigate('/menu/reg?menuType=' + search.schMenuType + '&page=' + page);
                          else navigate('/menu/reg/?page=' + page);
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
                        onClick={handleDelMenuListClick}
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
                                  checked={checkItems.length === menus.length ? true : false}
                                />
                              </Th>
                              <Th>메뉴 ID</Th>
                              <Th>메뉴 명</Th>
                              <Th>메뉴 URL</Th>
                              <Th>메뉴 설명</Th>
                              <Th style={{ width: '10%' }}>기능</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {menus.map((menu) => (
                              <Tr
                                key={menu.menuId}
                                onDoubleClick={() => {
                                  if (
                                    search.schMenuName !== undefined &&
                                    search.schMenuType !== undefined &&
                                    search.schMenuName !== '' &&
                                    search.schMenuType !== ''
                                  )
                                    navigate(
                                      '/menu/detail/' +
                                        menu.menuId +
                                        '?menuName=' +
                                        search.schMenuName +
                                        '&menuType=' +
                                        search.schMenuType +
                                        '&page=' +
                                        page
                                    );
                                  else if (search.schMenuName !== '' && search.schMenuType === '')
                                    navigate(
                                      '/menu/detail/' +
                                        menu.menuId +
                                        '?menuName=' +
                                        search.schMenuName +
                                        '&page=' +
                                        page
                                    );
                                  else if (search.schMenuType !== '' && search.schMenuName === '')
                                    navigate(
                                      '/menu/detail/' +
                                        menu.menuId +
                                        '?menuType=' +
                                        search.schMenuType +
                                        '&page=' +
                                        page
                                    );
                                  else navigate('/menu/detail/' + menu.menuId + '?page=' + page);
                                }}
                              >
                                <Td>
                                  <input
                                    type="checkbox"
                                    name={`select-${menu.menuId}`}
                                    onChange={(e) =>
                                      handleSingleCheck(e.target.checked, menu.menuId)
                                    }
                                    // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                    checked={checkItems.includes(menu.menuId) ? true : false}
                                  />
                                </Td>
                                <Td>{menu.menuId}</Td>
                                <Td>{menu.menuName}</Td>
                                <Td>{menu.menuUrl}</Td>
                                <Td>{menu.menuDesc}</Td>
                                <Td>
                                  <ActionButton
                                    id={menu.menuId}
                                    detailPage={`/menu/detail/${menu.menuId}`}
                                    updatePage={`/menu/update/${menu.menuId}`}
                                    state={{ state: search }}
                                    search={search.schMenuName}
                                    setHandleDelClick={setHandleDelClick}
                                  />
                                </Td>
                              </Tr>
                            ))}
                            <DeleteModal
                              show={deleteModal}
                              description={`(메뉴 ID : ${checkItems})\n선택한 정보를 삭제하시겠습니까?`}
                              onDeleteClick={onClickDelete}
                              onCloseClick={onCloseClick}
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

export default MenuList;
