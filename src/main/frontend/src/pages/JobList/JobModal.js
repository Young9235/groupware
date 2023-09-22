import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {
  addNewJobList as onAddNewJobList,
  updateJobList as onUpdateJobList,
} from 'src/store/actions';

const JobModal = (props) => {
  const { isOpen, toggle, job, isEdit } = props;
  const dispatch = useDispatch();
  console.log('isEdit >>>> ' + isEdit);
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      bookId: (job && job.bookId) || null,
      title: (job && job.title) || '',
      companyName: (job && job.companyName) || '',
      location: (job && job.location) || '',
      experience: (job && job.experience) || '',
      position: (job && job.position) || '',
      type: (job && job.type) || '',
      status: (job && job.status) || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Please Enter Your Job Title'),
      companyName: Yup.string().required('Please Enter Your Company Name'),
      location: Yup.string().required('Please Enter Your Location'),
      experience: Yup.string().required('Please Enter Your Experience'),
      position: Yup.string().required('Please Enter Your Position'),
      type: Yup.string().required('Please Enter Your Type'),
      status: Yup.string().required('Please Enter Your Status'),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        // 수정일 때
        const updateJobList = {
          bookId: values.bookId,
          title: values.title,
          companyName: values.companyName,
          location: values.location,
          experience: values.experience,
          position: values.position,
          type: values.type,
          postedDate: '02 June 2021',
          lastDate: '25 June 2021',
          status: values.status,
        };
        // update Job
        dispatch(onUpdateJobList(updateJobList));
        validation.resetForm();
      } else {
        // 등록 일 때
        const newJobList = {
          bookId: values['bookId'],
          title: values['title'],
          companyName: values['companyName'],
          location: values['location'],
          experience: values['experience'],
          position: values['position'],
          type: values['type'],
          postedDate: '02 June 2021',
          lastDate: '25 June 2021',
          status: values['status'],
        };
        // save new Job
        dispatch(onAddNewJobList(newJobList));
        validation.resetForm();
      }
      toggle();
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} tag="h4">
        {isEdit ? '수정 페이지' : '등록 페이지'}
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
            <Col className="col-12">
              <div className="mb-3">
                <Label className="form-label">책 제목</Label>
                <Input
                  name="title"
                  type="text"
                  placeholder="책 제목을 입력해주세요."
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.title || ''}
                  invalid={validation.touched.title && validation.errors.title ? true : false}
                />
                {validation.touched.title && validation.errors.title ? (
                  <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Company Name</Label>
                <Input
                  name="companyName"
                  type="text"
                  placeholder="Insert Company Name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.companyName || ''}
                  invalid={
                    validation.touched.companyName && validation.errors.companyName ? true : false
                  }
                />
                {validation.touched.companyName && validation.errors.companyName ? (
                  <FormFeedback type="invalid">{validation.errors.companyName}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Location</Label>
                <Input
                  name="location"
                  placeholder="Insert Location"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.location || ''}
                  invalid={validation.touched.location && validation.errors.location ? true : false}
                />
                {validation.touched.location && validation.errors.location ? (
                  <FormFeedback type="invalid">{validation.errors.location}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Experience</Label>
                <Input
                  name="experience"
                  type="text"
                  placeholder="Insert Experience"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.experience || ''}
                  invalid={
                    validation.touched.experience && validation.errors.experience ? true : false
                  }
                />
                {validation.touched.experience && validation.errors.experience ? (
                  <FormFeedback type="invalid">{validation.errors.experience}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Position</Label>
                <Input
                  name="position"
                  type="text"
                  placeholder="Insert Position"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.position || ''}
                  invalid={validation.touched.position && validation.errors.position ? true : false}
                />
                {validation.touched.position && validation.errors.position ? (
                  <FormFeedback type="invalid">{validation.errors.position}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Type</Label>
                <Input
                  name="type"
                  type="select"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ''}
                  invalid={validation.touched.type && validation.errors.type ? true : false}
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Freelance</option>
                  <option>Internship</option>
                </Input>
                {validation.touched.type && validation.errors.type ? (
                  <FormFeedback type="invalid">{validation.errors.type}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Status</Label>
                <Input
                  name="status"
                  type="select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ''}
                  invalid={validation.touched.status && validation.errors.status ? true : false}
                >
                  <option>Active</option>
                  <option>New</option>
                  <option>Close</option>
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback status="invalid">{validation.errors.status}</FormFeedback>
                ) : null}
              </div>
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
  );
};

JobModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  job: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default JobModal;
