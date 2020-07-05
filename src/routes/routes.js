import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
// import App from "../App";
import Home from "../pages/home/home";
import RequestForm from "../pages/requestForm/requestForm";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route exact path='/login' component={LogIn} /> */}

          <Route exact path="/" component={Home} />
          <Route exact path="/konsultasi" component={RequestForm} />

          {/* <Route component={NotFound} /> */}
        </Switch>
      </Router>
    );
  }
}

export default Routes;
