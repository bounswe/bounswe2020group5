import React from 'react';
import NoMatch from './common/NoMatch'
import Home from "./home/Home";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Profile from "./profile/Profile";
import ChangePassword from "./profile/ChangePassword";
import { Vendor } from "./signup/Vendor";
import product from "./product/product";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/sample" render={routerProps => <Sample {...routerProps} sampleProp={"sample"}/>} /> */}
        <Route path="/login" component={Login} />
        <Route path="/product" component={product} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signup/vendor" component={Vendor} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/changepassword" component={ChangePassword} />
        <Route path='/home' render={() => <Redirect to= "/" />} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

export default App;
