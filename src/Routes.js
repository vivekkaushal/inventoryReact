import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
 import About from "./About/About.js";
 import Contact from "./Contact/Contact";
 import Products from "./Products/Products";
 import Home from "./Home/Home";
 import history from './history';
 import Login from './Login/Login';
 import Register from './Register/Register';
 import Center from './Center/center';
 import CenterList from './Center/centerList';

export default class Routes extends Component {
    render() {
        return (
             <Router history={history}>
                 <Switch>
                 <Route path="/" exact component={Home} />
                     <Route path="/About" component={About} />
                     <Route path="/Contact" component={Contact} />
                     <Route path="/Products" component={Products} />  
                     <Route path="/Login" component={Login} />  
                     <Route path="/Register" component={Register} />          
                     <Route path= "/Centerdetails" component={Center} />
                     <Route path="/Centerdata" component={CenterList}/>
                     <Route path ="/edit/:id" component={Center}/>
                 </Switch>
             </Router>    
        )
    }
}