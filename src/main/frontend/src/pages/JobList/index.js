import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableContainer from 'src/components/Common/TableContainer';

//import components
import Breadcrumbs from 'src/components/Common/Breadcrumb';
import DeleteModal from 'src/components/Common/DeleteModal';

import { getJobList as onGetJobList, deleteJobList as onDeleteJobList } from 'src/store/actions';

//redux
import { useSelector, useDispatch } from 'react-redux';

import {
  Col,
  Row,
  UncontrolledTooltip,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledAlert,
} from 'reactstrap';
import JobModal from './JobModal';
import { DataText, DisplayNone, JobNo, Status, Type } from 'src/pages/JobList/JobListCol';

// ============================== [sample page] ==============================

function JobList() {
  //meta title
  document.title = 'Jobs List | Skote - React Admin & Dashboard Template';

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // const [jobsList, setJobsList] = useState([]);
  const [job, setJob] = useState(null);
  const dispatch = useDispatch();

  // 조회
  const { jobs, error } = useSelector((state) => ({
    jobs: state.JobReducer.jobs,
    error: state.JobReducer.error,
  }));

  useEffect(() => {
    //console.log(jobs);
    if (jobs && !jobs.length) {
      dispatch(onGetJobList());
    }
  }, [dispatch, jobs]);

  // useEffect(() => {
  //   setJobsList(jobs);
  // }, [jobs]);

  useEffect(() => {
    console.log(jobs);
    if (!isEmpty(jobs)) {
      // setJobsList(jobs);
      // setIsEdit(false);
    }
  }, [jobs]);

  // 모달 창 이벤트(등록, 수정 모달 창)
  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setJob(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  // 수정 창 셋팅
  const editModalClick = useCallback(
    (arg) => {
      const job = arg;
      setJob({
        id: job.bookId,
        bookId: job.bookId,
        title: job.title,
        companyName: job.companyName,
        location: job.location,
        experience: job.experience,
        position: job.position,
        type: job.type,
        status: job.status,
      });
      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  //delete Job
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (job) => {
    setJob(job);
    setDeleteModal(true);
  };

  const handleDeletejob = () => {
    if (job && job.rownum) {
      dispatch(onDeleteJobList(job.id));
      setDeleteModal(false);
    }
  };

  //
  const modalClick = () => {
    // setJobsList("");
    setIsEdit(false);
    toggle();
  };

  const columns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'rownum',
        filterable: true,
        Cell: (cellProps) => {
          return <JobNo {...cellProps} />;
        },
      },
      {
        Header: 'Id',
        accessor: 'bookId',
        hidden: true,
        Cell: (cellProps) => {
          return <DisplayNone {...cellProps} />;
        },
      },
      {
        Header: '책 제목',
        accessor: 'title',
        filterable: true,
        Cell: (cellProps) => {
          return <DataText {...cellProps} />;
        },
      },
      {
        Header: '작가명',
        accessor: 'author',
        filterable: true,
        Cell: (cellProps) => {
          return <DataText {...cellProps} />;
        },
      },
      {
        Header: '가격',
        accessor: 'price',
        filterable: true,
        Cell: (cellProps) => {
          return <DataText {...cellProps} />;
        },
      },
      {
        Header: '책 분류',
        accessor: 'category',
        filterable: true,
        Cell: (cellProps) => {
          return <Type {...cellProps} />;
        },
      },
      {
        Header: '재고 상태',
        accessor: 'inStockYn',
        filterable: true,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: '재고 수',
        accessor: 'inStockCnt',
        filterable: true,
        Cell: (cellProps) => {
          return <JobNo {...cellProps} />;
        },
      },
      {
        Header: 'Action',
        accessor: 'action',
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <ul className="list-unstyled hstack gap-1 mb-0">
              {/* 상세 페이지 이동 */}
              <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                <Link to="/job-details" className="btn btn-sm btn-soft-primary">
                  <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
                </Link>
              </li>
              <UncontrolledTooltip placement="top" target="viewtooltip">
                View
              </UncontrolledTooltip>

              {/* 수정 페이지 이동 */}
              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-info"
                  onClick={() => {
                    const jobData = cellProps.row.original;
                    editModalClick(jobData);
                  }}
                >
                  <i className="mdi mdi-pencil-outline" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </Link>
              </li>

              {/* 삭제 */}
              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-danger"
                  onClick={() => {
                    const jobData = cellProps.row.original;
                    onClickDelete(jobData);
                  }}
                >
                  <i className="mdi mdi-delete-outline" id="deletetooltip" />
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    [editModalClick] // 수정이 되면 데이터가 변해야 하기 때문에
  );

  // 컬럼 숨기기 -> 화면 상태변경
  const [hiddenColumns, setHiddenColumns] = useState(
    columns.filter((column) => column.hidden).map((column) => column.accessor)
  );

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeletejob}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Jobs" breadcrumbItem="Jobs Lists" />
          {error.length > 0 ? (
            <UncontrolledAlert color="danger">{JSON.stringify(error)}</UncontrolledAlert>
          ) : null}
          <Row>
            <Col lg="12">
              <Card>
                {/* 타이틀, 버튼 헤더 부분 */}
                <CardBody className="border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">Jobs Lists</h5>
                    <div className="flex-shrink-0">
                      {/* 등록 모달 버튼 */}
                      <Link
                        to="#!"
                        onClick={() => {
                          setModal(true);
                          setIsEdit(false);
                        }}
                        className="btn btn-primary me-1"
                      >
                        Add New Job
                      </Link>

                      {/* 초기화 버튼 */}
                      <Link to="#!" className="btn btn-light me-1">
                        <i className="mdi mdi-refresh"></i>
                      </Link>

                      {/* 목록 메뉴 버튼 */}
                      <UncontrolledDropdown className="dropdown d-inline-block me-1">
                        <DropdownToggle
                          type="menu"
                          className="btn btn-success"
                          id="dropdownMenuButton1"
                        >
                          <i className="mdi mdi-dots-vertical"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                          <li>
                            <DropdownItem href="#">Action</DropdownItem>
                          </li>
                          <li>
                            <DropdownItem href="#">Another action</DropdownItem>
                          </li>
                          <li>
                            <DropdownItem href="#">Something else here</DropdownItem>
                          </li>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </CardBody>

                {/* 목록 부분 */}
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={jobs}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    handleJobClicks={modalClick}
                    isJobListGlobalFilter={true}
                    customPageSize={10}
                    hiddenColumns={hiddenColumns}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* 등록 모달 창 */}
          <JobModal isOpen={modal} toggle={toggle} job={job} isEdit={isEdit} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default JobList;
