import React from "react";
import { Route, Routes } from "react-router-dom";
import BoardList from "./BoardList";
import BoardReg from "./BoardReg";
import BoardDetail from "./BoardDetail";
import BoardUpdate from "./BoardUpdate";

function Boards({ match }) {
  return (
    <>
      <Routes>
        <Route>
          <Route exact path="/" element={<BoardList />} />
          <Route path="reg" element={<BoardReg />} />
          <Route path="detail/:id" element={<BoardDetail />} />
          <Route path="update/:id" element={<BoardUpdate />} />
        </Route>
      </Routes>
    </>
  );
}

export default Boards;
