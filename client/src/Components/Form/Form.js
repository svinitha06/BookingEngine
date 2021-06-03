import React, { Component } from "react";
import "./Form.css";
import { Redirect } from "react-router-dom";
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
import { hotelDetails } from "../../actions/index";
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
      alphaError: "",
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
    if(this.state.contact===""){
      this.setState({
        alphaError:""
      })
    }
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
    const ascii = this.state.contact.charCodeAt(0)
    if (this.state.firstName === null) {
      this.setState({
        firstError: "Enter Firstname",
      });
    }
    if (this.state.lastName === null) {
      this.setState({
        lastError: "Enter Lastname",
      });
    }
    if (validator.isEmail(this.state.email)) {
      this.setState({
        emailError: "",
      });
    } else {
      this.setState({
        emailError: "Enter Valid Email-ID",
      });
    }
  
    if (this.state.address === "") {
      this.setState({
        addressError: "Enter address",
      });
    }
    if (this.state.contact.length == 10 ) {
      this.setState({
        contactError: "",
      });
    } else if((ascii < '47' || ascii > '57')){
      this.setState({
        contactError: "",
        alphaError:"No special characters"
      });
    }
    else {
      this.setState({
        contactError: "Enter 10 digits",
        alphaError:""
      });
    }
    this.getHoteldetails();
    // <Link to={{pathname:"/display"}}/>
    // this.history.push("/display");
  //  <Redirect to="/display"/>
   
  };

  getHoteldetails = async () => {
    const data = {
      guestName: this.state.firstName+this.state.lastName,
      email: this.state.email,
      mobile: this.state.contact,
      // gender: this.state.gender,
      // address: this.state.address,
    };
    this.props.hotelDetails(data);
    console.log(data, "hotelNow");
    await db.getPostHotelDetails(data);
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
                <div className="parentOfHotels">
                  <div className="childContainer">
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
                          <div className="hotelNameContainer">
                            <div className="hotelName">
                              <h2>Crown </h2>
                            </div>
                            <div className="hotelRating">3/5</div>
                            <div className="hotelLocation">
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
                  </div>
                  <div className="priceSummary">
                    <div className="priceHeading">
                      <h1>Price Summary</h1>
                    </div>
                    <div className="detailsOfPrice">
                      <div className="priceContainerOne">
                        <div>num of rroms</div>
                        <div>price</div>
                        <div>num of rroms</div>
                        <div>price</div>
                        <div>num of rroms</div>
                        <div>price</div>
                      </div>
                      <div>
                        <div className="priceContainerTwo">
                          <h2>Total : 2000</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-contents">
                  <div className="guestHeading">
                    <h1>Guest Details</h1>
                  </div>
                  <div className="d-flex form-contents1">
<<<<<<< HEAD
                    <label>First Name</label>
                    <div className="d-flex w-100">
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
                    <div>
                    <p className="ad-first">{this.state.firstError}</p>
                    </div>
                   
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
                        <div  >
                    <p className="ad-second">{this.state.lastError}</p>
                    </div>
                    </div>

                    {/* {this.state.lastError} */}
                  </div>
                  
                  <br />

                 
                  <div>
                    <br />
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
                      )}
                      <div  >
                    <p className="ad-third">{this.state.emailError}</p>
                    </div>
=======
                    <div className="firstName">
                      <label>First Name</label>
                      <div className="d-flex w-100">
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
                    </div>
                    <div className="lastName">
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
                      </div>
                    </div>
                    {/* <p className="ad-first">{this.state.firstError}</p> */}

                    {/* {this.state.lastError} */}
                  </div>
                  <div>
                    <br />

                    <div
                      className="d-flex w-100"
                      className="d-flex form-contents6"
                    >
                      <div className="email">
                        <label>Email Address</label>
                      </div>
                      {/* <div className="ui input"></div> */}
                      <div>
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
>>>>>>> 09eeded8cbedd6f4c3eedb12a741a29e6c818a37
                    </div>
                    {/* {this.state.emailError} */}
                  </div>
                 
                  <div className="d-flex form-contents7">
<<<<<<< HEAD
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
                      {this.state.alphaError !== "" && (
                        <ErrorIcon color="secondary" className="ml-2 mt-8" />
                      )}
                       <div  >
                    <p className="ad-4">{this.state.contactError}</p>
                    <p className="ad-al">{this.state.alphaError}</p>
                    </div>
=======
                    <div className="contact">
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
>>>>>>> 09eeded8cbedd6f4c3eedb12a741a29e6c818a37
                    </div>

                    {/* {this.state.contactError} */}
                    <br />
<<<<<<< HEAD
                    <label>Gender</label>
                    <div className="GENDER"></div>
                    <select
                      name="Gender"
                      id="gender-select"
                      onChange={this.handleGender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div className="d-flex form-contents2">
                    <label>Address</label>
=======
                    <div className="gender">
                      <label>Gender</label>
                      <div className="GENDER"></div>
                      {/* <div className="ui input"></div> */}
                      <select name="Gender" id="gender-select">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex form-contents2 Address">
                    <div>
                      <label>Address</label>
                    </div>
>>>>>>> 09eeded8cbedd6f4c3eedb12a741a29e6c818a37
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
<<<<<<< HEAD
                      <div  >
                    <p className="ad-5">{this.state.addressError}</p>
                    </div>
=======
>>>>>>> 09eeded8cbedd6f4c3eedb12a741a29e6c818a37
                    </div>
                    {/* {this.state.addressError} */}
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
  customerDetails: get(state, "customerDetails", []),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
