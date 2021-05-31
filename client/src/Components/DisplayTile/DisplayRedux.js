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
      rates: [],
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
          };
        });
        this.setState({ countObj: countObj });
      })
      .catch((error) => {
        // console.log("Error gtting data", error);
        <h1>Error fetching data</h1>;
        this.setState({ error: !this.state.error });
      });
    this.getRoomRates();
    // axios({
    //   method: "GET",
    //   url: `http://localhost:3000/rate/getplan`,
    //   headers: {
    //     "Content-Type": "application/json",
    //     // 'x-access-token': sessionStorage.getItem('token')
    //     propertyId: this.props.propertyList,
    //     checkIndate: this.props.dateRange,
    //   },
    // }).then((result) => {
    //   this.props.roomTypeRate(result);
    //   console.log("getRoomrates = ", result);
    //   this.setState({
    //     rates: result,
    //     rates2: this.props.roomTypeRatesData,
    //   });

    //   console.log("room rate from displayRedus", rates);
    // });
  }
  getRoomRates = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:3000/rate/getplan`,
      headers: {
        "Content-Type": "application/json",
        // 'x-access-token': sessionStorage.getItem('token')
        propertyId: this.props.propertyList,
        checkIndate: this.props.dateRange,
      },
    }).then((result) => {
      this.props.roomTypeRate(result);
      console.log("getRoomrates = ", result);
      this.setState({
        rates: result,
        rates2: this.props.roomTypeRatesData,
      });

      console.log("room rate from displayRedus", rates);
    });
    // .catch((error) => {
    //   console.log("errpr fething data");
    // });
  };

  handleMinus = (id) => {
    var count = this.state.countObj;

    count.forEach((data) => {
      if (data.id === id && data.count > 0) data.count -= 1;
    });
    this.setState({ countObj: count });
  };
  handlePlus = (id) => {
    var count = this.state.countObj;

    count.forEach((data) => {
      if (data.id === id) data.count += 1;
    });
    this.setState({ countObj: count });
  };
  handleChange = (id) => {
    var count = this.state.countObj;
    // console.log("inside handleCahneg count = ", count);
    count.forEach((data) => {
      if (data.id === id) {
        data.isChecked = !data.isChecked;
      }
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
    console.log("this.props.dateRange", this.props.dateRange);

    // console.log("THE PROP VALUE + ", this.props);
    if (this.state.error) return <h1 style={mystyle}>Error Fetching data</h1>;
    return (
      <div className="displayOne">
        <div className="displayContentTwo">
          {this.state.list.map((post, index) => {
            let room = 0;
            let total = 0;
            let isCheck = false;
            let p = 0;
            var count = this.state.countObj;
            // console.log("var count inside of map", count);

            count.forEach((data) => {
              if (data.id === post._id) room = data.count;
            });
            p = 2000 * room;
            count.forEach((data) => {
              total += data.count;
            });
            count.forEach((data) => {
              if (data.id === post._id) isCheck = data.isChecked;
            });
            // count.forEach((data) => {
            //   if (data.p === true) calculated = data.p;
            // });
            return (
              <div key={index} className="homeContainerOne">
                <div className="wrapperOne">
                  <div>
                    <img className="ImageTileOne" src={post.roomImage}></img>
                  </div>
                  <div className="textInside">
                    <div>
                      <h2 style={{ marginTop: "6px" }}>{post.roomType}</h2>
                      <p className="roomDesc">
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
                                id="isChceck"
                                onChange={() => this.handleChange(post._id)}
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
              <span>Total Price: 0</span>
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
