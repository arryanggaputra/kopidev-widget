import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ReactGA from "react-ga";
ReactGA.initialize("UA-142494062-2");
ReactGA.pageview(window.location.pathname + window.location.search);

const CoronaContainer = React.lazy(() => import("./pages/corona"));

export default function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/corona"
          component={WaitingComponent(CoronaContainer)}
        ></Route>
      </Switch>
    </Router>
  );
}

function WaitingComponent(Component) {
  return (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
}
