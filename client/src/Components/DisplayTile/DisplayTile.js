import React, { Component } from "react";
import ImageTile from "../DisplayTile/Image.jpeg";
import Details from "./roomTypeDetail.json";
import "./DisplayTile.css";

import WifiRoundedIcon from "@material-ui/icons/WifiRounded";
import FreeBreakfastRoundedIcon from "@material-ui/icons/FreeBreakfastRounded";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";

class DisplayTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChange: true,
      // price1: 0,
      countObj: [],
    };
  }

  componentDidMount() {
    var countObj = Details.map((data) => {
      return {
        id: data.id,
        count: 0,
      };
    });
    this.setState({
      countObj: countObj,
    });
  }

  handleMinus = (id) => {
    var count = this.state.countObj;
    count.forEach((data) => {
      if (data.id === id) data.count -= 1;
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

  render() {
    console.log("state  ", this.state);

    return (
      <div className="display">
        <div>
          {Details.map((post, index) => {
            let room = 0;
            var count = this.state.countObj;
            count.forEach((data) => {
              if (data.id === post.id) room = data.count;
            });
            return (
              <div className="wrapper">
                <div className="ImageTile">
                  <img src={ImageTile}></img>
                </div>
                <div className="childWrapper" key={post.id}>
                  <div>
                    <h2>{post.Rname}</h2>
                    <p>{post.Desc}</p>
                  </div>
                  <div className="price">
                    <div className="block1">
                      <p>Starting from</p>
                      <h2>{post.price}</h2>
                    </div>
                    <div className="button-price">
                      <button
                        className="thebutton"
                        onClick={() => this.handleMinus(post.id)}
                      >
                        -
                      </button>
                      <button className="thebutton">{room}</button>
                      <button
                        className="thebutton"
                        onClick={() => this.handlePlus(post.id)}
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
                      <p className="icon">{post.three}</p>
                      <FreeBreakfastRoundedIcon
                        className="icon"
                        style={{ color: "#DE7A34" }}
                      ></FreeBreakfastRoundedIcon>{" "}
                      <p className="icon">{post.four}</p>
                      <CheckCircleSharpIcon
                        className="icon"
                        style={{ color: "#0E8C11" }}
                      ></CheckCircleSharpIcon>
                      <p className="icon">{post.five}</p>
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
                        <h3 className="priceh2">{post.price * room}</h3>
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

export default DisplayTile;
