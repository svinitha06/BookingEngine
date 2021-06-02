import React, { Component } from "react";
import "./Form.css";
import { get } from "lodash";
import { connect } from "react-redux";

import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import HotelDetail from "./HotelDetail";
export class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      gender: "",
      address: "",
      hotelFlag: true,
    };
  }
  componentDidMount() {
    this.setState({
      start: this.props.dateRange.start,
      end: this.props.dateRange.end,
    });
    console.log("this.props from form", this.props);
  }
  handleHotel = () => {
    // const { hotelFlag } = this.state;
    this.setState({
      hotelFlag: !this.state.hotelFlag,
    });
  };
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
    console.log(event.target.value);
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
<<<<<<< HEAD
          {/* <div className="form-date">
            <Button className="ui button">Back</Button>
=======
          <div className="form-date">
          
            <Button className="ui.button" as={NavLink} to="/basiclayout">
              Back
            </Button>
>>>>>>> bf46b8d98329f94600ece6f7bf0b4cf0241f7172
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
          </div> */}
          <div>
            <div>
              {/* <img src = {ImageOne} style={{ width: "100%" }}></img> */}
            </div>
<<<<<<< HEAD
            <div className="form-design">
              <form>
                <h2>Book your Room</h2>
                <div className="hotel-Details">
                  <div className="hotelHeading">
                    <h1>Hotel Details</h1>
                    <div>
                      <button onClick={this.handleHotel}>
                        <KeyboardArrowDownIcon />
                      </button>
                    </div>
                  </div>
                  {/* {this.state.hotelFlag && <HotelDetail />} */}
                  <div className="hotelDetailContainer">
                    <div className="firstContainer">
                      <div className="hotelImage">hotelImage</div>
                      <div>
                        <div>
                          <h4>Crown </h4>
                        </div>
                        <div>3/5</div>
                        <div>
                          <h5>Chennai ,India</h5>
                        </div>
                      </div>
                    </div>
                    <div className="secondContainer">
                      <div>
                        <h3>Check-in Date</h3>
                      </div>
                      <div>
                        <h3>Check-ot Date</h3> 2 june 20221
                      </div>

                      <div>
                        <h3>Rooms</h3> 1
                      </div>
                    </div>
                  </div>
                </div>
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

                  <div className="d-flex form-contents1">
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
=======
           <div className="form-design">
           <form >
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
              <label className="lastName">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleLastName}
              ></input>
              <br />
              <label classname="email">
                Email Address
              </label>
              <input
                type="email"
                placeholder="E-mail"
                value={this.state.email}
                onChange={this.handleEmail}
              ></input>
              </div>
              <br />

              <div className="d-flex form-contents1" >
              <label>Mobile No.</label>
              <input
                type="number"
                placeholder="Mobile"
                value={this.state.contact}
                onChange={this.handleContact}
              ></input>
              <br />
              <div className="GENDER"></div>
              <label classname="gender">Gender</label>
              <select name="Gender" id="gender-select">
              <option value="male">Male</option>
              <option value="female">Female</option>
              </select>
              {/* <label>Gender</label>
>>>>>>> bf46b8d98329f94600ece6f7bf0b4cf0241f7172
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
<<<<<<< HEAD
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
=======
              </div>
      
              
              {/* <br></br> */}
              {/* <div className="form-contents1"> */}
              {/* <h4>Billing address</h4> */}
              {/* <label>Address</label> */}
              <div className="d-flex form-contents2">
                <label>Address</label>
              <input
              className="form-contents5"
                type="text-area"
                placeholder="Address"
                value={this.state.address}
                onChange={this.handleAddress}
              ></input>
              </div>
              <div className="viewDetails">
                        
                          <button>Submit</button>
                       
                      </div>
>>>>>>> bf46b8d98329f94600ece6f7bf0b4cf0241f7172
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
  roomDetailsList: get(state, "roomDetailsList", []),
  roomTypeRatesData: get(state, "roomTypeRatesData", []),
  propertyList: get(state, "propertyList", []),
});

export default connect(mapStateToProps, null)(Form);
