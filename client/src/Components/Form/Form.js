import React, { Component } from "react";
import "./Form2.css";
import Modal from "@material-ui/core/Modal";
import { Redirect } from "react-router-dom";
import { get, split } from "lodash";
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
import modalBell from "../../asset/modalBell.gif";
import ImageSlogan from "./slogan.png";
import ImageTwo from "./NewImage.png";
import { ObjectID } from "bson";
export class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.customerDetails
        ? split(this.props.customerDetails.guestName, " ")[0]
        : "",
      lastName: this.props.customerDetails
        ? split(this.props.customerDetails.guestName, " ")[1]
        : "",
      email: "",
      gender: "male",
      address: this.props.customerDetails
        ? this.props.customerDetails.address
        : "",
      firstError: "",
      lastError: "",
      emailError: "",
      contactError: "",
      addressError: "",
      alphaError: "",
      hotelFlag: true,
      goBackTo: this.props.navigation,
      checkInDate: "",
      checkOutDate: "",
      proId: 0,
      thePrice: this.props.finalTotalPrice,
      errorPost: false,
      open: false,
      openPost: false,
      errorPostOffline: false,
      openOffline: false,
    };
    console.log(
      this.props.customerDetails ? this.props.customerDetails.guestName : "",
      "find"
    );
  }
  componentDidMount() {
    if (true) {
      window.scroll(0, 0);
    }
    if (this.props.roomDetailsList.length === 0) {
      this.props.history.push("/");

      this.setState({
        start: this.props.dateRange.start,
        end: this.props.dateRange.end,
      });
      if (get(this.props.customerDetails, "guestName", " ")) {
        this.setState({
          firstName: split(this.props.customerDetails.guestName, " ")[0],
          lastName: split(this.props.customerDetails.guestName, " ")[1],
          email: this.props.customerDetails.email,
          contact: this.props.customerDetails.mobile,
          address: this.props.customerDetails.address,
        });
      }
    }
    this.getHoteldetails();

    console.log(this.getHoteldetails(), "223");
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
      alphaError: "",
    });
    if (this.state.contact === "") {
      this.setState({
        alphaError: "",
      });
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
    const ascii = this.state.contact ? this.state.contact.charCodeAt(0) : "";
    console.log(this.state, "123");
    if (
      this.state.firstName === null ||
      this.state.firstName === undefined ||
      this.state.firstName === ""
    ) {
      this.setState({
        firstError: "Enter Firstname",
      });
    }
    if (
      this.state.lastName === null ||
      this.state.lastName === undefined ||
      this.state.firstName === ""
    ) {
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

    if (
      this.state.address === null ||
      this.state.address === undefined ||
      this.state.address === ""
    ) {
      this.setState({
        addressError: "Enter address",
      });
    }
    if (this.state.contact && this.state.contact.length == 10) {
      this.setState({
        contactError: "",
      });
    } else if (
      ascii < "47" ||
      ascii > "57" ||
      this.state.contact === null ||
      this.state.contact === undefined ||
      this.state.contact === ""
    ) {
      this.setState({
        contactError: "",
        alphaError: "Enter 10 digits",
      });
    } else {
      this.setState({
        contactError: "Enter 10 digits",
        alphaError: "",
      });
    }
    if (
      this.state.firstName !== null &&
      this.state.lastName !== null &&
      validator.isEmail(this.state.email) &&
      this.state.address !== "" &&
      this.state.contact.length == 10 &&
      !this.state.errorPost
    ) {
      this.setState({
        open: true,
      });
      this.props.history.push("/payment");
      this.getHoteldetails();
    }
  };
  getHoteldetails = async () => {
    var hotelName;
    this.props.propertyList.map((data) => {
      if (data.PropertyId === this.props.booking[0].propertyId) {
        hotelName = data.name;
      }
    });
    var detailsObj = [];
    this.props.booking.map((items) => {
      if (items.count > 0) {
        console.log("count greter than 0 for = ", items.roomType);
        detailsObj.push(items);
        console.log("details Obj for >0 = ", detailsObj);
      }
      // console.log("details Obj for >0 = ", detailsObj);
    });
    const data = {
      guestName: this.state.firstName + " " + this.state.lastName,
      email: this.state.email,
      mobile: this.state.contact,
      hotelNow: hotelName,
      address: this.state.address,
      checkIn: this.state.checkInDate,
      checkOut: this.state.checkOutDate,
      detailsOfRooms: detailsObj,
      bookedDate: new Date().toLocaleDateString(),
      bookingId: new ObjectID(),
    };

    this.props.hotelDetails(data);
    console.log(data, "hotelNow");
  };

  handleClose = () => {
    this.props.history.push("/");
  };
  handleBook = () => {
    this.setState({
      open: false,
      bookNowMsg: "Booking has been made",
    });
  };

  handleDateParts = (d) => {
    const formattedDate = {
      date: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    };
    return `${formattedDate.date}-${formattedDate.month}-${formattedDate.year}`;
  };
  handleBack = () => {
    this.props.hotelDetails([]);
  };
  handlePostClose = () => {
    this.setState({
      openPost: false,
    });
  };
  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial, Helvetica, sans-serif",
      textAlign: "center",
    };
    // this.setState({ proId: this.props.booking[0].propertyId });
    console.log("Booking Prop", this.props.booking);
    console.log(this.props, "demo");
    console.log("propertyList prop ", this.props.propertyList);
    // console.log("booking in render =", this.props.booking);
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    if (!navigator.onLine)
      return <h1 style={mystyle}>Network Error. Check your connection</h1>;

    this.state.checkInDate = this.handleDateParts(this.props.dateRange.start);
    this.state.checkOutDate = this.handleDateParts(this.props.dateRange.end);

    return (
      <div className="container-form">
        <div className="form">
          <div>
            <div></div>
            <div className="form-design">
              <form>
                <div className="pageHeading">
                  <h1>Book your Room</h1>
                </div>
                <div className="parentOfHotels">
                  <div className="newGuestDetail">
                    <div className="guestDetailsHeading">
                      <h1>Guest Details</h1>
                    </div>
                    <div className="guestDetailForm">
                      <div className="detailContainer">
                        <div className="fieldAndInputFirst">
                          <div>
                            <label>First Name</label>
                          </div>
                          <div className="firstInput">
                            <div className="d-flex ">
                              <input
                                type="text"
                                value={this.state.firstName}
                                onChange={this.handleFirstName}
                                className={`${
                                  this.state.firstError !== ""
                                    ? "firstError"
                                    : ""
                                }`}
                                placeholder="Enter First Name"
                              ></input>
                              {this.state.firstError !== "" && (
                                <ErrorIcon
                                  color="secondary"
                                  className="ml-2 mt-8"
                                />
                              )}
                            </div>
                            {/* <div>
                            <p className="ad-first">{this.state.firstError}</p>
                          </div> */}
                          </div>
                        </div>
                        <div className="fieldAndInput">
                          <div>
                            <label>Last Name</label>
                          </div>
                          <div className="firstInput">
                            {/* <input type="text"></input> */}
                            <div>
                              <input
                                type="text"
                                value={this.state.lastName}
                                onChange={this.handleLastName}
                                className={`${
                                  this.state.lastError !== ""
                                    ? "firstError"
                                    : ""
                                }`}
                                placeholder="Enter Last Name"
                              ></input>
                              {this.state.lastError !== "" && (
                                <ErrorIcon
                                  color="secondary"
                                  className="ml-2 mt-8"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="fieldAndInput">
                          <div>
                            <label>Contact </label>
                          </div>
                          <div className="firstInput">
                            {/* <input type="text"></input> */}
                            <div className="d-flex">
                              {/* <div className="ui input"></div> */}
                              <input
                                value={this.state.contact}
                                onChange={this.handleContact}
                                className={`${
                                  this.state.contactError ||
                                  this.state.alphaError !== ""
                                    ? "firstError"
                                    : ""
                                }`}
                                placeholder="10 Digits Only"
                              ></input>
                              {this.state.contactError !== "" && (
                                <ErrorIcon
                                  color="secondary"
                                  className="ml-2 mt-8"
                                />
                              )}
                              {/* {this.state.alphaError} */}
                              {this.state.alphaError !== "" && (
                                <ErrorIcon
                                  color="secondary"
                                  className="ml-2 mt-8"
                                />
                              )}
                              {/* <div>
                              <p className="ad-4">{this.state.contactError}</p>
                              <p className="ad-al">{this.state.alphaError}</p>
                            </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="fieldAndInput">
                          <div>
                            <label>Email </label>
                          </div>
                          <div className="firstInput">
                            {/* <input type="text"></input> */}
                            <div className="d-flex ">
                              {/* <div className="ui input"></div> */}
                              <input
                                type="email"
                                value={this.state.email}
                                onChange={this.handleEmail}
                                className={`${
                                  this.state.emailError !== ""
                                    ? "firstError"
                                    : ""
                                }`}
                                placeholder="abc@y.com"
                              ></input>
                              {this.state.emailError !== "" && (
                                <ErrorIcon
                                  color="secondary"
                                  className="ml-2 mt-8"
                                />
                              )}
                              {/* <div>
                              <p className="ad-third">
                                {this.state.emailError}
                              </p>
                            </div> */}
                            </div>
                          </div>
                        </div>
                        <div className="fieldAndInput">
                          <div>
                            <label>Address</label>
                          </div>
                          <div className="firstInput-Address">
                            <div className="addressDiv">
                              <div className="d-flex">
                                {/* <div className="ui input"></div> */}
                                <input
                                  className="form-contents5"
                                  type="text-area"
                                  // rows="3"
                                  value={this.state.address}
                                  onChange={this.handleAddress}
                                  className={`${
                                    this.state.addressError !== ""
                                      ? "firstError"
                                      : ""
                                  }`}
                                  placeholder="Enter Address"
                                ></input>
                                {this.state.addressError !== "" && (
                                  <ErrorIcon
                                    color="secondary"
                                    className="ml-2 mt-8"
                                  />
                                )}
                                {/* <div>
                                <p className="ad-5">
                                  {this.state.addressError}
                                </p>
                              </div> */}
                              </div>
                              {/* {this.state.addressError} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="submit-form">
                      {/* <div className="backButton"> */}
                      <Button
                        className="submit-form"
                        as={NavLink}
                        to={`basiclayout/${this.props.booking[0].propertyId}`}
                        onClick={this.handleBack}
                      >
                        Back
                      </Button>
                      {/* </div> */}
                      <button onClick={this.handleSubmit}>Pay Now</button>
                      {this.state.errorPost && (
                        <Modal
                          open={this.state.openPost}
                          onClose={this.handlePostClose}
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                        >
                          <div className="errorPostFetch">
                            <p
                              className="cancelPost"
                              onClick={this.handlePostClose}
                            >
                              X
                            </p>

                            <h1>Error fetching data </h1>
                            <p style={{ marginLeft: "15%" }}>
                              Something went wrong. Please wait.
                            </p>
                          </div>
                        </Modal>
                      )}
                    </div>
                    <div className="formMsgTwo">
                      <img src={ImageTwo}></img>
                    </div>
                  </div>

                  <div className="hotelAndPrice">
                    <div className="childContainer">
                      <div className="hotel-Details">
                        <div className="hotelHeading">
                          <h1>Hotel Details</h1>
                        </div>

                        <div className="hotelDetailContainer">
                          <div className="firstContainer">
                            {this.props.propertyList.map((data, i) => {
                              if (
                                data.PropertyId ===
                                this.props.booking[0].propertyId
                              ) {
                                var nameOfHotel = data.name;
                                var address = data.Address;
                                var imageHotel = data.Image[0];
                                return (
                                  <div className="insideReturn">
                                    <div className="hotelImage">
                                      <img src={imageHotel}></img>
                                    </div>
                                    <div className="hotelNameContainer">
                                      <div>
                                        <div className="hotelName">
                                          <h2>{nameOfHotel}</h2>
                                        </div>
                                        <div className="hotelLocation">
                                          <h5>{address}</h5>
                                        </div>
                                      </div>
                                      <div className="secondContainer">
                                        <div className="checkDate">
                                          <h3>Check-in Date </h3>
                                          <p>{this.state.checkInDate}</p>
                                        </div>
                                        <div className="checkDate">
                                          <h3>Check-out Date</h3>
                                          <p>{this.state.checkOutDate}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            })}
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
                          <div className="priceLabel">
                            <div>
                              <h3>Room Type</h3>
                            </div>
                            <div>
                              <h3>Rooms</h3>
                            </div>
                            <div>
                              <h3>Food</h3>
                            </div>
                            <div>
                              <h3>Price </h3>
                            </div>
                          </div>

                          {this.props.booking.map((data, index) => {
                            var roomName;
                            var price;
                            var food;
                            var foodValue;
                            var roomCount;
                            if (data.count > 0) {
                              roomName = data.roomType;
                              price = data.priceO;
                              food = data.isChecked;
                              roomCount = data.count;

                              foodValue = "";
                              if (food === true) {
                                foodValue = "Yes";
                              } else foodValue = "No";

                              return (
                                <div className="priceDetailsContainer">
                                  <div>{roomName}</div>
                                  <div>{roomCount}</div>
                                  <div>{foodValue}</div>
                                  <div>{price}</div>
                                </div>
                              );
                            }
                          })}
                          <div className="priceDetailsContainerOne">
                            <div style={{ color: "green", fontWeight: "600" }}>
                              Amount
                            </div>
                            <div></div>
                            <div></div>

                            <div>{this.state.thePrice}</div>
                          </div>
                          <div className="priceDetailsContainerTwo">
                            <div style={{ color: "blue", fontWeight: "600" }}>
                              GST (18%)
                            </div>
                            <div></div>
                            <div></div>
                            <div>{this.state.thePrice * 0.18}</div>
                          </div>
                          <div className="priceDetailsContainerTwo">
                            <div style={{ color: "red", fontWeight: "600" }}>
                              Discount (15%)
                            </div>
                            <div></div>
                            <div></div>
                            <div>{this.state.thePrice * 0.15}</div>
                          </div>
                        </div>
                        <div>
                          <div className="priceContainerTwo">
                            <p className="needSpace">TOTAL PAY</p>
                            <p
                              clasName="totalPayColor"
                              style={{ marginLeft: "52%" }}
                            >
                              {this.state.thePrice +
                                this.state.thePrice * 0.18 -
                                this.state.thePrice * 0.15}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
  dateRange: state.dateRange,
  roomRange: get(state, "roomRange", []),
  roomDetailsList: get(state, "roomDetailsList", []),
  roomTypeRatesData: get(state, "roomTypeRatesData", []),
  propertyList: get(state, "propertyList", []),
  customerDetails: get(state, "customerDetails", []),
  booking: get(state, "bookedRoomDetails.bookingData", []),
  finalTotalPrice: get(state, "totalPriceInState.Amount", []),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));
