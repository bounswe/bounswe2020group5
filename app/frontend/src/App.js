import React from "react";
import NoMatch from "./common/NoMatch";
import Home from "./home/Home";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import EmailVerification from "./signup/EmailVerification";
import Profile from "./profile/Profile";
import ChangePassword from "./profile/ChangePassword";
import { Vendor } from "./signup/Vendor";
import product from "./product/product";
import AddProduct from "./product/AddProduct";
import { Route, Switch, Redirect } from "react-router-dom";
import { CssBaseline } from '@material-ui/core';
import search from "./search/search"

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/sample" render={routerProps => <Sample {...routerProps} sampleProp={"sample"}/>} /> */}
          <Route path="/login" component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route
            path="/email-verification"
            exact
            component={EmailVerification}
          />
          <Route exact path="/product/:id" component={product} />
          <Route path="/search" component={search} />
          <Route path="/signup/vendor" component={Vendor} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/profile/changepassword" component={ChangePassword} />
          <Route path="/home" render={() => <Redirect to="/" />} />
          <Route path="/add-product" exact component={AddProduct} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
