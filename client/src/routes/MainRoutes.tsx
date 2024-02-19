import { Route, Switch, useLocation } from "react-router-dom";
import { AuthGaurd } from "./routeGaurd";
import HomePage from "../pages/HomePage";
import HomeContainer from "../components/HomeContainer";
import CreateMoviePage from "../pages/CreateMoviePage";
import EditMoviePage from "../pages/EditMoviePage";

const MainRoutes = () => {
  const location = useLocation();
  return (
    <>
      <Route path={["/movies", "/movies/:id"]}>
        <HomeContainer>
          <Switch location={location} key={location.pathname}>
            <AuthGaurd>
              <>
                <Route exact path="/movies" component={HomePage} />
                <Route exact path="/movies/new" component={CreateMoviePage} />
                <Route exact path="/movies/:id/edit" component={EditMoviePage} />
              </>
            </AuthGaurd>
          </Switch>
        </HomeContainer>
      </Route>
    </>
  );
};

export default MainRoutes;
