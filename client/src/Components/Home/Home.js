import React from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from '@material-ui/core/Button';
import hotel1 from "./home1.jpg";
import hotel2 from "./home2.jpg";
import hotel3 from "./home3.jpg";
import { Carousel } from "react-responsive-carousel";
import { withRouter } from "react-router-dom";
import LanguageIcon from "@material-ui/icons/Language";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PinDropIcon from "@material-ui/icons/PinDrop";
import StarIcon from "@material-ui/icons/Star";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { connect } from "react-redux";
import { date, room } from "../../actions/index";
import { bindActionCreators } from "redux";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

// npm i @material-ui/icons
// npm i @material-ui/core

import ImageTile from "../DisplayTile/Image.jpeg";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end: null,
    };
  }
  handleDate = (e) => {
    this.props.date({
      start: e.value[0],
      end: e.value[1],
    });
    this.setState({
      start: e.value[0],
      end: e.value[1],
      dateError: "",
      clicked: false,
    });
  };

  render() {
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    
    return (
      <div>
        <div className="Home-head">
          <p className="check-in">Check-in / Check-out</p>
          <DateRangePickerComponent
            placeholder="Check-in/Check-out"
            startDate={this.state.start}
            endDate={this.state.end}
            min={minValue}
            format={"dd-MMM-yy"}
            color={"white"}
            onChange={this.handleDate}
          />
        </div>
        <div className="homeContainer">
          <div className="wrapper">
            <div>
              <img
                className="ImageTile"
                src={ImageTile}
                style={{
                  height: "182px",
                  width: "500px",
                  paddingLeft: "193px",
                }}
              ></img>
            </div>
            <div>
              <h2>The Rivasa Resort</h2>
              <h6>Luxury stay in heart of Goa</h6>
              <div className="childWrapper">
                <div>
                  <div className="pin">
                    <PinDropIcon style={{ color: "#FF5733" }}></PinDropIcon>
                    <p className="pin-des">
                      Main street, Umta Vado, Calanguta, Goa
                    </p>
                  </div>
                  <div>
                    <LanguageIcon style={{ color: "#FFC300" }}></LanguageIcon>
                    <a href="#" className="pin-des">
                      www.therivasaresort.com
                    </a>
                  </div>
                  <div className="pin">
                    <PhoneInTalkIcon></PhoneInTalkIcon>
                    <p className="pin-des">0823-2131456, 7867383822</p>
                  </div>
                  <div className="pin">
                    <WhatsAppIcon style={{ color: "#44C323" }}></WhatsAppIcon>
                    <p className="pin-des">23456889</p>
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
                    Pricing :₹<s>2500</s>
                    <span>
                      <h2>₹ 2375</h2>
                    </span>
                  </div>
                  <div className="viewDetails">
                  <button class="ui inverted green button" >View Details</button>
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
const mapDispatchToProps = (dispatch) => {
  return {
    date: bindActionCreators(date, dispatch),
    room: bindActionCreators(room, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Home));
