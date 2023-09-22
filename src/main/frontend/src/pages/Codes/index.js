import React from "react";
import { Route, Routes } from "react-router-dom";
import CodeDtl from "./CodeDtl";
import CodeList from "./CodeList";
import CodeReg from "./CodeReg";
import CodeUpd from "./CodeUpd";

function Codes() {
  return (
    <>
      {/* 
        <Routes>
        <Route index={true} path="/code" element={<CodeList />}>
          <Route path="list" element={<CodeList />} />
          <Route path="reg" element={<CodeReg />} />
          <Route path="/:id" element={<CodeDetail />} />
          <Route path="update/:id" element={<CodeUpdate />} />
        </Route>
      </Routes>
      */}
      <Routes>
        <Route>
          <Route path="/" element={<CodeList />} />
          <Route path="reg" element={<CodeReg />} />
          <Route path="detail/:codeId" element={<CodeDtl />} />
          <Route path="update/:codeId" element={<CodeUpd />} />
        </Route>
      </Routes>
    </>
  );
}

export default Codes;
