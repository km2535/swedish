import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorPage from "./component/errorPage/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./page/landingPage/LandingPage";
import Home from "./page/home/Home";
import InfoBranch from "./page/infoBranch/InfoBranch";
import Branch from "./page/branch/Branch";
import Join from "./page/user/Join";
import Attendance from "./page/branch/attendance/Attendance";
import Manager from "./page/branch/manager/Manager";
import Location from "./page/branch/location/Location";
import Review from "./page/branch/review/Review";
import Notice from "./page/branch/notice/Notice";
import AttendanceDetail from "./page/branch/attendance/attendanceDetail/AttendanceDetail";
import Personal from "./component/policy/personal/Personal";
import Email from "./component/policy/email/Email";
import Use from "./component/policy/use/Use";
import Admin from "./page/admin/Admin";
import ProtectPath from "./component/protectpath/ProtectPath";
import DesignSkin from "./adminPage/designSkin/DesignSkin";
import UserAdmin from "./adminPage/userAdmin/UserAdmin";
import BranchAdmin from "./adminPage/branch/BranchAdmin";
import EditBranch from "./adminPage/branch/editBranch/EditBranch";
import BranchDetail from "./adminPage/branch/branchDetail/BranchDetail";
import ManagerAdmin from "./adminPage/branch/manager/ManagerAdmin";
import EditManager from "./adminPage/branch/manager/editManager/EditManager";
import AddManager from "./adminPage/branch/manager/editManager/AddManager";
import NewNotice from "./adminPage/notice/NewNotice";
import NoticeDetail from "./component/notice/noticeDetail/NoticeDetail";
import EditNotice from "./adminPage/notice/EditNotice";
import NewReview from "./component/review/newReview/NewReview";
import ReviewDetail from "./component/review/reviewDetail/ReviewDetail";
import EditReview from "./component/review/newReview/EditReview";
import ManagerDetail from "./page/branch/manager/managerDetail/ManagerDetail";
import UserFind from "./page/user/userFind/UserFind";
import Approveuser from "./adminPage/userAdmin/approveUser/Approveuser";
import NoneApproveuser from "./adminPage/userAdmin/noneApproveuser/NoneApproveuser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/idFind",
        element: <UserFind />,
      },
      {
        path: "/pwFind",
        element: <UserFind isPw={true} />,
      },
      {
        path: `/admin`,
        element: (
          <ProtectPath isAdmin={true}>
            <Admin />
          </ProtectPath>
        ),
        children: [
          {
            path: "/admin",
            element: <UserAdmin />,
          },
          {
            path: "/admin/userList",
            element: <Approveuser />,
          },
          {
            path: "/admin/noneApprove",
            element: <NoneApproveuser />,
          },
          {
            path: "/admin/design",
            element: <DesignSkin />,
          },
          {
            path: "/admin/branch",
            element: <BranchAdmin />,
          },
          {
            path: "/admin/branchDetail",
            element: <BranchDetail />,
          },
          {
            path: "/admin/branchDetail/:id",
            element: <ManagerAdmin />,
          },
          {
            path: "/admin/branchDetail/:id/addmanager",
            element: <AddManager />,
          },
          {
            path: "/admin/branchDetail/:id/editmanager",
            element: <EditManager />,
          },
          {
            path: "/admin/editBranch",
            element: <EditBranch />,
          },
          {
            path: "/admin/notice",
            element: <Notice isAdmin={true} />,
          },
          {
            path: "/admin/notice/:id",
            element: <NoticeDetail isAdmin={true} />,
          },
          {
            path: "/admin/editNotice",
            element: <EditNotice isAdmin={true} />,
          },
          {
            path: "/admin/newNotice",
            element: <NewNotice />,
          },
        ],
      },
      {
        path: "/swedish",
        element: <Home />,
        children: [
          {
            index: true,
            path: "/swedish",
            element: <InfoBranch />,
          },
          {
            path: `${process.env.REACT_APP_SUB_URL}/${process.env.REACT_APP_API_PERSONAL_URL}`,
            element: <Personal />,
          },
          {
            path: `${process.env.REACT_APP_SUB_URL}/${process.env.REACT_APP_API_EMAIL_URL}`,
            element: <Email />,
          },
          {
            path: `${process.env.REACT_APP_SUB_URL}/${process.env.REACT_APP_API_USE_URL}`,
            element: <Use />,
          },
          {
            path: "/swedish/:id",
            element: (
              <>
                <ProtectPath isAdmin={false}>
                  <Branch />
                </ProtectPath>
              </>
            ),
            children: [
              {
                index: true,
                path: "/swedish/:id",
                element: <Attendance />,
              },
              {
                path: "/swedish/:id/:id",
                element: <AttendanceDetail />,
              },
              {
                path: "/swedish/:id/manager",
                element: <Manager />,
              },
              {
                path: "/swedish/:id/manager/:id",
                element: <ManagerDetail />,
              },
              {
                path: "/swedish/:id/location",
                element: <Location />,
              },
              {
                path: "/swedish/:id/review",
                element: <Review />,
              },
              {
                path: "/swedish/:id/review/newReview",
                element: <NewReview />,
              },
              {
                path: "/swedish/:id/review/:id",
                element: <ReviewDetail />,
              },
              {
                path: "/swedish/:id/review/:id/editReview",
                element: <EditReview />,
              },
              {
                path: "/swedish/:id/notice",
                element: <Notice />,
              },
              {
                path: "/swedish/:id/notice/:id",
                element: <NoticeDetail />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
