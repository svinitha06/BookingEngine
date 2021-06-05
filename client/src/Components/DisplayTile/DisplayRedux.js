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
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Slide from "react-reveal/Slide";
import {
  date,
  property,
  room,
  propRoomType,
  roomTypesRate,
  bookingDetails,
  additionOfPrices,
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
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/rooms/getRoomType/${this.props.match.params.id}`
      )
      .then((responseOfApi) => {
        // sudoProp = this.props.match.params.id;
        this.props.roomDetails(responseOfApi.data);
        this.setState({
          // list: responseOfApi.data,
          list: this.props.roomDetailsList,
        });
        // console.log("this.props.state", this.props);
        var countObj = this.state.list.map((data) => {
          return {
            id: data._id,
            propertyId: data.PropertyId,
            count: 0,
            isChecked: false,
            priceO: 0,
            roomType: data.roomType,
          };
        });
        this.setState({ countObj: countObj });
      })
      .catch((error) => {
        // console.log("Error gtting data", error);
        <h1>Error fetching data</h1>;
        this.setState({ error: !this.state.error });
      });
    this.getSomething(this.props.match.params.id);
  }
  getSomething = async (id) => {
    let res = await axios({
      method: "get",
      url: `http://localhost:5000/rate/getplan`,
      headers: {
        "Content-Type": "application/json",
        // "x-access-token": sessionStorage.getItem("token"),
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
    // return res;
  };
  handleMinus = (id) => {
    var count = this.state.countObj;
    // let rateObj = this.state.listOfAP;
    // let t = this.state.totalPrice;

    count.forEach((data) => {
      if (data.id === id && data.count > 0) {
        data.count -= 1;
      }
    });
    this.setState({ countObj: count });
    this.checkEnable();
    this.props.hotelDetails({
      bookingData: this.state.countObj,
    });
    // console.log(
    //   "value of isDisable from caal in handleminus = ",
    //   this.checkEnable()
    // );
    console.log("countObj price inside Handle minus = ", this.state.countObj);
    console.log("list of rooms  inside Handle minus= ", this.state.list);
    console.log(
      "this.props.hotelDetails inside Handleminus = ",
      this.props.hotelDetails
    );
  };
  handlePlus = (id) => {
    var count = this.state.countObj;
    // let rateObj = this.state.listOfAP;
    // console.log("count obj inside of handle plus = ", count);
    count.forEach((data) => {
      if (data.id === id) {
        data.count += 1;
      }
    });
    // console.log("p = ", p);

    this.setState({
      countObj: count,
      // finalTotalPrice:
    });
    this.checkEnable();
    this.props.bookingDetails({
      bookingData: this.state.countObj,
    });
    console.log("countObj price inside Handle PLus = ", this.state.countObj);
    console.log("list of rooms  inside Handle PLus= ", this.state.list);
    console.log(
      "this.props.hotelDetails inside HandlePLus = ",
      this.props.bookingDetails
    );
  };
  calculateTotal = () => {
    var count = this.state.countObj;
    let rateObj = this.state.listOfAP;
    let t = 0;
    var p = 0;
    // console.log("value of BEFORE t inside handlePlus", t);
    // console.log("count obj inside of handle plus = ", count);
    count.forEach((data) => {
      // console.log("count inside handlePlus = ", data.count);
      rateObj.forEach((rate) => {
        if (rate.roomTypeId === data.id) {
          if (!data.isChecked) t += rate.plan.EP * data.count;
          else t += rate.plan.AP * data.count;
        }
      });
      // console.log("value of After t inside handlePlus", t);
      // }
    });
    // console.log("p = ", p);
    console.log("countObj price inside caculateTotal = ", this.state.countObj);
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
    this.props.additionOfPrices({ Amount: theTotal });

    if (theTotal <= 0) {
      alert("Please select a Room!");
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
    var ap = 0,
      ep = 0;
    // console.log("THE PROP VALUE + ", this.props);
    if (this.state.error) return <h1 style={mystyle}>Error Fetching data</h1>;
    // let propertyName = "";
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
                  let total = 0;
                  let i = 0;
                  let isCheck = false;
                  let p = 0;
                  var rate1 = 0;
                  var k = 0;
                  var price = 0;
                  var finalPrice = 0;
                  var finalEP = 0;
                  var finalAP = 0;
                  var count = this.state.countObj;
                  // var rateData = this.state.rateObj;
                  // var len1 = this.state.list.length;
                  // var len2 = this.state.listOfAP.length;
                  // console.log("this.state.list", this.state.list);
                  // console.log("this.state.list.length", this.state.list.length);
                  // console.log("this.state.listOfAP", this.state.listOfAP);
                  // console.log(
                  //   "this.state.listOfAP.length",
                  //   this.state.listOfAP.length
                  // );

                  // let k = 0,
                  // let j = 0;
                  // var id1 = post._id;
                  // for (var j = 0; j < len2; j++) {
                  //   var id2 = this.state.listOfAP[j].roomTypeId;
                  //   if (post._id === id2) {
                  //     ap = this.state.listOfAP[j].plan.AP;
                  //     ep = this.state.listOfAP[j].plan.EP;
                  //     break;
                  //   }
                  //   console.log("for j = ", j);
                  //   console.log("ap = ", ap);
                  //   console.log("ep = ", ep);
                  // }

                  // console.log("rate1=", rate1);
                  // p = rate1 * room;
                  // console.log("p = ", p);
                  var rateObj2 = this.state.listOfAP;
                  rateObj2.forEach((i) => {
                    if (i.roomTypeId === post._id) {
                      finalAP = i.plan.AP;
                      finalEP = i.plan.EP;
                    }
                  });
                  // count.forEach((data) => {
                  //   rateObj2.forEach((theRate) => {
                  //     if (post._id === theRate.roomTypeId) {
                  //       isCheck = data.isChecked;
                  //       if (isCheck) finalPrice = finalAP;
                  //       else finalPrice = finalEP;
                  //     }
                  //   });
                  // });

                  // console.log("finalPrice = ", finalPrice);
                  // console.log("isCheck = ", isCheck);
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

                  // count.forEach((data) => {
                  //   total += data.count;
                  // });
                  // console.log("finalPrice = ", finalPrice);
                  // console.log("rooms = ", room);
                  if (room > 0) price = finalPrice * room;
                  // console.log("price = ", price);
                  // console.log(
                  //   "this.state.totalpriceTow = ",
                  //   this.state.totalpriceTwo
                  // );
                  count.forEach((data) => {
                    if (data.id === post._id) data.priceO = price;
                  });
                  // console.log("count Obj agter priceO = ", count);
                  return (
                    <div key={index} className="homeContainerOne">
                      {/* <h1>{this.state.}</h1> */}

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
                                <h2 style={{ marginTop: "6px" }}>
                                  {post.roomType}
                                </h2>
                              </div>
                              <div className="rate-container">
                                <span>
                                  <h2>₹ {finalPrice}</h2>
                                </span>
                                <h5>per Day/Night</h5>
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
                    <Button
                      className="reserve-left"
                      // class="ui inverted green button"
                      as={NavLink}
                      to="/"
                      // onClick={() => this.state.onBack()}
                    >
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
const mapDispatchToProps = (dispatch) => {
  return {
    roomDetails: bindActionCreators(roomDetails, dispatch),
    roomTypesRate: bindActionCreators(roomTypesRate, dispatch),
    bookingDetails: bindActionCreators(bookingDetails, dispatch),
    date: bindActionCreators(date, dispatch),
    room: bindActionCreators(room, dispatch),
    property: bindActionCreators(property, dispatch),
    additionOfPrices: bindActionCreators(additionOfPrices, dispatch),
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
