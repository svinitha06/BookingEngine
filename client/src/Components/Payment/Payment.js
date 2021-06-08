import React, { Component } from "react";
import "./payment.css";

export class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="creditCardContainer"></div>
        <div className="UPIContainer"></div>
      </div>
    );
  }
}

export default Payment;
