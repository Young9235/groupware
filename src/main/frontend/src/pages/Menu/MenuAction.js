import React, {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";
import { getUsers,deleteUser } from "helpers/fakebackend_helper";
import DeleteModal from "components/Common/DeleteModal";





function UserAction(cellProps) {

  const navigate = useNavigate();

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const [users, setUsers] = useState();
  const [schCodeName,setSchCodeName] = useState('')
  const [loading, setLoading] = useState(true);
  
  
  const onClickDelete = cellProps => {
    setUsers(cellProps)
    setDeleteModal(true);
  };
  
  const handleDeleteUser = () => {
    // console.log("users.userId", cellProps.userId)
    deleteUser(cellProps.userId)
    .then((response) => {
      console.log(response);
      if (response > 0) {
        setDeleteModal(false);
        window.location.replace("/user")
        // toastr.success("정상적으로 변경이 되었습니다!", "success");
      
      } else {
        // toastr.error("error code : " + response.result, "error");
      }
    })
    .catch((e) => {
      // toastr.error(e.message, "error");
    });
    // onPaginationPageChange(1);
    // setDeleteModal(false);
  };



  return (
    <React.Fragment>
    <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
    <ul className="list-unstyled hstack gap-1 mb-0">
      <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
        <Link
          to={`/code/detail/${cellProps.codeId}`}
          className="btn btn-sm btn-soft-primary"
        >
          <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
        </Link>
      </li>
      <UncontrolledTooltip placement="top" target="viewtooltip">
        View
      </UncontrolledTooltip>

      <li>
        <Link
          to={`/code/update/${cellProps.codeId}`}
          className="btn btn-sm btn-soft-info"
        >
          <i className="mdi mdi-pencil-outline" id="edittooltip" />
          <UncontrolledTooltip placement="top" target="edittooltip">
            Edit
          </UncontrolledTooltip>
        </Link>
      </li>

      <li>
        <Link to="#" className="btn btn-sm btn-soft-danger" 
        onClick={() => {
          console.log("cellProps", cellProps)
          onClickDelete(cellProps.userId);
        }}
        >
          <i className="mdi mdi-delete-outline" id="deletetooltip" />
          <UncontrolledTooltip placement="top" target="deletetooltip">
            Delete
          </UncontrolledTooltip>
        </Link>
      </li>
    </ul>
  </React.Fragment>
  );
}

export default UserAction;
