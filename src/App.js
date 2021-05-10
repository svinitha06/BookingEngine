import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';
import Home from './Components/Home/Home';
import BookNow from './Components/BookNow/BookNow';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/"> <Home /> </Route> 
          <Route path="/booknow"> <BookNow /> </Route> 
        </Switch>
      </div>
    );
  }
}


export default connect(null, null)(withRouter(App));