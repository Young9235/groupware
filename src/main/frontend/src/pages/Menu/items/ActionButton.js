import { Link,useNavigate, useSearchParams } from "react-router-dom";
import {Button, UncontrolledTooltip } from "reactstrap";
import PropTypes from "prop-types";

function ActionButton(props) {
  const { id, detailPage, updatePage} = props;
  const [searchParams] = useSearchParams();  
  const navigate = useNavigate();

  
  return (
    <ul className="list-unstyled hstack gap-1 mb-0">
      <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
        <Button
        onClick={() => {
          if(searchParams.get("menuName") !== null && searchParams.get("menuType") !== null) navigate(detailPage + "?menuName="+ searchParams.get("menuName")+"&menuType="+ searchParams.get("menuType") +"&page="+ searchParams.get("page"));
          else if(searchParams.get("menuName") !== null && searchParams.get("menuType") === null) navigate(detailPage + "?menuName="+ searchParams.get("menuName") +"&page="+ searchParams.get("page"));
          else if(searchParams.get("menuType") !== null  && searchParams.get("menuName") === null) navigate(detailPage + "?menuType="+ searchParams.get("menuType") +"&page="+ searchParams.get("page"));
          else navigate(detailPage + "?page="+ searchParams.get("page"));
       }}
          className="btn btn-sm btn-soft-primary"
        >
          <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
        </Button>
      </li>
      <UncontrolledTooltip placement="top" target="viewtooltip">
        View
      </UncontrolledTooltip>

      <li>
        <Button
          onClick={() => {
            if(searchParams.get("menuName") !== null && searchParams.get("menuType") !== null) navigate(updatePage + "?menuName="+ searchParams.get("menuName")+"&menuType="+ searchParams.get("menuType") +"&page="+ searchParams.get("page"));
            else if(searchParams.get("menuName") !== null && searchParams.get("menuType") === null) navigate(updatePage + "?menuName="+ searchParams.get("menuName") +"&page="+ searchParams.get("page"));
            else if(searchParams.get("menuType") !== null  && searchParams.get("menuName") === null) navigate(updatePage + "?menuType="+ searchParams.get("menuType") +"&page="+ searchParams.get("page"));
            else navigate(updatePage + "?page="+ searchParams.get("page"));
          }}
          className="btn btn-sm btn-soft-info"
        >
          <i className="mdi mdi-pencil-outline" id="edittooltip" />
          <UncontrolledTooltip placement="top" target="edittooltip">
            Edit
          </UncontrolledTooltip>
        </Button>
      </li>

      <li>
        <Link
          to="#"
          className="btn btn-sm btn-soft-danger"
          onClick={() => {
            props.setHandleDelClick(id);
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
}

ActionButton.propTypes = {
  id: PropTypes.number,
  detailPage: PropTypes.string,
  updatePage: PropTypes.string,
};

export default ActionButton;
