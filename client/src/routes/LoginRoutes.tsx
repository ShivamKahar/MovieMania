import { Route, Switch, useLocation } from "react-router-dom";
import SignInLayout from "../components/Signin/SignInLayout";
import { GuestGuard } from "./routeGaurd";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const LoginRoutes = () => {
  const location = useLocation();
  return (
    <>
      <Route path={["/signin", "/signup"]}>
        <SignInLayout>
          <Switch location={location} key={location.pathname}>
            <GuestGuard>
              <>
                <Route exact path="/signin" component={LoginPage} />
                <Route exact path="/signup" component={RegisterPage} />
              </>
            </GuestGuard>
          </Switch>
        </SignInLayout>
      </Route>
    </>
  );
};

export default LoginRoutes;
