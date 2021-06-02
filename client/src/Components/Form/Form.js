import React, { Component } from "react";
import "./Form.css";
import { get } from "lodash";
import { connect } from "react-redux";

import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
export class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      gender: "",
      address: ""
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
    });
  };

  handleLastName = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleContact = (event) => {
    this.setState({
      contact: event.target.value,
    });
    console.log(event.target.value)
  };
  handleGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };
  handleAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
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
          
            <Button className="ui button">
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
            {/* <img src = {ImageOne} style={{ width: "100%" }}></img> */}
            </div>
           <div className="form-design">
           <form >
            <h2>Book your Room</h2>
           
            <div className="form-contents">
              <div className="d-flex form-contents1">
              {/* <label>First Name</label> */}
              <input
                type="text"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleFirstName}
              ></input>
              {/* <label type="text"  placeholder="Last Name">
                Last Name
              </label> */}
              <input
                type="text"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleLastName}
              ></input>
              <br />
              {/* <label>Email Address</label> */}
              <input
                type="email"
                placeholder="E-mail"
                value={this.state.email}
                onChange={this.handleEmail}
              ></input>
              </div>
              <br />

              <div className="d-flex form-contents1" >
              {/* <label>Mobile No.</label> */}
              <input
                type="number"
                placeholder="Mobile"
                value={this.state.contact}
                onChange={this.handleContact}
              ></input>
              <br />
              <div className="GENDER"></div>
              <select name="Gender" id="gender-select">
              <option value="male">Male</option>
              <option value="female">Female</option>
              </select>
              {/* <label>Gender</label>
              <label className="d-flex">
                Male
                <input
                  type="select"
                  value="Male"
                  checked={this.state.gender === "Male"}
                  onChange={this.handleGender}
                ></input>
              </label>
              <label>
                Female
                <input
                  type="select"
                  value="Female"
                  checked={this.state.gender === "Female"}
                  onChange={this.handleGender}
                ></input>
              </label> */}
              </div>
      
              
              {/* <br></br> */}
              {/* <div className="form-contents1"> */}
              {/* <h4>Billing address</h4> */}
              {/* <label>Address</label> */}
              <div className="d-flex form-contents2">
              <input
              className="form-contents5"
                type="text-area"
                placeholder="Address"
                value={this.state.address}
                onChange={this.handleAddress}
              ></input>
              </div>
              <div className="submit-form">
                        
                          <button>Submit</button>
                       
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
