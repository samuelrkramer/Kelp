import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import SplashPage from "./components/SplashPage";
import AllBusinesses from "./components/AllBusinesses";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import BusinessFormPage from "./components/BusinessFormPage";
import BusinessView from "./components/BusinessView";
import SearchBusinesses from "./components/SearchBusinesses";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
            {/* <AllBusinesses /> */}
          </Route>
          <Route exact path="/business">
            <AllBusinesses />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/newBusiness">
            <BusinessFormPage mode="Create" />
          </Route>
          <Route path="/business/:businessId">
            <BusinessView />
          </Route>
          <Route path="/editBusiness/:businessId">
            <BusinessFormPage mode="Edit" />
          </Route>
          <Route path="/search">
            <SearchBusinesses />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;