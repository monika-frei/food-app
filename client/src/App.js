import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import { routes } from "./utilities/routes";
import AuthPage from "./views/AuthPage/AuthPage";
import WelcomePage from "./views/WelcomePage/WelcomePage";
import PlanPage from "./views/PlanPage/PlanPage";
import RecipesPage from "./views/RecipesPage/RecipesPage";
import GroceryListPage from "./views/GroceryListPage/GroceryListPage";
import RecipePage from "./views/RecipePage/RecipePage";
import GlobalContextProvider from "./context/GlobalContext";
import PlanContextProvider from "./context/PlanContext";
import RecipesContextProvider from "./context/RecipesContext";
import DetailedDayPlan from "./views/DetailedDayPlan/DetailedDayPlan";

function App() {
  return (
    <GlobalContextProvider>
      <Router>
        <Switch>
          <Route exact path={routes.home} component={WelcomePage} />
          <Route path={routes.signup} component={AuthPage} />
          <Route exact path={routes.login} component={AuthPage} />
          <Route exact path={routes.plan}>
            <PlanContextProvider>
              <PlanPage />
            </PlanContextProvider>
          </Route>
          <Route exact path={routes.dayPlan}>
            <PlanContextProvider>
              <DetailedDayPlan />
            </PlanContextProvider>
          </Route>
          <Route exact path={routes.recipes}>
            <RecipesContextProvider>
              <RecipesPage />
            </RecipesContextProvider>
          </Route>
          <Route exact path={routes.recipe}>
            <RecipesContextProvider>
              <RecipePage />
            </RecipesContextProvider>
          </Route>
          <Route exact path={routes.list}>
            <RecipesContextProvider>
              <GroceryListPage />
            </RecipesContextProvider>
          </Route>
          <Route path="*">
            <Redirect to={routes.home} />
          </Route>
        </Switch>
      </Router>
    </GlobalContextProvider>
  );
}

export default App;
