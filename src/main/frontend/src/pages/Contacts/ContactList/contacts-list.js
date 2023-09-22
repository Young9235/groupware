import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import withRouter from 'src/components/Common/withRouter';
import TableContainer from 'src/components/Common/TableContainer';
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

//Import Breadcrumb
import Breadcrumbs from 'src/components/Common/Breadcrumb';
import DeleteModal from 'src/components/Common/DeleteModal';

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from 'src/store/contacts/actions';
import { isEmpty } from 'lodash';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { Email, Name } from 'src/pages/Contacts/ContactList/contactlistCol';

const ContactsList = (props) => {
  //meta title
  document.title = 'User List | Skote - React Admin & Dashboard Template';

  const dispatch = useDispatch();
  const [contact, setContact] = useState();
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || '',
      password: (contact && contact.password) || '',
      // tags: (contact && contact.tags) || "",
      email: (contact && contact.email) || '',
      // projects: (contact && contact.projects) || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required('이름을 입력해주세요.'),
      password: Yup.string().required('비밀번호를 입력해주세요.'),
      // tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, '이메일 양식으로 등록바랍니다.')
        .required('이메일을 입력해주세요.'),
      // projects: Yup.string().required("Please Enter Your Project"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          username: values.username,
          password: values.password,
          // tags: values.tags,
          email: values.email,
          // projects: values.projects,
        };
        // update user
        dispatch(onUpdateUser(updateUser));
        setIsEdit(false);
        validation.resetForm();
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          username: values['username'],
          password: values['password'],
          email: values['email'],
          // tags: values["tags"],
          // projects: values["projects"],
        };
        // save new user
        let result = onAddNewUser(newUser);
        console.log(result);
        dispatch(onAddNewUser(newUser));
        validation.resetForm();
      }
      toggle();
    },
  });

  const { users } = useSelector((state) => ({
    users: state.contacts.users,
  }));

  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: () => {
          return <input type="checkbox" className="form-check-input" />;
        },
      },
      // {
      //   Header: "Img",
      //   // accessor: "name",
      //   disableFilters: true,
      //   filterable: true,
      //   accessor: (cellProps) => (
      //     <>
      //       {!cellProps.img ? (
      //         <div className="avatar-xs">
      //           <span className="avatar-title rounded-circle">
      //             {cellProps.username}
      //           </span>
      //         </div>
      //       ) : (
      //         <div>
      //           <img
      //             className="rounded-circle avatar-xs"
      //             src={cellProps}
      //             alt=""
      //           />
      //         </div>
      //       )}
      //     </>
      //   ),
      // },
      {
        Header: '이름',
        accessor: 'nickname',
        filterable: true,
        Cell: (cellProps) => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: '이메일',
        accessor: 'username',
        filterable: true,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
        },
      },
      // {
      //   Header: "권한",
      //   accessor: "tags",
      //   filterable: true,
      //   Cell: cellProps => {
      //     return <Tags {...cellProps} />;
      //   },
      // },
      // {
      //   Header: "Projects",
      //   accessor: "projects",
      //   filterable: true,
      //   Cell: cellProps => {
      //     return (
      //       <>
      //         {" "}
      //         <Projects {...cellProps} />{" "}
      //       </>
      //     );
      //   },
      // },
      {
        Header: 'Action',
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleUserClick(userData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original;
                  onClickDelete(userData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
      setIsEdit(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setContact(users);
    setIsEdit(false);
  }, [users]);

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users);
      setIsEdit(false);
    }
  }, [users]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = (arg) => {
    const user = arg;

    setContact({
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      // tags: user.tags,
      // projects: user.projects,
    });
    setIsEdit(true);

    toggle();
  };

  var node = useRef();
  const onPaginationPageChange = (page) => {
    console.log('fdsfsfsf');
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (users) => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    dispatch(onDeleteUser(contact.userId));
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setUserList('');
    setIsEdit(false);
    toggle();
  };

  const keyField = 'id';

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="User List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={users}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? 'Edit User' : '계정을 생성해주세요.'}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">이메일</Label>
                              <Input
                                name="email"
                                type="text"
                                placeholder="이메일을 입력해주세요."
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ''}
                                invalid={
                                  validation.touched.email && validation.errors.email ? true : false
                                }
                              />
                              {validation.touched.email && validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">이름</Label>
                              <Input
                                name="username"
                                label="username"
                                placeholder="이름을 입력해주세요."
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.username || ''}
                                invalid={
                                  validation.touched.username && validation.errors.username
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.username && validation.errors.username ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.username}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">비밀번호</Label>
                              <Input
                                name="password"
                                label="password"
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.password || ''}
                                invalid={
                                  validation.touched.password && validation.errors.password
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.password && validation.errors.password ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.password}
                                </FormFeedback>
                              ) : null}
                            </div>
                            {/* <div className="mb-3">
                              <Label className="form-label">Option</Label>
                              <Input
                                type="select"
                                name="tags"
                                className="form-select"
                                multiple={true}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.tags || []}
                                invalid={
                                  validation.touched.tags &&
                                    validation.errors.tags
                                    ? true
                                    : false
                                }
                              >
                                <option>Photoshop</option>
                                <option>illustrator</option>
                                <option>Html</option>
                                <option>Php</option>
                                <option>Java</option>
                                <option>Python</option>
                                <option>UI/UX Designer</option>
                                <option>Ruby</option>
                                <option>Css</option>
                              </Input>
                              {validation.touched.tags &&
                                validation.errors.tags ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.tags}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Projects</Label>
                              <Input
                                name="projects"
                                label="Projects"
                                type="text"
                                placeholder="Insert Projects"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.projects || ""}
                                invalid={
                                  validation.touched.projects &&
                                    validation.errors.projects
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.projects &&
                                validation.errors.projects ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.projects}
                                </FormFeedback>
                              ) : null}
                            </div> */}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button type="submit" className="btn btn-success save-user">
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ContactsList);
