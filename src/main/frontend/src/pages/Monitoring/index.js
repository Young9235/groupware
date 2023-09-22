import React from "react";
import { Route, Routes } from "react-router-dom";
import MonitoringList from "./MonitoringList";

function Boards({ match }) {
  return (
    <>
      <Routes>
        <Route>
          <Route exact path="/" element={<MonitoringList />} />
        </Route>
      </Routes>
    </>
  );
}

export default Boards;
