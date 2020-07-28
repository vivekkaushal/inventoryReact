import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from './../history';
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Home page</h1>
          <p>A simple app showing react button click navigation</p>
          <form>
              <jumbotron>
            <Button variant="warning" size="lg" onClick={() => history.push('/Products')}>Login</Button>
            <Button variant="warning" size="lg" onClick={() => history.push('/Products')}>Sign Up</Button>
            </jumbotron>
          </form>
        </div>
      </div>
    );
  }
}