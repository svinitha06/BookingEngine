import React, { Component } from "react";
import "./Form.css";
import { get } from "lodash";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
import validator from "validator";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import HotelDetail from "./HotelDetail";
import ErrorIcon from "@material-ui/icons/Error";
import Image from "../Form/Image.jpeg";
import {
  hotelDetails
} from "../../actions/index";
import * as db from "../../api/index";
import { bindActionCreators } from "redux";

export class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: "",
      contact: "",
      gender: "male",
      address: "",
      firstError: "",
      lastError: "",
      emailError: "",
      contactError: "",
      addressError: "",
      numberError: "",
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
    });
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
        numberError: "",
      });
    }
    this.getHoteldetails()
    // <Redirect to="/payment" />
  };

  getHoteldetails=async()=>{
    const data={
      firstName: this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      contact:this.state.contact,
      gender:this.state.gender,
      address:this.state.address
    }
    this.props.hotelDetails(data)
    console.log(data,"hotelNow")
   await db.getPostHotelDetails(data);
  }
  render() {
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    return (
      <div className="container-form">
        <div className="form">
          {/* <div className="form-date">
            <Button className="ui button">Back</Button>
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
            <div></div>
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
                      <div className="hotelImage">
                        <img src={Image}></img>
                      </div>
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
                    <label>First Name</label>
                    <div className="d-flex w-100">
<<<<<<< HEAD
                      <input
                        type="text"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.handleFirstName}
                        className={`${
                          this.state.firstError !== "" ? "firstError" : ""
                        }`}
                      ></input>
                      {this.state.firstError !== "" && (
                        <ErrorIcon color="secondary" className="ml-2 mt-8" />
                      )}
                    </div>
                    {/* <p className="ad-first">{this.state.firstError}</p> */}

                    <div className="d-flex w-100">
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleLastName}
                        className={`${
                          this.state.lastError !== "" ? "firstError" : ""
                        }`}
                      ></input>
                      {this.state.lastError !== "" && (
                        <ErrorIcon color="secondary" className="ml-2 mt-8" />
                      )}
=======
                    {/* <div className="ui input"></div> */}
                    <input
                      type="text"
                      placeholder="First Name"
                      value={this.state.firstName}
                      onChange={this.handleFirstName}
                      className={`${
                        this.state.firstError !== "" ? "firstError" : ""
                      }`}
                    ></input>
                     {this.state.firstError !== "" && (
                  <ErrorIcon color="secondary" className="ml-2 mt-8" />
                )}
                   
               
                    </div>
                    {/* <p className="ad-first">{this.state.firstError}</p> */}
                    <label>Last Name</label>
                    <div className="d-flex w-100">
                    {/* <div className="ui input"></div> */}
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={this.state.lastName}
                      onChange={this.handleLastName}
                      className={`${
                        this.state.lastError !== "" ? "firstError" : ""
                      }`}
                    ></input>
                    {this.state.lastError !== "" && (
                  <ErrorIcon color="secondary" className="ml-2 mt-8" />
                )}
>>>>>>> fd789835d56738787142e5a1a978cbbb555e7501
                    </div>

                    {/* {this.state.lastError} */}
                    
                   </div>
                    <div>
                    <br />
<<<<<<< HEAD
                    <div className="d-flex w-100">
                      <input
                        type="email"
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.handleEmail}
                        className={`${
                          this.state.emailError !== "" ? "firstError" : ""
                        }`}
                      ></input>
                      {this.state.emailError !== "" && (
                        <ErrorIcon color="secondary" className="ml-2 mt-8" />
                      )}
                    </div>

=======
                    <div className="d-flex form-contents6"></div>
                   <div className="d-flex w-100">
                   <label>Email Address</label>
                     {/* <div className="ui input"></div> */}
                   <input
                      type="email"
                      placeholder="E-mail"
                      value={this.state.email}
                      onChange={this.handleEmail}
                      className={`${
                        this.state.emailError !== "" ? "firstError" : ""
                      }`}
                    ></input>
                    {this.state.emailError !== "" && (
                  <ErrorIcon color="secondary" className="ml-2 mt-8" />
                )}</div>
>>>>>>> fd789835d56738787142e5a1a978cbbb555e7501
                    {/* {this.state.emailError} */}
                  </div>
                  <br />

<<<<<<< HEAD
                  <div className="d-flex form-contents1">
                    <div className="d-flex">
                      <input
                        placeholder="Mobile"
                        value={this.state.contact}
                        onChange={this.handleContact}
                        className={`${
                          this.state.contactError !== "" ? "firstError" : ""
                        }`}
                      ></input>
                      {this.state.contactError !== "" && (
                        <ErrorIcon color="secondary" className="ml-2 mt-8" />
                      )}
                    </div>

=======
                  <div className="d-flex form-contents7">
                  <label>Contact</label>
                   <div className="d-flex"> 
                   {/* <div className="ui input"></div> */}
                   <input
                      placeholder="Mobile"
                      value={this.state.contact}
                      onChange={this.handleContact}
                      className={`${
                        this.state.contactError !== "" ? "firstError" : ""
                      }`}
                    ></input>
                    {this.state.contactError !== "" && (
                  <ErrorIcon color="secondary" className="ml-2 mt-8" />
                )}
                   </div>
                   
>>>>>>> fd789835d56738787142e5a1a978cbbb555e7501
                    {/* {this.state.contactError} */}
                    <br />
                    <label>Gender</label>
                    <div className="GENDER"></div>
<<<<<<< HEAD
                    <select name="Gender" id="gender-select" onChange={this.handleGender}>
=======
                    {/* <div className="ui input"></div> */}
                    <select name="Gender" id="gender-select">
>>>>>>> fd789835d56738787142e5a1a978cbbb555e7501
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div className="d-flex form-contents2">
<<<<<<< HEAD
                    <div className="d-flex">
                      <input
                        className="form-contents5"
                        type="text-area"
                        placeholder="Address"
                        value={this.state.address}
                        onChange={this.handleAddress}
                        className={`${
                          this.state.addressError !== "" ? "firstError" : ""
                        }`}
                      ></input>
                      {this.state.addressError !== "" && (
                        <ErrorIcon color="secondary" className="ml-2 mt-8" />
                      )}
                    </div>
=======
                  <label>Address</label>
                        <div className="d-flex">
                        {/* <div className="ui input"></div> */}

                    <input
                      className="form-contents5"
                      type="text-area"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={this.handleAddress}
                      className={`${
                        this.state.addressError !== "" ? "firstError" : ""
                      }`}
                    ></input>
                     {this.state.addressError !== "" && (
                  <ErrorIcon color="secondary" className="ml-2 mt-8" />
                )}
                        </div>
>>>>>>> fd789835d56738787142e5a1a978cbbb555e7501
                    {/* {this.state.addressError} */}
                  </div>
                  <div className="submit-form">
                  <Link
                          to={{
                            pathname: `/details`,
                            // props: { hotelName: get(data, "name", "--") },
                          }}
                        >
                    <button onClick={this.handleSubmit}>Submit</button>
                        </Link>
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
const mapDispatchToProps = (dispatch) => {
  return {
    hotelDetails: bindActionCreators(hotelDetails, dispatch),
    
    
  };
};
const mapStateToProps = (state) => ({
  dateRange: get(state, "dateRange", []),
  roomRange: get(state, "roomRange", []),
  roomDetailsList: get(state, "roomDetailsList", []),
  roomTypeRatesData: get(state, "roomTypeRatesData", []),
  propertyList: get(state, "propertyList", []),
  customerDetails:get(state,"customerDetails",[])
});

export default connect(mapStateToProps,mapDispatchToProps )(Form);
