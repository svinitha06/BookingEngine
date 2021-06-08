import React, { Component } from "react";
import "./payment.css";
import ImageOne from "../BookNow/image3.png"
export class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="creditCardContainer"></div>
        <div className="UPIContainer">
          <div className="UPIContents">
          <h2>Enter UPI ID</h2>
          <div className="ui input">
            <input
            type="text"
            placeholder="MobileNumber@UPI"
            ></input>
            {/* <div className="UPIImage">
             <img src={ImageOne} style={{ width: "20%" }}></img>
             </div> */}
          </div>
          <div className="UPIImage">
          <img src={ImageOne} style={{ width: "20%" }}></img>
          </div>
          </div>
      </div>
      <div className="PaymentButton">
        <div>
          <button className="ui payment button">Payment</button>
        </div>
      </div>
      </div>    
    )
  };
}

export default Payment;
