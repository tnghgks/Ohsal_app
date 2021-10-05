import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "Pages/Home";
import Auth from "Pages/Auth";
import Event from "Pages/Event";
import Battle from "Pages/Battle";
import Close from "Pages/Close";
import NotFound from "Pages/NotFound";
import Header from "Components/Header";

const AppRouter = ({ authenticate }) => (
  <>
    <Router>
      <Switch>
        {authenticate && authenticate ? (
          <>
            <Header authenticate={authenticate} />
            <Route exact path="/" component={Home} />
            <Route exact path="/event" component={Event} />
            <Route exact path="/battle" component={Battle} />
            <Route exact path="/close" component={Close} />
          </>
        ) : (
          <>
            <Route exact path="/" component={Auth} />
            <Route exact path="/close" component={Close} />
          </>
        )}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </>
);

export default AppRouter;
