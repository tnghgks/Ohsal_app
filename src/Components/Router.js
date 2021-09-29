import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "Pages/Home";
import Auth from "Pages/Auth";
import Event from "Pages/Event";
import Battle from "Pages/Battle";
import NotFound from "Pages/NotFound";
import Header from "Components/Header";

const AppRouter = ({ authenticate }) => (
  <>
    <Router>
      {authenticate && authenticate ? <Header /> : ""}
      <Switch>
        {authenticate && authenticate ? (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/event" component={Event} />
            <Route exact path="/battle" component={Battle} />
          </>
        ) : (
          <Route exact path="/" component={Auth} />
        )}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </>
);

export default AppRouter;
