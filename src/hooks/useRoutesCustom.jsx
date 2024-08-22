import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import UserTemplate from "../templates/UserTemPlate/UserTemplate";
import { pathDefault } from "../common/path";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPage from "../pages/Login/LoginPage";
import ListJobPage from "../pages/ListJobPage/ListJobPage";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminTemplate from "../templates/AdminTemplate/AdminTemplate";
// import ManagerUser from "../pages/ManagerUser/ManagerUser";
import CreatUser from "../pages/CreateUser/CreatUser";
import { Skeleton } from "antd";
const ManagerUser = React.lazy(() =>
  import("../pages/ManagerUser/ManagerUser")
);
const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: pathDefault.homePage,
      element: <UserTemplate />,
      children: [
        {
          path: pathDefault.listJob,
          element: <ListJobPage />,
        },
      ],
    },
    {
      path: pathDefault.register,
      element: <RegisterPage />,
    },

    {
      path: pathDefault.login,
      element: <LoginPage />,
    },
    {
      path: pathDefault.admin,
      element: <AdminTemplate />,
      children: [
        {
          path: "manager-user",
          // index: true,

          element: (
            <Suspense
              fallback={
                <div>
                  {" "}
                  <Skeleton />
                </div>
              }
            >
              <ManagerUser />
            </Suspense>
          ),
        },
        {
          path: "create-user",
          element: <CreatUser />,
        },
      ],
    },
    {
      path: "/admin-login",
      element: <AdminLogin />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
