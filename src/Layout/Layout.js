import React from "react";
import Login from "../Auth/Login";
import Home from "../Home/Home";
import Registration from "../Auth/Registration";
import EditHistory from "../History/EditHistory";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import authentication from '../Auth/Authentication';

function SecuredRoute(props) {
    return (
        <Route path={props.path} render={data => authentication.getLogInStatus()?(
            <props.component {...data}></props.component>):
            (<Redirect to={{pathname:'/'}}></Redirect>)}></Route>
    )
}

function Layout() {
  return (
        <Switch>
           <Route exact path="/" component={Login} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/register" component={Registration} />
           <Route exact path="/edit/:id" component={EditHistory} />
           <Route exact path="/home" component={Home} />
         </Switch>
  );
}

export default Layout;
