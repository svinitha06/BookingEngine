import React, { Component } from "react";
import axios from "axios";
// import { response } from "express";
import { get } from "lodash";
import "./DisplayTile.css";
import WifiRoundedIcon from "@material-ui/icons/WifiRounded";
import FreeBreakfastRoundedIcon from "@material-ui/icons/FreeBreakfastRounded";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";

import * as db from "../../api/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { roomDetails } from "../../actions";

class DisplayRedux extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      countObj: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/rooms/getRoomType")
      .then((responses) => {
        console.log("WHOLE RESPONSE", responses);
        console.log("RESPONSE.DATA", responses.data);
        console.log("RESPONSE.DATA.rooomTypeID", responses.data[1].roomType);
        this.props.roomDetails(responses.data);
        this.setState({
          // list: responses.data,
          list: this.props.roomDetailsList,
        });
        console.log("LIST:RESPONSE.DATA===", this.state.list);
      })
      .catch((error) => {
        console.log("Error gtting data", error);
      });

    // this.callRoomApi();

    var countObj = this.state.list.map((data) => {
      console.log("inside of countObj");

      return {
        id: data._id,
        count: 0,
      };
    });
    this.setState({
      countObj: countObj,
    });
  }

  //   callRoomApi = async () => {
  //     let resp = await db.getRoomTypes();
  //     this.props.roomDetails(resp);
  //   };
  //   componentDidUpdate() {
  //     // console.log(this.props, "hello");
  //     if (!this.state.list.length) {
  //       this.setState({
  //         list: this.props.roomDetailsList,
  //       });
  //     }
  //   }
  handleMinus = (id) => {
    var count = this.state.countObj;
    count.forEach((data) => {
      if (data._id === id) data.count -= 1;
    });
    this.setState({ countObj: count });
  };

  handlePlus = (id) => {
    var count = this.state.countObj;
    count.forEach((data) => {
      if (data._id === id) data.count += 1;
    });
    this.setState({ countObj: count });
  };

  render() {
    // let room = 10;
    console.log("inside render checking state", this.state);
    return (
      <div className="displayOne">
        <div>
          {this.state.list.map((post, index) => {
            let room = 0;
            var count = this.state.countObj;
            console.log("inside map display state", this.state);
            count.forEach((data) => {
              if (data.id === post._id) room = data.count;
            });
            return (
              <div className="wrapperOne">
                <div className="ImageTileOne">
                  <img key={index} src={post.roomImage}></img>
                </div>
                <div className="childWrapperOne" key={post._id}>
                  <div>
                    <h2 key={index}>{post.roomType}</h2>
                    <p key={index}>{post.description}</p>
                  </div>
                  <div className="price">
                    <div className="block1">
                      <p>Price</p>
                      <h2>
                        {/* {post.price} */}
                        some price
                      </h2>
                    </div>
                    <div className="button-price">
                      <button
                        className="thebutton"
                        key={index}
                        onClick={() => this.handleMinus(post._id)}
                      >
                        -
                      </button>
                      <button className="thebutton">{room}</button>
                      <button
                        className="thebutton"
                        key={index}
                        onClick={() => this.handlePlus(post._id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="facilities">
                      <WifiRoundedIcon
                        className="icon"
                        style={{ color: "#6D6B68" }}
                      ></WifiRoundedIcon>
                      <p className="icon">
                        {/* {post.three} */}
                        free Wifi
                      </p>
                      <FreeBreakfastRoundedIcon
                        className="icon"
                        style={{ color: "#DE7A34" }}
                      ></FreeBreakfastRoundedIcon>{" "}
                      <p className="icon">
                        {/* {post.four} */}
                        Free Breakfast
                      </p>
                      <CheckCircleSharpIcon
                        className="icon"
                        style={{ color: "#0E8C11" }}
                      ></CheckCircleSharpIcon>
                      <p className="icon">
                        {/* {post.five} */}
                        Sanitized
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="reserve-content">
                      <div className="roomdiv">
                        <h3>Total Rooms :</h3>
                        <h3>{room}</h3>
                      </div>
                      <div className="roomdiv">
                        <h3>Total Price :</h3>
                        <h3 className="priceh2">{room}</h3>
                      </div>

                      {/* <button className="reserve">Reserve</button> */}
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    roomDetails: bindActionCreators(roomDetails, dispatch),
  };
};
const mapStateToProps = (state) => {
  return {
    roomDetailsList: get(state, "roomDetailsList", []),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DisplayRedux));
