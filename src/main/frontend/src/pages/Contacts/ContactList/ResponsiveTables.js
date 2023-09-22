import React from "react";
import { Link } from "react-router-dom";


import { Row, Col, Card, CardBody, CardTitle, Button,UncontrolledTooltip,Pagination,
  PaginationItem,
  PaginationLink, } from "reactstrap";


import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";

const ResponsiveTables = () => {
  //meta title
  document.title = "Responsive Table | Skote - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {/* <Breadcrumbs title="Tables" breadcrumbItem="Responsive Table" /> */}

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>사용자 목록 </CardTitle>

                  {/* <div className="search-box mb-2 me-2">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control bg-light border-light rounded"
                    placeholder="Search..."
                  />
                  <i className="bx bx-search-alt search-icon"></i>
                </div>
              </div> */}

              <div className="text-sm-end" >
              <Row className="mb-9" style={{float:'left'}}>
                    <label
                      htmlFor="example-search-input"
                      className="col-md-4 col-form-label"
                    >
                      ■ 사용자 명
                    </label>
                    <div className="col-md-8">
                      <input
                        className="form-control"
                        type=" search"
                        placeholder="사용자 명을 입력해주세요"
                      />
                    </div>
                  </Row>
                    <Button style={{width:'100px', float:'left', marginLeft:'10px'}} className="btn-rounded btn btn-info">조회</Button>
              {/* <label
                      htmlFor="example-search-input"
                      className="col-md-2 col-form-label"
                    >
                      Search
                    </label>
              <input type="text" className="form-control" style={{float:'left' ,width:'200px'}}></input> */}

                  <Button
                    type="button"
                    color="primary"
                    className="btn mb-2 me-2"
                    // onClick={handleUserClick}
                  >
                    <i className="mdi mdi-plus-circle-outline me-1" />
                    등록
                  </Button>
                  <Button
                    type="button"
                    color="danger"
                    className="btn mb-2 me-2"
                    // onClick={handleUserClick}
                  >
                    <i className="mdi mdi-plus-circle-outline me-1" />
                   삭제
                  </Button>
                </div>

                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive mb-0"
                      data-pattern="priority-columns"
                    >
                      <Table
                        id="tech-companies-1"
                        className="table table-striped table-bordered"
                      >
                        <Thead>
                          <Tr>
                            <Th data-priority="1"><input type="checkbox" className="form-check-input" /></Th>
                            <Th data-priority="1">사용자 ID</Th>
                            <Th data-priority="3">사용자 명</Th>
                            <Th data-priority="1">이메일</Th>
                            <Th data-priority="3">전화번호</Th>
                            <Th data-priority="3">작성자</Th>
                            <Th data-priority="6">등록일</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td><input type="checkbox" className="form-check-input" /></Td>
                            <Td>Admin</Td>
                            <Td>마스터</Td>
                            <Td>-</Td>
                            <Td>010-1234-5678</Td>
                            <Td>운영자</Td>
                            <Td>2029-07-21</Td>
                            <Td><Link
                            to="#"
                            className="text-success"
                            // onClick={() => {
                            //   const userData = cellProps.row.original;
                            //   handleUserClick(userData);
                            // }}
                          >
                            <i className="mdi mdi-pencil font-size-20" id="edittooltip" />
                            <UncontrolledTooltip placement="top" target="edittooltip">
                              Edit
                            </UncontrolledTooltip>
                          </Link>
                          <Link
                            to="#"
                            className="text-danger"
                            // onClick={() => {
                            //   const userData = cellProps.row.original;
                            //   onClickDelete(userData);
                            // }}
                          >
                            <i className="mdi mdi-delete font-size-20" id="deletetooltip" />
                            <UncontrolledTooltip placement="top" target="deletetooltip">
                              Delete
                            </UncontrolledTooltip>
                          </Link>
                          </Td>
                          </Tr>
                
                        </Tbody>
                      </Table>
                      
                      
                      <Pagination aria-label="Page navigation example" style={{marginLeft: '600px', marginTop:'100px'}}>
                        <PaginationItem>
                          <PaginationLink href="#" previous>
                            <i className="mdi mdi-chevron-left" />
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink next>
                            <i className="mdi mdi-chevron-right" />
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>

                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResponsiveTables;
