import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import LoginRoutes from "./LoginRoutes";
import MainRoutes from "./MainRoutes";

function AppRoutes() {
  let defaultPath = "/signin";
  if (getCookie("user")) defaultPath = "/movies";
  return (
    <>
      <Switch>
        <Redirect exact from="/" to={defaultPath} />
        <React.Fragment>
          <LoginRoutes />
          <MainRoutes />
        </React.Fragment>
      </Switch>
    </>
  );
}

export default AppRoutes;
