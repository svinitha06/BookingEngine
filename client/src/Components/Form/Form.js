import React, { Component } from "react";
import "./Form.css";
import { get } from "lodash";
import { connect } from "react-redux";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
import validator from "validator";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import HotelDetail from "./HotelDetail";
import ErrorIcon from "@material-ui/icons/Error";
import Image from "../Form/Image.jpeg";

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
                  <div className="d-flex form-contents1">
                    {/* <label>First Name</label> */}
                    <div className="d-flex w-100">
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
                    </div>

                    {/* {this.state.lastError} */}
                    <br />
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

                    {/* {this.state.emailError} */}
                  </div>
                  <br />

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

                    {/* {this.state.contactError} */}
                    <br />
                    <div className="GENDER"></div>
                    <select name="Gender" id="gender-select">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div className="d-flex form-contents2">
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
const mapStateToProps = (state) => ({
  dateRange: get(state, "dateRange", []),
  roomRange: get(state, "roomRange", []),
  roomDetailsList: get(state, "roomDetailsList", []),
  roomTypeRatesData: get(state, "roomTypeRatesData", []),
  propertyList: get(state, "propertyList", []),
});

export default connect(mapStateToProps, null)(Form);
