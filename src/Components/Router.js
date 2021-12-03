import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "Pages/Home";
import Auth from "Pages/Auth";
import ChickenEvent from "Pages/ChickenEvent";
import Battle from "Pages/Battle";
import NotFound from "Pages/NotFound";
import Header from "Components/Header";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
`;

const AppRouter = ({ authenticate, setAuth }) => (
  <Router>
    {authenticate && authenticate ? (
      <Container>
        <Header authenticate={authenticate} setAuth={setAuth} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/event" component={ChickenEvent} />
          <Route exact path="/battle" component={Battle} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    ) : (
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="*" component={Auth} />
      </Switch>
    )}
  </Router>
);

export default AppRouter;
