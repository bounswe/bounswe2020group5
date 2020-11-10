import NoMatch from './common/NoMatch'
import Home from "./home/Home";
import Login from "./login/Login";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/sample" render={routerProps => <Sample {...routerProps} sampleProp={"sample"}/>} /> */}
        <Route path="/login" component={Login} />
        <Route path='/home' render={() => <Redirect to= "/" />} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

export default App;
