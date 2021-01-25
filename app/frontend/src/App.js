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
import messages from "./profile/messages";
import search from "./search/search"
import Payment from "./payment/Payment";
import Categories from "./categories/Categories";
import ListPage from "./list/ListPage";
import ListsPage from "./list/ListsPage";
import Favorites from "./list/Favorites";
import Cart from "./cart/Cart";
import Vendorproduct from "./vendorproduct/Vendorproduct";
import Vendoreditproduct from "./vendorproduct/Vendoreditproduct";
import order from "./orders/order";
import vendororder from "./vendororder/vendororder";
import Assessments from "./profile/Assessments";
import SavedCards from "./savedCards/SavedCards";
import Forgot from "./login/Forgot";
import ForgotChange from "./login/ForgotChange";


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
          <Route path="/cart" exact component={Cart} />
          <Route path="/orders" exact component={order} />
          <Route path="/vendororders" exact component={vendororder} />
          <Route path="/vendorproduct" exact component={Vendorproduct} />
          <Route path="/vendorproduct/vendoreditproduct" component={Vendoreditproduct} />
          <Route path="/signup/vendor" component={Vendor} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/payment" exact component={Payment} />
          <Route path="/profile/changepassword" component={ChangePassword} />
          <Route path="/profile/messages" component={messages} />
          <Route path="/home" render={() => <Redirect to="/" />} />
          <Route path="/add-product" exact component={AddProduct} />
          <Route path="/profile/lists" exact component={ListsPage} />
          <Route exact path="/profile/lists/favorites" component={Favorites} />
          <Route exact path="/profile/lists/:id" component={ListPage} />
          <Route exact path="/profile/assessments" component={Assessments} />
          <Route path="/category" component={Categories} />
          <Route path="/subcategory" exact component={Categories} />
          <Route path="/profile/savedcards" exact component={SavedCards} />
          <Route path="/forgot/enter/email" exact component={Forgot} />
          <Route path="/forgot" component={ForgotChange} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
