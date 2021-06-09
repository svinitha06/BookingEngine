import React, { Component } from "react";
import "./payment.css";
import Image_Upi from "../Payment/FinalUPI.png";
import { ImCreditCard } from "react-icons/im";
import { IconContext } from "react-icons";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import paytm from "./image_upi.png";
export class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActiveCredit: true,
      isActiveGPay: false,
      isActiveNetBanking: false,
    };
  }
  handleCredit = () => {
    console.log("inside handle credit ");
    console.log(" isActiveCredit", this.state.isActiveCredit);
    console.log(" isActiveGPay", this.state.isActiveGPay);

    this.setState({
      isActiveCredit: true,
      isActiveGPay: false,
      isActiveNetBanking: false,
    });
  };
  handleGPay = () => {
    this.setState({
      isActiveCredit: false,
      isActiveGPay: true,
      isActiveNetBanking: false,
    });
  };
  handleNetBanking = () => {
    this.setState({
      isActiveCredit: false,
      isActiveGPay: false,
      isActiveNetBanking: true,
    });
  };
  handleCancel = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
        <div className="parentPayment">
          <div className="divideIntoTwo">
            <div className="choiceOfPayment">
              <div className="choiceHeading">
                <h1>Payment Option</h1>
              </div>
              {/* <i class="fas fa-credit-card"></i>
              <i class="far fa-credit-card"></i> */}

              <div className="payButton">
                <button onClick={this.handleCredit}>
                  <div className="imageAndCredit">
                    <IconContext.Provider
                      value={{ color: "orange", size: "2.5em" }}
                    >
                      <ImCreditCard />
                    </IconContext.Provider>
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: "darkblue",
                        marginLeft: "5%",
                      }}
                    >
                      Credit/Debit
                    </p>
                  </div>

                  <p>Visa, MasterCard,Rupay and more</p>
                </button>
              </div>
              <div className="payButtonTwo">
                <button onClick={this.handleGPay}>
                  <img src={Image_Upi}></img>
                  <div className="imageAndUpi">
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: "darkblue",
                        marginLeft: "3%",
                      }}
                    >
                      UPI
                    </p>
                    <p>Pay direct from Bank Account</p>
                  </div>
                  {/* <img src={GpayIcon}></img>G-Pay */}
                </button>
              </div>
              {/* <div> Net Banking</div> */}
              <div className="netBankingContainer">
                <button onClick={this.handleNetBanking}>Net Banking</button>
              </div>
            </div>
            <div className="parentPaymentFirst">
              <div className="cancelButtonDiv">
                <div></div>
                <div className="extra">
                  <button className="cancelButton" onClick={this.handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>

              {this.state.isActiveCredit && (
                <div className="creditCardContainer">
                  <div className="childContainer">
                    <div className="cardNumber">
                      <label>Card Number</label>
                      <input
                        placeholder="**** **** **** ****"
                        max="9999999999999999"
                        min="0000000000000001"
                        min="0"
                        type="number"
                        name="number"
                      ></input>
                    </div>
                    <div className="cardName">
                      <label> Name on Card</label>
                      <input type="text"></input>
                    </div>
                    <div className="forDivision">
                      <div className="monthContainer">
                        <label for="month">Expiry Month & Year</label>
                        <select name="month" id="selectedMonth">
                          <option selected>Month</option>
                          <option value="Jan">Jan</option>
                          <option value="Feb">Feb</option>
                          <option value="Mar">Mar</option>
                          <option value="Apr">Apr</option>
                          <option value="May">May</option>
                          <option value="Jun">Jun</option>
                          <option value="Jul">Jul</option>
                          <option value="Aug">Aug</option>
                          <option value="Sep">Sep</option>
                          <option value="Oct">Oct</option>
                          <option value="Nov">Nov</option>
                          <option value="Dec">Dec</option>
                        </select>
                        <select name="year" id="selectedyear">
                          <option selected>Year</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                        </select>
                      </div>
                      <div className="cvvContainer">
                        <label>Card CVV</label>
                        <input type="number" min="000" max="999"></input>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {this.state.isActiveGPay && (
                <div className="UPIContents">
                  <h2>Enter UPI ID</h2>
                  <div className="upiInput">
                    <input type="text" placeholder="MobileNumber@UPI"></input>
                    <div className="UPIImage">
                      <img src={paytm} style={{ width: "20%" }}></img>
                    </div>
                  </div>
                  <div className="UPIImage">
                    <img
                      // src={ImageOne}
                      style={{ width: "20%" }}
                    ></img>
                  </div>
                </div>
              )}
              {this.state.isActiveNetBanking && (
                <div>
                  <h1>Net Banking</h1>
                </div>
              )}
              <div className="PaymentButton">
                <div className="lastDivPayment">
                  <h2>Pay :{this.props.finalTotalPrice}</h2>
                  <button id="paymentbuttonLast" className="ui payment button">
                    Make Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  finalTotalPrice: state.totalPriceInState.Amount,
});
export default connect(mapStateToProps, null)(withRouter(Payment));
