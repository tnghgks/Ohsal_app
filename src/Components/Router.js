import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "Pages/Home";
import NotFound from "Pages/NotFound";
import Header from "Components/Header";

const AppRouter = () => (
  <>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </>
);

export default AppRouter;
