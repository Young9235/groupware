import React from "react";
import { Badge } from "reactstrap";
import { Link } from "react-router-dom";

const JobNo = (cell) => {
  return (
    <Link to="#" className="text-body fw-bold">
      {cell.value ? cell.value : ""}
    </Link>
  );
};

const DataText = (cell) => {
  return cell.value ? cell.value : "";
};

const DisplayNone = (cell) => {
  return <div style={{ display: "none" }}>{cell.value ? cell.value : ""}</div>;
};

const Type = (cell) => {
  switch (cell.value) {
    case "어린이/동화":
      return <Badge className="badge-soft-success">어린이/동화</Badge>;
    case "참고서":
      return <Badge className="badge-soft-info">참고서</Badge>;
    case "소설/문학":
      return <Badge className="badge-soft-info">소설/문학</Badge>;
    case "Internship":
      return <Badge className="badge-soft-warning">Internship</Badge>;
    default:
      break;
  }
};

const Status = (cell) => {
  switch (cell.value) {
    case "Y":
      return <Badge className="bg-success">In stock</Badge>;
    case "New":
      return <Badge className="bg-info">New</Badge>;
    case "N":
      return <Badge className="bg-danger">Empty</Badge>;
    default:
      break;
  }
};

export { JobNo, DataText, Type, Status, DisplayNone };
