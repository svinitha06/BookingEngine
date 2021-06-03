import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Home from "./Components/Home/Home";
import BookNow from "./Components/BookNow/BookNow";
import Header from "./Components/Header/Header";
import AboutUs from "./Components/About/AboutUs";
import Footer from "./Components/Footer/Footer";
import Details from "./Components/Details/Details"

import BasicLayout from "./Components/BookNow/BasicLayout";
import Form from "./Components/Form/Form";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="content-wrap">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/booknow">
            <BookNow />
          </Route>
          <Route path="/aboutUs">
            <AboutUs />
          </Route>
          
          <Route path="/basiclayout/:id">
            <BasicLayout />
          </Route>
          <Route path="/form">
            <Form />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
        </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default connect(null, null)(withRouter(App));
