import React from "react";
import { Route, Routes } from "react-router-dom";
import MenuList from "./MenuList";
import MenuReg from "./MenuReg";
import MenuDetail from "./MenuDetail";
import MenuUpdate from "./MenuUpdate";

function Menu() {
  return (
    <>
      <Routes>
        <Route>
          <Route exact path="/" element={<MenuList />} />
          <Route path="reg" element={<MenuReg />} />
          <Route path="detail/:id" element={<MenuDetail />} />
          <Route path="update/:id" element={<MenuUpdate />} />
        </Route>
      </Routes>
    </>
  );
}

export default Menu;
