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
          list: responseOfApi.data,
          list: this.props.roomDetailsList,
        });
        // console.log("this.props.state", this.props);
        var countObj = this.state.list.map((data) => {
          return {
            id: data._id,
            count: 0,
            isChecked: false,
            // rate: 0,
          };
        });
        this.setState({ countObj: countObj });
      })
      .catch((error) => {
        // console.log("Error gtting data", error);
        <h1>Error fetching data</h1>;
        this.setState({ error: !this.state.error });
      });
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
      })
      .catch((e) => {
        console.log("error logging data", e);
      });
    // return res;
  };
  // getSomething = async (id) => {
  //   let res = await db.getRoomRates({
  //     propertyId: id,
  //     checkInDate: this.props.dateRange.start,
  //   });
  //   this.props.roomDetails(res.data);
  // };
  handleMinus = (id) => {
    var count = this.state.countObj;
    let rateObj = this.state.listOfAP;
    let t = this.state.totalPrice;

    count.forEach((data) => {
      if (data.id === id && data.count > 0) {
        data.count -= 1;
        rateObj.forEach((rate) => {
          if (rate.roomTypeId === id) {
            if (data.isChecked) t -= rate.plan.EP * data.count;
            else t -= rate.plan.AP * data.count;
          }
        });
      }
    });
    this.setState({ countObj: count, totalPrice: t });
  };
  handlePlus = (id) => {
    var count = this.state.countObj;
    let rateObj = this.state.listOfAP;
    let t = this.state.totalPrice;

    count.forEach((data) => {
      if (data.id === id) {
        data.count += 1;

        rateObj.forEach((rate) => {
          if (rate.roomTypeId === id) {
            if (data.isChecked) t += rate.plan.EP * data.count;
            else t += rate.plan.AP * data.count;
          }
        });
      }
    });

    this.setState({ countObj: count, totalPrice: t });
  };
  handleChange = (id) => {
    var count = this.state.countObj;
    // console.log("inside handleCahneg count = ", count);
    count.forEach((data) => {
      if (data.id === id) {
        data.isChecked = !data.isChecked;
      }
      // if(data.isChecked == true){
      //   this.setState({
      //     realRate:rate,
      //   })
      // }
      // if (data.id === id && data.isChecked) data.p += 600;
    });

    this.setState({ countObj: count });
  };

  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "ui-rounded",
      textAlign: "center",
    };
    var propertyName = "";
    var ap = 0,
      ep = 0;
    // console.log("THE PROP VALUE + ", this.props);
    if (this.state.error) return <h1 style={mystyle}>Error Fetching data</h1>;
    // let propertyName = "";
    return (
      <div className="displayOne">
        {
          // let propertyName = "";\

          // this.state.list.forEach((data)=>{
          //   this.state.listOfAP.forEach((data2)=>{
          //     if(data2.roomTypeId === data._id)
          //       ap = data2.plan.AP;
          //       ep = data2.plan.EP;
          //   })
          // })

          this.props.propertyList.forEach((data) => {
            if (data.PropertyId == this.props.match.params.id) {
              propertyName = data.name;
            }
          })
        }
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
                  var rate = 0;
                  // var k = 0;

                  var count = this.state.countObj;
                  // var rateData = this.state.rateObj;
                  // var len1 = this.state.list.length;
                  var len2 = this.state.listOfAP.length;

                  // let k = 0,
                  let j = 0;
                  // var id1 = post._id;
                  for (j = 0; j < len2; j++) {
                    console.log(
                      "this.state.listOfAP[j].roomTypeId",
                      this.state.listOfAP[j].roomTypeId
                    );
                    var id2 = this.state.listOfAP[j].roomTypeId;
                    if (post._id === id2) {
                      ap = this.state.listOfAP[j].plan.AP;
                      ep = this.state.listOfAP[j].plan.EP;
                      break;
                    }
                    console.log("ap = ", ap);
                    console.log("ep = ", ep);
                  }
                  // console.log("ap = ", ap);
                  // console.log("ep = ", ep);

                  // console.log("the rate data = ", rateData);
                  // console.log("var count inside of map", count);

                  count.forEach((data) => {
                    if (data.id === post._id) room = data.count;
                  });

                  // count.forEach((data) => {
                  //   total += data.count;
                  // });
                  count.forEach((data) => {
                    if (data.id === post._id) {
                      isCheck = data.isChecked;
                      if (isCheck == true) {
                        rate = ap;
                      } else {
                        rate = ep;
                      }
                    }
                  });

                  p = rate * room;

                  // this.setState({
                  //   totalPrice: this.state.totalPrice + p,
                  // });

                  console.log("this.state.totalPrice", this.state.totalPrice);
                  // k++;
                  // count.forEach((data) => {
                  //   if (data.p === true) calculated = data.p;
                  // });
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
                                  <h2>₹ {rate}</h2>
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
                                  <h3>Price : {p}</h3>
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
                    <span>Total Price: {this.state.totalPrice}</span>
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
                    as={NavLink}
                    to="/form"
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

    date: bindActionCreators(date, dispatch),
    room: bindActionCreators(room, dispatch),
    property: bindActionCreators(property, dispatch),
  };
};
const mapStateToProps = (state) => {
  return {
    roomDetailsList: get(state, "roomDetailsList", []),
    roomTypeRatesData: get(state, "roomTypeRatesData", []),
    propertyList: get(state, "propertyList", []),
    dateRange: get(state, "dateRange", []),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DisplayRedux));
