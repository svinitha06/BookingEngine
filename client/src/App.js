import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';
import Home from './Components/Home/Home';
import BookNow from './Components/BookNow/BookNow';
import Header from './Components/Header/Header';
import AboutUs from './Components/About/AboutUs';
import Accommodation from './Components/Accommodation/Accommodation';
// import Facilities from './Components/Facilities/Facilities';
import Gallery from './Components/Gallery/Gallery';
import Reviews from './Components/Reviews/Reviews'
class App extends Component {

  render() {
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/"> <Home /> </Route> 
          <Route path="/booknow"> <BookNow /> </Route> 
          <Route path='/aboutUs'><AboutUs/></Route>
          <Route path='/accommodation'><Accommodation/></Route>
          {/* <Route path='/facilities'><Facilities/></Route> */}
          <Route path='/gallery'><Gallery/></Route>
          <Route path='/reviews'><Reviews/></Route>
        </Switch>
      </div>
    );
  }
}


export default connect(null, null)(withRouter(App));