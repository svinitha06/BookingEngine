import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';
import Home from './Components/Home/Home';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/"> <Home /> </Route> 
        </Switch>
        
      </div>
    );
  }
}


export default connect(null, null)(withRouter(App));