import React from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// npm i @material-ui/icons
// npm i @material-ui/core
import LanguageIcon from "@material-ui/icons/Language";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PinDropIcon from "@material-ui/icons/PinDrop";
import StarIcon from "@material-ui/icons/Star";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

import ImageTile from "../DisplayTile/Image.jpeg";

class Home extends React.Component {
  render() {
    return (
      <div className="homeDiv">
        <div className="homeContainer">
          <div className="wrapper">
            <div>
              <img className="ImageTile" src={ImageTile}></img>
            </div>
            <div>
              <h2>The Rivasa Resort</h2>
              <h6>Luxury stay in heart of Goa</h6>
              <div className="childWrapper">
                <div>
                  <div>
                    <PinDropIcon style={{ color: "#FF5733" }}></PinDropIcon>
                    <p>Main street, Umta Vado, Calanguta, Goa</p>
                  </div>
                  <div>
                    <LanguageIcon style={{ color: "#FFC300" }}></LanguageIcon>
                    <a href="#">www.therivasaresort.com</a>
                  </div>
                  <div>
                    <PhoneInTalkIcon></PhoneInTalkIcon>
                    <p>0823-2131456, 7867383822</p>
                  </div>
                  <div>
                    <WhatsAppIcon style={{ color: "#44C323" }}></WhatsAppIcon>
                    <p>23456889</p>
                  </div>
                </div>
                <div>
                  <div>
                    <StarIcon style={{ color: "#EED336" }}></StarIcon>
                    4.5
                  </div>
                  <div>
                    <LocalOfferIcon
                      style={{ color: "#2ECC71" }}
                    ></LocalOfferIcon>
                    5%
                  </div>
                  <div>
                    Pricing :₹<s>2500</s>{" "}
                    <span>
                      <h2>₹ 2375</h2>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(withRouter(Home));
