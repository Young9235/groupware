import React from "react";
import { Route, Routes } from "react-router-dom";
import UserList from "./UserList";
import UserReg from "./UserReg";
import UserUpdate from "./UserUpdate";
import UserDetail from "./UserDetail";

function User() {
  return (
    <>
      <Routes>
        <Route>
          <Route exact path="/" element={<UserList />} />
          <Route path="reg" element={<UserReg />} />
          {/* <Route path="update" element={<UserUpdate />} /> */}
          <Route path="detail/:id" element={<UserDetail />} />
          <Route path="update/:id" element={<UserUpdate />} />
          {/* <Route path="/:id" element={<CodeDetail />} />
          <Route path="update/:id" element={<CodeUpdate />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default User;
