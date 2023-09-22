import { Link } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";

function ActionButton(cellProps) {
  return (
    <ul className="list-unstyled hstack gap-1 mb-0">
      {/* <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
        <Link
          to={`/board/detail/${cellProps.boardId}`}
          className="btn btn-sm btn-soft-primary"
        >
          <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
        </Link>
      </li>
      <UncontrolledTooltip placement="top" target="viewtooltip">
        View
      </UncontrolledTooltip> */}

      <li>
        <Link
          to={`/board/update/${cellProps.boardId}`}
          className="btn btn-sm btn-soft-info"
        >
          <i className="mdi mdi-pencil-outline" id="edittooltip" />
          <UncontrolledTooltip placement="top" target="edittooltip">
            Edit
          </UncontrolledTooltip>
        </Link>
      </li>

      <li>
        <Link
          to="#"
          className="btn btn-sm btn-soft-danger"
          onClick={() => {
            const boardId = cellProps.boardId;
            cellProps.setHandleDelClick(boardId);
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

export default ActionButton;
