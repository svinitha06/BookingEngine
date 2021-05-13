import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';
import Home from './Components/Home/Home';
import BookNow from './Components/BookNow/BookNow';
import Header from './Components/Header/Header';
import AboutUs from './Components/About/AboutUs';
import Accommodation from './Components/Accommodation/Accommodation';

import BasicLayout from './Components/BookNow/BasicLayout';
class App extends Component {

  render() {
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/"> <BasicLayout /> </Route> 
          <Route path="/booknow"> <BookNow /> </Route> 
          <Route path='/aboutUs'><AboutUs/></Route>
          <Route path='/accommodation'><Accommodation/></Route>
        </Switch>
      </div>
    );
  }
}


export default connect(null, null)(withRouter(App));