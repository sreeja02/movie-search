import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import App from "./App";
import MovieDetails from "./MovieDetail";

const Routes = ({ ...props }) => (
  <Router basename={"/app"}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/movie-detail" component={MovieDetails} />
    </Switch>
  </Router>
);

export default Routes;
