import React, { Component } from "react";
import ImageTile from "../DisplayTile/Image.jpeg";
import Details from "./roomTypeDetail.json";
import "./DisplayTile.css";

import WifiRoundedIcon from "@material-ui/icons/WifiRounded";
import FreeBreakfastRoundedIcon from "@material-ui/icons/FreeBreakfastRounded";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";

class DisplayTileTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      // price1: 0,
    };
  }

  handleMinus = (id) => {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1,
        // price1: this.state.price1 * this.state.count,
      });
    }
  };

  handlePlus = (id) => {
    if (this.state.count < 5) {
      this.setState({
        count: this.state.count + 1,
        // price1: this.state.price1 * this.state.count,
      });
    }
  };

  render() {
    return (
      <div className="display">
        <div>
          {Details.map((post, index) => {
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
                        onClick={this.handleMinus(post.id)}
                      >
                        -
                      </button>
                      <button className="thebutton">{this.state.count}</button>
                      <button
                        className="thebutton"
                        onClick={this.handlePlus(post.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="facilities">
                      <WifiRoundedIcon
                        style={{ color: "#6D6B68" }}
                      ></WifiRoundedIcon>
                      <p>{post.three}</p>
                      <FreeBreakfastRoundedIcon
                        style={{ color: "#DE7A34" }}
                      ></FreeBreakfastRoundedIcon>{" "}
                      <p>{post.four}</p>
                      <CheckCircleSharpIcon
                        style={{ color: "#0E8C11" }}
                      ></CheckCircleSharpIcon>
                      <p>{post.five}</p>
                    </div>
                  </div>
                  <div>
                    <div className="reserve-content">
                      <div className="roomdiv">
                        <h3>Total Rooms :</h3>
                        <h3>{this.state.count}</h3>
                      </div>
                      <div className="roomdiv">
                        <h3>Total Price :</h3>
                        <h3 className="priceh2">
                          {post.price * this.state.count}
                        </h3>
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

export default DisplayTileTwo;
