import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Modal, Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { getMenuList } from 'src/axios-apis/backend';
import Loader from 'src/components/Common/Loader';

const CodeListModal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    // willBeUsedInParentComponent,
    tog_backdrop,
  }));

  //   function willBeUsedInParentComponent() {
  //     console.log("Hi Parent");
  //   }

  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [menus, setMenus] = useState([]);
  const [endPage, setEndPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pagingCount = useRef(5); // 한페이지에서 보일 페이지 수 -> state변화가 필요하지 않다. -> 리렌더링방지

  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add('no_padding');
  }

  // 검색조건에 들어갈 데이터 셋팅
  const [formData, setFormData] = useState({
    codeName: '',
    codeId: '',
    parentCodeId: '',
  });

  // 검색 버튼 클릭 시, 조회 할 데이터 셋팅
  const [submit, setSubmit] = useState({});

  // 페이징, 검색 조건
  let search = useMemo(() => {
    return {
      startPage: currentPage,
      rowsPerPage: 10,
      currentPage: currentPage,
      pagingCount: pagingCount.current,
      schCodeName: submit.codeName,
    };
  }, [submit, currentPage]);

  useEffect(() => {
    if (modal_backdrop) {
      setLoading(true);
      console.log('searchData', search);
      getMenuList({ params: search })
        .then((data) => {
          console.log('data.dataList', data.dataList);
          setMenus(data.dataList);
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
    }
  }, [search, modal_backdrop]);

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
    setCurrentPage(1);
    setSubmit(formData);
    // setSchCodeName(codeName);
  };

  const pagination = () => {
    const result = [];
    for (let i = startPage; i <= endPage; i++) {
      result.push(
        <PaginationItem key={i} active={i === currentPage && true}>
          <PaginationLink
            onClick={() => {
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
    <>
      <Modal
        size="lg"
        isOpen={modal_backdrop}
        toggle={() => {
          tog_backdrop();
        }}
        scrollable={true}
        backdrop={'static'}
        id="staticBackdrop"
      >
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">
            메뉴 목록
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setmodal_backdrop(false);
            }}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          {loading ? (
            <Loader />
          ) : (
            <>
              <Row>
                <Col lg={4}>
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
                <Col lg={1} style={{ minWidth: '110px' }}>
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
              <Row className="mt-2">
                <div className="table-rep-plugin">
                  <div className="table-responsive mb-0" data-pattern="priority-columns">
                    <Table id="tech-companies-1" className="table table-bordered table-hover">
                      <Thead className="table-light">
                        <Tr>
                          <Th>메뉴 ID</Th>
                          <Th>메뉴 명</Th>
                          <Th>상위메뉴</Th>
                          <Th>메뉴 URL</Th>
                        </Tr>
                      </Thead>
                      <Tbody style={{ cursor: 'pointer' }}>
                        {menus.map((menu) => (
                          <Tr
                            key={menu.menuId}
                            onClick={() => {
                              // console.log(parentCodeId);
                              props.callback(menu.menuName);
                              setmodal_backdrop(false);
                            }}
                          >
                            <Td>{menu.menuId}</Td>
                            <Td>{menu.menuName}</Td>
                            <Td>{menu.parentMenuNm}</Td>
                            <Td>{menu.menuUrl}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </div>
                </div>
              </Row>
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
                          setCurrentPage(endPage - pagingCount.current);
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
            </>
          )}
        </div>
        {/* <div className="modal-footer">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              setmodal_backdrop(false);
            }}
          >
            닫기
          </button>
          <button type="button" className="btn btn-primary">
            선택
          </button>
        </div> */}
      </Modal>
    </>
  );
});

CodeListModal.propTypes = {
  callback: PropTypes.func,
};

export default CodeListModal;
