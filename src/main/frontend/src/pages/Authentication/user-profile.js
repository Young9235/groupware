import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from 'reactstrap';

import { Link, useNavigate } from 'react-router-dom';

// Formik Validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

//redux
import { useSelector, useDispatch } from 'react-redux';
import withRouter from 'src/components/Common/withRouter';

//Import Breadcrumb
import DeleteModal from 'src/components/Common/DeleteModal';
import Breadcrumb from 'src/components/Common/Breadcrumb';

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
  changePage as onChangePage,
} from 'src/store/contacts/actions';

import avatar from 'src/assets/images/users/avatar-1.jpg';
// actions
import { editProfile, resetProfileFlag } from 'src/store/actions';

const UserProfile = () => {
  //meta title
  document.title = 'Profile | Skote - React Admin & Dashboard Template';

  const dispatch = useDispatch();
  const history = useNavigate();

  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [idx, setidx] = useState('');

  const { error, success } = useSelector((state) => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));

  // //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  var node = useRef();
  const onPaginationPageChange = (page) => {
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

  const onClickDelete = (users) => {
    console.log('idx', idx);
    setidx(idx);
    setDeleteModal(true);
    console.log('여기 들어와서 처리');
  };

  const handleDeleteUser = () => {
    dispatch(onDeleteUser(idx, history));
    // dispatch(onChangePage(history));
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem('authUser')) {
      const obj = JSON.parse(sessionStorage.getItem('authUser'));
      // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      //   setname(obj.displayName);
      //   setemail(obj.email);
      //   setidx(obj.uid);
      // } else if (
      //   process.env.REACT_APP_DEFAULTAUTH === "fake" ||
      //   process.env.REACT_APP_DEFAULTAUTH === "jwt"
      // ) {
      setname(obj.username);
      setemail(obj.email);
      setidx(obj.idx);
      setpassword(obj.password);
      // }
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: name || '',
      password: password || '',
      idx: idx || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Please Enter Your UserName'),
      password: Yup.string().required('Please Enter Your Password'),
      // nickname: Yup.string().required("Please Enter Your NickName"),
    }),
    onSubmit: (values) => {
      console.log('values', values);
      dispatch(editProfile(values));
    },
  });

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Skote" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img src={avatar} alt="" className="avatar-md rounded-circle img-thumbnail" />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User info</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="form-group">
                  <Label className="form-label">UserName</Label>
                  <Input
                    name="username"
                    // value={name}
                    className="form-control"
                    placeholder="Enter UserName"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ''}
                    invalid={
                      validation.touched.username && validation.errors.username ? true : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div>
                <div className="form-group">
                  <Label className="form-label">password</Label>
                  <Input
                    name="password"
                    // value={password}
                    className="form-control"
                    placeholder="Enter password"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.password || ''}
                    invalid={
                      validation.touched.password && validation.errors.password ? true : false
                    }
                  />
                  {validation.touched.password && validation.errors.password ? (
                    <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div>
                {/* <div className="form-group">
                  <Label className="form-label">nickName</Label>
                  <Input
                    name="nickName"
                    // value={name}
                    className="form-control"
                    placeholder="Enter nickName"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.nickName || ""}
                    invalid={
                      validation.touched.nickName && validation.errors.nickName ? true : false
                    }
                  />
                  {validation.touched.nickName && validation.errors.nickName ? (
                    <FormFeedback type="invalid">{validation.errors.nickName}</FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div> */}
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User info
                  </Button>
                  <Button onClick={onClickDelete} color="primary">
                    DELETE
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
