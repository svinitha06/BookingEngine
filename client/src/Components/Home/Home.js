import React from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { get } from "lodash";
import button from "@material-ui/core/Button";
import { Button, Icon } from "semantic-ui-react";
import Menu from "@material-ui/core/Menu";
import hotel3 from "./home3.jpg";
import hotel from "../../asset/hotel.jpg";
import { withRouter, Link } from "react-router-dom";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PinDropIcon from "@material-ui/icons/PinDrop";
import StarIcon from "@material-ui/icons/Star";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { connect } from "react-redux";
import ErrorIcon from "@material-ui/icons/Error";
import { date, property, room } from "../../actions/index";
import { bindActionCreators } from "redux";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import * as db from "../../api/index";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end: null,
      roomAnchor: null,
      roomValue: 1,
      adultValue: 1,
      childValue: 0,
      listOfProperties: [],
      dateError: "",
      roomError: "",
      clicked: false,

    };
  }
  componentDidMount() {
    this.getcall();
  }
  getcall = async () => {
    let res = await db.getproperty();
    this.props.property(res);
    console.log(res, "sherin");
  };
  componentDidUpdate=()=> {
    console.log(this.props, "hello");
    if (!this.state.listOfProperties.length) {
      this.setState({
        listOfProperties: this.props.propertyList,
      });
    }
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
  handleValidate=()=>{
    this.setState({
      clicked: true,
    });
    if (this.state.start == null) {
      this.setState({
        dateError: "Please select the date",
      });
    }
  }
  handleCount=()=>{
    let count=0;
    if((this.state.childValue+this.state.adultValue)/4){
      this.setState({
        roomValue:Math.ceil(this.state.adultValue/2)
      })

    }
    else{
      this.setState({
        roomValue:Math.ceil(this.state.childValue/2)
      })
    }
  }

  handleDec = () => {
    if (this.state.roomValue !== 1) {
      this.setState({
        roomValue: this.state.roomValue - 1,
      });
    }
  };
  handleDecAdult = () => {
    if (this.state.adultValue !== 1) {
      this.setState({
        adultValue: this.state.adultValue - 1,
      });
    }
    this.handleCount()
  };
  handleDecChild = () => {
    if (this.state.childValue !== 0) {
      this.setState({
        childValue: this.state.childValue - 1,
      });
    }
    this.handleCount()
  };
  handleInc = () => {
    this.setState({
      roomValue: this.state.roomValue + 1,
    });
  };
  handleIncAdult = () => {
    this.setState({
      adultValue: this.state.adultValue + 1,
    });
    this.handleCount()
  };
  handleIncChild = () => {
    this.setState({
      childValue: this.state.childValue + 1,
    });
    this.handleCount()
  };
  handleClick = (event) => {
    this.setState({
      roomAnchor: event.currentTarget,
    });
  };
  handleClose = () => {
    this.setState({
      roomAnchor: null,
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
        <div>
          <img className="banner" src={hotel}></img>
          <div className={`date ${
                      this.state.dateError !== "" ? "dateError" : ""
                    }`}>
            <div
              className="Home-head d-flex w-98"
              style={{ width: "-webkit-fill-available" }}
            >
              
              <DateRangePickerComponent
                placeholder="Check-in/Check-out"
                startDate={this.state.start}
                endDate={this.state.end}
                min={minValue}
                format={"dd-MMM-yy"}
                color={"black"}
                onChange={this.handleDate}
                className="datePicker w-100"
                showClearButton={false}
                allowEdit={false}
              />
              {this.state.dateError !== "" && (
                        <ErrorIcon color="secondary" className="ml-2 mt-4" />
                      )}
              
              
              <div className="roomDetails">
                <div className="d-flex">
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className="roomRange"
                  >
                    <p className="roomText">
                      <i class="users icon ">
                        <p className="value">{`${this.state.roomValue}Rooms`}</p>
                      </i>
                    </p>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.roomAnchor}
                    className="w-100"
                    open={Boolean(this.state.roomAnchor)}
                    onClose={this.handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    elevation={0}
                    getContentAnchorEl={null}
                  >
                    <div className="d-flex">
                      {/* <button onClick={this.handleDec}>-</button> */}
                      <p className="menu-drop">Rooms</p>
                      <div className="decre">
                        <button
                          class="circular ui icon button"
                          onClick={this.handleDec}
                        >
                          <i class="minus circle icon"></i>
                        </button>
                      </div>
                      <p>{this.state.roomValue}</p>
                      <div className="incre">
                        <button
                          class="circular ui icon button"
                          onClick={this.handleInc}
                        >
                          <i class="plus circle icon"></i>
                        </button>
                      </div>
                    </div>
                    <div className="d-flex">
                      <p className="menu-drop">Adults</p>
                      <div className="a-decre">
                        <button
                          class="circular ui icon button"
                          onClick={this.handleDecAdult}
                        >
                          <i class="minus circle icon"></i>
                        </button>
                      </div>
                      <p>{this.state.adultValue}</p>
                      <div className="a-incre">
                        <button
                          class="circular ui icon button"
                          onClick={this.handleIncAdult}
                        >
                          <i class="plus circle icon"></i>
                        </button>
                      </div>
                    </div>
                    <div className="d-flex">
                      <p className="menu-drop">Children</p>
                      <div className="c-decre">
                        <button
                          class="circular ui icon button"
                          onClick={this.handleDecChild}
                        >
                          <i class="minus circle icon"></i>
                        </button>
                      </div>
                      <p>{this.state.childValue}</p>
                      <div className="c-incre">
                        <button
                          class="circular ui icon button"
                          onClick={this.handleIncChild}
                        >
                          <i class="plus circle icon"></i>
                        </button>
                      </div>
                    </div>
                  </Menu>
                </div>
              </div>
              <div className="checkButton">
                <Button animated onClick={this.handleValidate} olive
                >
                  <Button.Content visible>
                    <p>Search</p>
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {this.state.listOfProperties.map((data,index) => (
          <div className="homeContainer">
            <div className="wrapper">
              <div>
                <img className="ImageTile" key={index} src={get(data,"Image","--")}></img>
              </div>
              <div className="nameDes">
                <h2>{get(data, "name", "--")}</h2>
                <h6>{get(data, "description", "--")}</h6>
                <div className="childWrapper">
                  <div>
                    <div className="pin">
                      <PinDropIcon style={{ color: "#FF5733" }}></PinDropIcon>
                      <p className="pin-des">{get(data, "location", "--")}</p>
                    </div>
                    <div className="pin">
                      <PhoneInTalkIcon></PhoneInTalkIcon>
                      <p className="pin-des">{get(data, "contact", "--")}</p>
                    </div>
                  </div>
                  <div>
                    {/* <div>
                      <StarIcon style={{ color: "#EED336" }}></StarIcon>
                      {get(data, "ratings", "--")}
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
                    </div> */}
                    <div className="viewDetails">
                      <Link to="/basiclayout" id="2">
                        <button class="ui inverted green button">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    date: bindActionCreators(date, dispatch),
    room: bindActionCreators(room, dispatch),
    property: bindActionCreators(property, dispatch),
  };
};
const mapStateToProps = (state) => {
  return {
    propertyList: get(state, "propertyList", []),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
