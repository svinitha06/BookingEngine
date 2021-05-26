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

class DisplayRedux extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      countObj: [],
      isChecked: false,
      // checkCount: [],
      // id: [],
      // count: 0,
    };
  }
  // id = this.props.id;
  componentDidMount() {
    axios
      .get("http://localhost:5000/rooms/getRoomType")
      .then((responseOfApi) => {
        console.log("WHOLE RESPONSE", responseOfApi);
        console.log("RESPONSE.DATA", responseOfApi.data);
        console.log(
          "RESPONSE.DATA.rooomTypeID",
          responseOfApi.data[1].roomType
        );
        console.log("RESPONSE.DATA._ID", responseOfApi.data._id);

        this.props.roomDetails(responseOfApi.data);
        this.setState({
          list: responseOfApi.data,
          list: this.props.roomDetailsList,
        });
        console.log("LIST:RESPONSE.DATA===", this.state.list);
        console.log("before - countObj", countObj);

        var countObj = this.state.list.map((data) => {
          return {
            id: data._id,
            count: 0,
          };
        });
        this.setState({ countObj: countObj });
        console.log("After  - countObj", countObj);
        // console.log("the id passed here = ", this.props.id);
      })
      .catch((error) => {
        console.log("Error gtting data", error);
      });
    // console.log("this.state.list.data", this.state.list.data[1]._id);
    // console.log("RESPONSE.DATA.rooomTypeID", responseOfApi.data[1]._id);

    // console.log("before - ", this.state.id);

    // var countObj = this.state.list.map((data) => {
    //   console.log("inside of countObj");

    //   return {
    //     id: data._id,
    //     count: 2,
    //     check: false,
    //   };
    // });

    // this.setState({
    //   countObj: countObj,
    //   // checkCount: checkCount,
    // });
  }

  // handleChange = (id) => {
  //   var check = this.state.countObj;
  //   console.log("HandleChange");

  //   count.forEach((data) => {
  //     if (data._id === id) console.log("Handle Change ");
  //   });
  //   this.setState({ [event.target.name]: event.target.checked });
  // };
  handleMinus = (id) => {
    console.log("Inside handleMinu ");
    var count = this.state.countObj;
    console.log("Inside HandleMinus var count=", count);
    count.forEach((data) => {
      if (data.id === id && data.count > 0) data.count -= 1;
    });
    this.setState({ countObj: count });
  };
  handlePlus = (id) => {
    console.log("Inside handlePlus ");
    var count = this.state.countObj;
    console.log("Inside HandlePlus var count=", count);
    count.forEach((data) => {
      if (data.id === id) data.count += 1;
    });
    this.setState({ countObj: count });
  };
  render() {
    // let room = 10;
    // console.log("inside render checking state", this.state);
    return (
      <div className="displayOne">
        <div>
          {this.state.list.map((post, index) => {
            let room = 0;
            let total = 0;
            var count = this.state.countObj;
            console.log("var count inside of map", count);

            count.forEach((data) => {
              if (data.id === post._id) room = data.count;
            });
            count.forEach((data) => {
              total += data.count;
            });
            // var count = 0;
            // let check = false;
            // let room = 0;
            // this.state.list.forEach((i) => {
            //   if (i._id === post._id) room += count;
            //   console.log("inside if room =", room);
            // });
            // console.log("this.state.list", this.state.list);
            // var isChecked = this.state.countObj;

            // var len = post.description.length;
            // console.log("length of post  = ", len);

            // if (post.description.length > 230) {
            //   post.description = post.description.slice(0, 200);
            // }
            // var newLen = post.description.length;
            // console.log("length of New post  = ", newLen);

            // console.log("sliced text  = ", post.description);

            // let len = {post.description}.length;
            // console.log("inside map display state", this.state);
            // count.forEach((data) => {
            //   if (data.id === post._id) {
            //     room = data.count;
            //     check = data.check;
            //   }
            // });
            // isChecked.forEach((data) => {
            //   if (data.id === post._id) check = data.check;
            // });
            return (
              <div key={index}>
                <div className="wrapperOne">
                  <div className="ImageTileOne">
                    <img src={post.roomImage}></img>
                  </div>
                  <div className="childWrapperOne" key={post._id}>
                    <div>
                      <h2>{post.roomType}</h2>
                      <p className="roomDesc">{post.description}</p>
                    </div>
                    <div className="price">
                      <div className="block1">
                        <label>
                          Include Food :
                          <input
                            type="checkbox"
                            name="check"
                            onChange={() => this.handleChange(e)}
                            checked={this.state.isChecked}
                          ></input>
                        </label>

                        <h2>
                          {/* {post.price} */}
                          some price
                        </h2>
                      </div>
                      <div className="button-price">
                        <button
                          className="thebutton"
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
                      {console.log("Total rooms", total)}
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
