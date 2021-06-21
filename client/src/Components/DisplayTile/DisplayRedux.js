// import React from 'react'
// import { connect } from "react-redux";
// import { Route, Redirect } from "react-router-dom";

// const RefreshRoute = ({ component: DisplayRedux, isDataAvailable }) => (
//   <Route

//     render={props =>
//       isDataAvailable ? (
//         <DisplayRedux />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/"
//           }}
//         />
//       )
//     }
//   />
// );

// const mapStateToProps = state => ({
//   isDataAvailable: state.reducer.isDataAvailable
// });

// export default connect(mapStateToProps)(RefreshRoute);

import React, { Component } from "react";
import axios from "axios";
import { get } from "lodash";
import "./DisplayTile.css";
import WifiRoundedIcon from "@material-ui/icons/WifiRounded";
import FreeBreakfastRoundedIcon from "@material-ui/icons/FreeBreakfastRounded";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { roomDetails } from "../../actions";

import { Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { AlignBottom } from "react-bootstrap-icons";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Slide from "react-reveal/Slide";
import {
  date,
  property,
  room,
  roomTypesRate,
  bookingDetails,
  additionOfPrices,
  hotelDetails,
} from "../../actions/index";

class DisplayRedux extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      countObj: [],
      error: false,
      listOfAP: [],
      // rateObj: []
      totalPrice: 0,
      totalPriceTwo: 0,
      priceFinal: 0,
      priceArray: [],
      finalTotalPrice: 0,
      isDisable: true,
      // numOfDays:0,
    };
  }

  componentDidMount() {
    if (true) {
      window.scroll(0, 0);
    }
    if (this.props.propertyList.length === 0) {
      this.props.history.push("/");
    }
    var env = process.env.NODE_ENV || "development";
    var host =
      env === "development"
        ? "http://07acc3938a1f.ngrok.io"
        : "http://9a9e6e820483.ngrok.io";
    axios
      .get(`${host}/rooms/getRoomType/${this.props.match.params.id}`)
      .then((responseOfApi) => {
        this.props.roomDetails(responseOfApi.data);
        this.setState({
          list: this.props.roomDetailsList,
        });
        var countObj = this.state.list.map((data) => {
          return {
            id: data._id,
            propertyId: data.PropertyId,
            count: 0,
            isChecked: false,
            priceO: 0,
            roomType: data.roomType,
            available: data.availability,
          };
        });
        this.setState({ countObj: countObj });
      })
      .catch((error) => {
        this.setState({ error: !this.state.error });
      });
    this.getSomething(this.props.match.params.id);
  }
  getSomething = async (id) => {
    var env = process.env.NODE_ENV || "development";
    var host =
      env === "development"
        ? "http://07acc3938a1f.ngrok.io"
        : "http://9a9e6e820483.ngrok.io";
    let res = await axios({
      method: "get",
      url: `${host}/rate/getplan`,
      headers: {
        "Content-Type": "application/json",
        propertyId: this.props.match.params.id,
        checkInDate: this.props.dateRange.start,
      },
    })
      .then((result) => {
        this.props.roomTypesRate(result.data);
        this.setState({
          listOfAP: result.data,
        });
        console.log("list", this.state.list);
      })
      .catch((e) => {
        console.log("error logging data", e);
      });
  };
  handleMinus = (id) => {
    var count = this.state.countObj;
    count.forEach((data) => {
      if (data.id === id && data.count > 0) {
        data.count -= 1;
      }
    });
    this.setState({ countObj: count });
    this.checkEnable();
    this.props.bookingDetails({
      bookingData: this.state.countObj,
    });
  };
  handlePlus = (id) => {
    var count = this.state.countObj;
    count.forEach((data) => {
      if (data.id === id && data.count < data.available) {
        data.count += 1;
      }
    });
    this.setState({
      countObj: count,
    });
    this.checkEnable();
    this.props.bookingDetails({
      bookingData: this.state.countObj,
    });
  };
  calculateTotal = () => {
    var count = this.state.countObj;
    let rateObj = this.state.listOfAP;
    let t = 0;
    count.forEach((data) => {
      rateObj.forEach((rate) => {
        if (rate.roomTypeId === data.id) {
          if (!data.isChecked) t += rate.plan.EP * data.count;
          else t += rate.plan.AP * data.count;
        }
      });
    });
    t = t * this.props.dateRange.numOfDay;
    return t;
  };
  handleChange = (id) => {
    var count = this.state.countObj;
    count.forEach((data) => {
      if (data.id === id) {
        data.isChecked = !data.isChecked;
      }
    });
    this.setState({ countObj: count });
  };
  handleReserve = () => {
    let theTotal = this.calculateTotal();
    // theTotal = theTotal + theTotal * 0.03;
    console.log("theTotal = ", theTotal);
    this.props.additionOfPrices({ Amount: theTotal });

    if (theTotal <= 0) {
      // alert("Please select a Room!");
      return true;
    }
    return false;
  };
  checkEnable = () => {
    var temp = this.calculateTotal();

    if (temp > 0 && this.state.isDisable === true) {
      this.setState({
        isDisable: !this.state.isDisable,
      });
    } else if (temp === 0 && this.state.isDisable === false) {
      this.setState({
        isDisable: !this.state.isDisable,
      });
    }
    return this.state.isDisable;
  };

  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial, Helvetica, sans-serif",
      textAlign: "center",
    };
    let total = this.calculateTotal();

    var propertyName = "";
    if (!navigator.onLine) return <h1>Network Error. Check your connection</h1>;
    if (this.state.error) return <h1 style={mystyle}>Error Fetching data</h1>;
    // if (window.performance) {
    //   console.info("window.performance works fine on this browser");
    // }
    // console.info(performance.navigation.type);
    // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    //   console.info("This page is reloaded");
    //   alert("page reloaded");
    // } else {
    //   console.info("This page is not reloaded");
    // }
    //     if(window.location.reload)  {this.props.history.push("/")
    // }

    return (
      <div className="displayOne">
        {this.props.propertyList.forEach((data) => {
          if (data.PropertyId == this.props.match.params.id) {
            propertyName = data.name;
          }
        })}
        <div>
          <div className="for-effect">
            <Slide left cascade>
              <div className="property-center">
                <h1>{propertyName}</h1>
                <Slide bottom cascade>
                  <div>
                    <h3>Welcomes you</h3>
                  </div>
                </Slide>
              </div>

              <div className="displayContentTwo">
                {this.state.list.map((post, index) => {
                  let room = 0;

                  let isCheck = false;

                  var price = 0;
                  var finalPrice = 0;
                  var finalEP = 0;
                  var finalAP = 0;
                  var count = this.state.countObj;
                  var rateObj2 = this.state.listOfAP;
                  rateObj2.forEach((i) => {
                    if (i.roomTypeId === post._id) {
                      finalAP = i.plan.AP;
                      finalEP = i.plan.EP;
                    }
                  });
                  count.forEach((data) => {
                    if (data.id === post._id) room = data.count;
                  });
                  count.forEach((data) => {
                    if (data.id === post._id) {
                      isCheck = data.isChecked;
                      if (isCheck == true) {
                        finalPrice = finalAP;
                      } else {
                        finalPrice = finalEP;
                      }
                    }
                  });

                  if (room > 0) price = finalPrice * room;

                  count.forEach((data) => {
                    if (data.id === post._id) data.priceO = price;
                  });
                  return (
                    <div
                      key={index}
                      className="homeContainerOne"
                      id={post.roomType}
                    >
                      <div className="wrapperOne">
                        <div>
                          <img
                            className="ImageTileOne"
                            src={post.roomImage}
                          ></img>
                        </div>
                        <div className="textInside">
                          <div>
                            <div className="rate-name">
                              <div>
                                <div className="roomtypeHead">
                                  <p style={{ marginTop: "6px" }}>
                                    {post.roomType}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <div className="rate-container">
                                  <span>
                                    <h2>₹ {finalPrice}</h2>
                                  </span>
                                  <h5>per Day/Night</h5>
                                </div>

                                <div className="availableRoooms">
                                  <label>Available Rooms : </label>
                                  <span>{post.availability}</span>
                                </div>
                              </div>
                            </div>
                            <p className="roomDescOne">
                              {post.description} <i className="fas fa-plus"></i>
                            </p>
                          </div>
                          <div className="displayDivide">
                            <div>
                              <div className="facilities">
                                <div>
                                  <span>
                                    <WifiRoundedIcon
                                      className="icon"
                                      style={{ color: "#6D6B68" }}
                                    ></WifiRoundedIcon>
                                  </span>
                                  <span>
                                    <p className="icon-p">Free-Wifi</p>
                                  </span>
                                </div>

                                <div>
                                  <CheckCircleSharpIcon
                                    className="icon"
                                    style={{ color: "#0E8C11" }}
                                  ></CheckCircleSharpIcon>
                                  <p className="icon-p">Sanitized</p>
                                </div>
                                <div>
                                  <FreeBreakfastRoundedIcon
                                    className="icon"
                                    style={{ color: "#DE7A34" }}
                                  ></FreeBreakfastRoundedIcon>{" "}
                                  <p className="icon-p">Free Breakfast</p>
                                </div>
                                <div className="price-margin">
                                  <h3>Price : {price}</h3>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="button-price">
                                <div className="inside-button-price">
                                  <button
                                    className="thebutton"
                                    onClick={() => this.handleMinus(post._id)}
                                  >
                                    <RemoveIcon />
                                  </button>

                                  <h3 className="buttonPrice">{room}</h3>

                                  <button
                                    className="thebutton"
                                    onClick={() => this.handlePlus(post._id)}
                                  >
                                    <AddIcon />
                                  </button>
                                </div>

                                <div className="include-food">
                                  <label>
                                    Include Food :
                                    <input
                                      type="checkbox"
                                      id="isCheck"
                                      onChange={() =>
                                        this.handleChange(post._id)
                                      }
                                      checked={isCheck}
                                    ></input>
                                  </label>
                                </div>
                                <div>
                                  <div className="roomdiv">
                                    <h3>Rooms : {room}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="lastDiv">
                <div className="total-price">
                  <h3>
                    <span>
                      Total Price:
                      {total}
                    </span>
                  </h3>
                </div>
                <div className="btn-placement">
                  <div>
                    <Button className="reserve-left" as={NavLink} to="/">
                      Go Back
                    </Button>
                  </div>
                  <Button
                    className="reserve"
                    // class="ui inverted green button"
                    disabled={this.state.isDisable}
                    onClick={this.handleReserve}
                    to="/form"
                    as={NavLink}
                  >
                    Reserve
                  </Button>
                </div>
              </div>
            </Slide>
          </div>
        </div>
      </div>
    );
  }
}
if (location.reload === true) {
}
const mapDispatchToProps = (dispatch) => {
  return {
    roomDetails: bindActionCreators(roomDetails, dispatch),
    roomTypesRate: bindActionCreators(roomTypesRate, dispatch),
    bookingDetails: bindActionCreators(bookingDetails, dispatch),
    date: bindActionCreators(date, dispatch),
    room: bindActionCreators(room, dispatch),
    property: bindActionCreators(property, dispatch),
    additionOfPrices: bindActionCreators(additionOfPrices, dispatch),
    hotelDetails: bindActionCreators(hotelDetails, dispatch),
  };
};
const mapStateToProps = (state) => {
  return {
    roomDetailsList: get(state, "roomDetailsList", []),
    roomTypeRatesData: get(state, "roomTypeRatesData", []),
    propertyList: get(state, "propertyList", []),
    bookingDetails: get(state, "bookingDetails", []),
    dateRange: get(state, "dateRange", []),
    additionOfPrices: get(state, "additionOfPrices", []),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DisplayRedux));
