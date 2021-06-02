import React, { Component } from "react";
import "./Form.css";
import { get } from "lodash";
import { connect } from "react-redux";

import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
import validator from "validator";
export class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: "",
      contact: "",
      gender: "",
      address: "",
      firstError: "",
      lastError: "",
      emailError: "",
      contactError: "",
      addressError: "",
      numberError: "",
    };
  }
  componentDidMount() {
    this.setState({
      start: this.props.dateRange.start,
      end: this.props.dateRange.end,
    });
  }
  handleFirstName = (event) => {
    this.setState({
      firstName: event.target.value,
      firstError: "",
    });
    console.log(event.target.value);
  };

  handleLastName = (event) => {
    this.setState({
      lastName: event.target.value,
      lastError: "",
    });
  };

  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
      emailError: "",
    });
  };
  handleContact = (event) => {
    this.setState({
      contact: event.target.value,
      contactError: "",
    })
    
    
  };
  handleGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };
  handleAddress = (event) => {
    this.setState({
      address: event.target.value,
      addressError: "",
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.firstName === null) {
      this.setState({
        firstError: "enter firstName",
      });
    }
    if (this.state.lastName === null) {
      this.setState({
        lastError: "enter lastname",
      });
    }
    if (validator.isEmail(this.state.email)) {
      this.setState({
        emailError: "",
      });
    } else {
      this.setState({
        emailError: "enter valid email",
      });
    }
    if (this.state.contact === "") {
      this.setState({
        numberError: "Enter number",
      });
    }
    if (this.state.address === "") {
      this.setState({
        addressError: "Enter address",
      });
    }
    if (validator.isMobilePhone(this.state.contact)) {
      
      this.setState({
        contactError: "",
        
      });
    } else {
      this.setState({
        contactError: "Enter Valid Number",
        numberError:""
      });
    }

  };

  render() {
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    return (
      <div className="container-form">
        <div className="form">
          <div className="form-date">
            <Button className="ui.button" as={NavLink} to="/basiclayout">
              Back
            </Button>
            <div className="final-date">
              <span className="push">
                <h6> Check-in / Check-out</h6>
              </span>
              <DateRangePickerComponent
                placeholder="Check-in/Check-out"
                startDate={this.state.start}
                endDate={this.state.end}
                min={minValue}
                format={"dd-MMM-yy"}
                color={"black"}
                className="form-datepicker"
                id="datepickeridform"
              ></DateRangePickerComponent>
            </div>
          </div>
          <div>
            <div>
            </div>
            <div className="form-design">
              <form>
                <h2>Book your Room</h2>

                <div className="form-contents">
                  <div className="d-flex form-contents1">
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={this.state.firstName}
                      onChange={this.handleFirstName}
                    ></input>
                    {this.state.firstError}
                    <label className="lastName">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={this.state.lastName}
                      onChange={this.handleLastName}
                    ></input>
                    {this.state.lastError}
                    <br />

                    <label classname="email">Email Address</label>
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={this.state.email}
                      onChange={this.handleEmail}
                    ></input>
                    {this.state.emailError}
                  </div>
                  <br />

                  <div className="d-flex form-contents1">
                    <label>Mobile No.</label>
                    <input
                      
                      placeholder="Mobile"
                      value={this.state.contact}
                      onChange={this.handleContact}
                    ></input>
                    {this.state.contactError}
                    {this.state.numberError}
                    <br />
                    <div className="GENDER"></div>
                    <label classname="gender">Gender</label>
                    <select name="Gender" id="gender-select">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div className="d-flex form-contents2">
                    <label>Address</label>
                    <input
                      className="form-contents5"
                      type="text-area"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={this.handleAddress}
                    ></input>
                    {this.state.addressError}
                  </div>
                  <div className="submit-form">
                    <button onClick={this.handleSubmit}>Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  dateRange: get(state, "dateRange", []),
  roomRange: get(state, "roomRange", []),
});

export default connect(mapStateToProps, null)(Form);
