import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import SplashPage from "./components/SplashPage";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import BusinessFormPage from "./components/BusinessFormPage";
import ListWrapper from "./components/BusinessView/ListWrapper";
import BusinessView from "./components/BusinessView";

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
        </Switch>
      )}
    </>
  );
}

export default App;