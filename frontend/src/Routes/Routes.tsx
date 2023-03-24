import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default (props: any) => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sigin" element={<Login />} />
      <Route path="/sigup" element={<Register />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
};
