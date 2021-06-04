import React, { Component } from "react";
import "./Form2.css";
import Modal from "@material-ui/core/Modal";
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
      goBackTo: this.props.navigation,
    };
  }
  componentDidMount() {
    this.setState({
      start: this.props.dateRange.start,
      end: this.props.dateRange.end,
     
    });
    console.log("this.props from form", this.props);
    console.log("goback", this.state.go);
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
    const ascii = this.state.contact.charCodeAt(0);
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
    if (this.state.contact.length == 10) {
      this.setState({
        contactError: "",
      });
    } else if (ascii < "47" || ascii > "57") {
      this.setState({
        contactError: "",
        alphaError: "No special characters",
      });
    } else {
      this.setState({
        contactError: "Enter 10 digits",
        alphaError: "",
      });
    }
    if(this.state.firstName !== null && this.state.lastName !== null && validator.isEmail(this.state.email) && this.state.address !== "" && this.state.contact.length == 10){
    this.setState({
      open:true
    })
    this.getHoteldetails();

  }
    // <Link to={{pathname:"/display"}}/>
    // this.history.push("/display");
  };
  getHoteldetails = async () => {
    // var hotelName;
    // this.props.propertyList.map((data)=>{
    //   // if(data.PropertyId === this.props.booking[0].propertyId){
    //    hotelName=data.name
    //   // }
console.log(this.props.propertyList,"checkHotel")
// })
    
    const data = {
      guestName: this.state.firstName + this.state.lastName,
      email: this.state.email,
      mobile: this.state.contact,
    //  hotelNow: hotelName,
      address: this.state.address,
    };
  
    
    this.props.hotelDetails(data);
    console.log(data, "hotelNow");
    await db.getPostHotelDetails(data);
  };

  handleClose = () => {
    // this.setState({
    //   open:false,
     
    // })
    // this.history.push("/")
    this.props.history.push("/") 
    
  }
  handleBook=()=>{
   

 this.setState({
      open:false,
     bookNowMsg:"Booking has been made"
})
  }
  // handlePost=()=>{
  // }
  render() {
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    return (
      <div className="container-form">
        <div className="form">
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
                        {/* <div>
                          <button onClick={this.handleHotel}>
                            <KeyboardArrowDownIcon />
                          </button>
                        </div> */}
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
                            <h3>Check-in Date </h3>

                            {/* {this.props.dateRange &&
                              this.props.dateRange.start.toString()} */}
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
                {/* New Form Here Don't DEL */}
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
                              placeholder="First Name"
                              value={this.state.firstName}
                              onChange={this.handleFirstName}
                              className={`${
                                this.state.firstError !== "" ? "firstError" : ""
                              }`}
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
                              placeholder="Last Name"
                              value={this.state.lastName}
                              onChange={this.handleLastName}
                              className={`${
                                this.state.lastError !== "" ? "firstError" : ""
                              }`}
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
                              placeholder="Mobile"
                              value={this.state.contact}
                              onChange={this.handleContact}
                              className={`${
                                this.state.contactError ||
                                this.state.alphaError !== ""
                                  ? "firstError"
                                  : ""
                              }`}
                            ></input>
                            {this.state.contactError !== "" && (
                              <ErrorIcon
                                color="secondary"
                                className="ml-2 mt-8"
                              />
                            )}
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
                              placeholder="E-mail"
                              value={this.state.email}
                              onChange={this.handleEmail}
                              className={`${
                                this.state.emailError !== "" ? "firstError" : ""
                              }`}
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
                        <div className="firstInput">
                          <div
                          // className="d-flex"
                          >
                            <div className="d-flex">
                              {/* <div className="ui input"></div> */}
                              <input
                                className="form-contents5"
                                type="text-area"
                                placeholder="Address"
                                value={this.state.address}
                                onChange={this.handleAddress}
                                className={`${
                                  this.state.addressError !== ""
                                    ? "firstError"
                                    : ""
                                }`}
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
                    <Button className="submit-form"
                      as={NavLink}
                      to={"/basiclayout/1"}>
                      Back
                    </Button>
                      
                    {/* </div> */}
                    <button onClick={this.handleSubmit}>Book Now</button>
                    {this.state.open && (
                      <Modal
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                      >
                        <div className="modal-open">
                          {console.log(this.props)}
                          <div className="contents-modal">
                            <h1>Hello {this.state.firstName}</h1>
                            <h4 className="head-confirm">
                              Booking Confirmed !!
                            </h4>
                          </div>

                          <div className="bookNow">
                            <Link as={NavLink} to="/">
                              <button onClick={this.handlePost}>
                                Back to Home
                              </button>
                            </Link>
                          </div>
                          {/* onClick={this.handleClose */}
                        </div>
                      </Modal>
                    )}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));
