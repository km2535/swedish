import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../component/navbar/Navbar";

export default function Branch() {
  const { state } = useLocation();
  // console.log(state);
  return (
    <div>
      <Navbar
        option={{ main: false, sub: true }}
        boardId={state?.ID}
        boardName={state?.TITLE}
        boardPhone={state?.BRANCH_PHONE}
        boardAddress={state?.ADDRESS}
        boardlocation={state?.MAPIMAGE_URL}
      />
      <Outlet />
    </div>
  );
}
