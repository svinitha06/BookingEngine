import React, { Component } from "react";
import ImageTile from "../DisplayTile/Image.jpeg";
import Details from "./roomTypeDetail.json";
import "./DisplayTile.css";

class DisplayTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
      // price1: 0,
    };
  }

  handleMinus = () => {
    if (this.state.count > 1) {
      this.setState({
        count: this.state.count - 1,
        // price1: this.state.price1 * this.state.count,
      });
    }
  };

  handlePlus = () => {
    if (this.state.count < 6) {
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
                      <button className="thebutton" onClick={this.handleMinus}>
                        -
                      </button>
                      <button className="thebutton">{this.state.count}</button>
                      <button className="thebutton" onClick={this.handlePlus}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div></div>
                <div className="reserve-content">
                  <span>
                    <h3>Total Rooms :</h3>
                  </span>
                  <span>
                    <h3>{this.state.count}</h3>
                  </span>
                  <span>
                    <h3>Total Price :</h3>
                  </span>
                  <span>
                    <h2 className="priceh2">{post.price * this.state.count}</h2>
                  </span>
                  <button className="reserve">Reserve</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default DisplayTile;
