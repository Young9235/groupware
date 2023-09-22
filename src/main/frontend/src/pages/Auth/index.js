import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthDtl from "./AuthDtl";
import AuthList from "./AuthList";
import AuthReg from "./AuthReg";
import AuthUpd from "./AuthUpd";

function Auths() {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<AuthList />} />
          <Route path="reg" element={<AuthReg />} />
          <Route path="detail/:authId" element={<AuthDtl />} />
          <Route path="update/:authId" element={<AuthUpd />} />
        </Route>
      </Routes>
    </>
  );
}

export default Auths;
