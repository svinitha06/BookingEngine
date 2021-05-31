import React from "react";
import "./Home.css";
import { get, functions, bind } from "lodash";
import _ from "lodash";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import RemoveIcon from "@material-ui/icons/Remove";
import { StarFill } from "react-bootstrap-icons";
import AddIcon from "@material-ui/icons/Add";
import ShowMoreText from "react-show-more-text";
import { Button, Icon } from "semantic-ui-react";
import Menu from "@material-ui/core/Menu";
import hotel from "../../asset/hotel.jpg";
import { withRouter, Link } from "react-router-dom";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import PinDropIcon from "@material-ui/icons/PinDrop";
import { connect } from "react-redux";
import ErrorIcon from "@material-ui/icons/Error";
import { date, property, room, propRoomType } from "../../actions/index";
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
      cityError: "",
      clicked: false,
      open: false,
      searchValue: "",
      dateObj: [],
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
  // componentDidUpdate = () => {
  //   console.log(this.props, "hello");
  //   if (!this.state.listOfProperties.length) {
  //     this.setState({
  //       listOfProperties: this.props.propertyList,
  //     });
  //   }
  // };
  handleDate = (e) => {
    this.props.date({
      start: e.value[0],
      end: e.value[1],
    });
    console.log("e.value 0", e.value[0]);
    console.log("e.value", e.value);

    this.setState({
      start: e.value[0],
      end: e.value[1],
      dateObj: this.props.dateRange,
      dateError: "",
      clicked: false,
    });

    console.log("Handle date", this.state.start);
    console.log("dateObj", this.state.dateObj);
  };
  handleValidate = () => {
    this.setState({
      clicked: true,
    });
    if (this.state.start == null) {
      this.setState({
        dateError: "Please select the date",
      });
    }
  };
  handleCount = () => {
    let count = 0;
    if ((this.state.childValue + this.state.adultValue) / 4) {
      this.setState({
        roomValue: Math.ceil(this.state.adultValue / 2),
      });
    } else {
      this.setState({
        roomValue: Math.ceil(this.state.childValue / 2),
      });
    }
  };

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
    this.handleCount();
  };
  handleDecChild = () => {
    if (this.state.childValue !== 0) {
      this.setState({
        childValue: this.state.childValue - 1,
      });
    }
    this.handleCount();
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
    this.handleCount();
  };
  handleIncChild = () => {
    this.setState({
      childValue: this.state.childValue + 1,
    });
    this.handleCount();
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
  handleFilter = (e) => {
    console.log(e, "sivangi");
    this.setState({
      searchValue: e,
    });
    this.getLocation(e);
  };
  getLocation = async (data) => {
    let res = await db.getpropertyLocation(data);
    this.props.property(res);

    console.log(res, "sherin");
  };
  executeOnClick(isExpanded) {
    console.log(isExpanded);
  }
  // handleGo=(data)=>{
  //   <Link to={`/basiclayout/${data}`}></Link>
  // }
  handleRoomType = async (data) => {
    // let res = await db.getpropertyRoom(data);
    // this.props.propRoomType(res);
    // if(this.state.start === null || this.state.end ===null){
    //   this.setState({
    //     dateError:"Select Date"
    //   })
    // }
    // else {
    //   <Redirect to={`/basiclayout/${data}`} />
    // }
  };
  // console.log("state inside Home ", this.state);

  render() {
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );

    return (
      <div className="fullContainer">
        <div>
          <img className="banner" src={hotel}></img>
          {/* <h2>Enjoy your stay</h2> */}
          <div
            className={`date ${this.state.dateError !== "" ? "dateError" : ""}`}
          >
            <div
              className="Home-head d-flex w-98"
              style={{ width: "-webkit-fill-available" }}
            >
              <div>
                <input
                  list="browsers"
                  name="browser"
                  id="browser"
                  onChange={(e) => {
                    this.handleFilter(e.target.value);
                  }}
                  placeholder=" Enter City"
                ></input>

                {this.state.cityError !== "" && (
                  <ErrorIcon color="secondary" className="ml-2 mt-8" />
                )}
              </div>
              <div className="datePickerHome">
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
              </div>
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
                      <GroupAddIcon></GroupAddIcon>
                      <p className="value">{`${this.state.roomValue}Rooms`}</p>
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
                          <RemoveIcon />
                        </button>
                      </div>
                      <p className="now">{this.state.roomValue}</p>
                      <div className="incre">
                        <button
                          class="circular ui icon button"
                          onClick={this.handleInc}
                        >
                          <AddIcon />
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
                          <RemoveIcon />
                        </button>
                      </div>
                      <p className="now">{this.state.adultValue}</p>
                      <div className="a-incre">
                        <button
                          class="circular ui icon button"
                          onClick={this.handleIncAdult}
                        >
                          <AddIcon />
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
                          <RemoveIcon />
                        </button>
                      </div>
                      <p className="now">{this.state.childValue}</p>
                      <div className="c-incre">
                        <button
                          class="circular ui icon button"
                          onClick={this.handleIncChild}
                        >
                          <AddIcon />
                        </button>
                      </div>
                    </div>
                  </Menu>
                </div>
              </div>
              {/* <div className="checkButton">
                <Button animated onClick={this.handleValidate} olive>
                  <Button.Content visible>
                    <p>Search</p>
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </div> */}
            </div>
          </div>
        </div>

        {this.props.propertyList.length ? (
          this.props.propertyList.map((data, index) => (
            <div className="homeContainer" key={index}>
              <div className="wrapper">
                <div>
                  <img
                    className="ImageTile"
                    key={index}
                    src={get(data, "Image[0]")}
                  ></img>
                </div>
                <div className="nameDes">
                  <h1>{get(data, "name", "--")}</h1>

                  <p className="starFill">
                    {_.range(
                      0,
                      parseInt(get(data, "ratings").split("/")[0])
                    ).map((i) => (
                      <StarFill style={{ color: "#ffdf00" }} />
                    ))}
                  </p>
                  <ShowMoreText
                    /* Default options */
                    lines={4}
                    more="Show more"
                    less="Show less"
                    className="content-css"
                    anchorClass="my-anchor-css-class"
                    onClick={this.executeOnClick}
                    expanded={false}
                    width={520}
                  >
                    <h6>{get(data, "description", "--")}</h6>
                  </ShowMoreText>
                  <div className="childWrapper">
                    <div className="iconUI">
                      <div className="pin">
                        <GpsFixedIcon></GpsFixedIcon>
                        <p className="pin-des">{get(data, "Address", "--")}</p>
                      </div>
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
                      <div
                        className="viewDetails"
                        onClick={this.handleRoomType(data.PropertyId)}
                      >
                        <Link to={`/basiclayout/${data.PropertyId}`}>
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
          ))
        ) : this.state.searchValue.length ? (
          <div>
            <h2 className="noProp"> Sorry!! No properties available.</h2>
          </div>
        ) : null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    date: bindActionCreators(date, dispatch),
    room: bindActionCreators(room, dispatch),
    property: bindActionCreators(property, dispatch),
    propRoomType: bindActionCreators(propRoomType, dispatch),
  };
};
const mapStateToProps = (state) => {
  return {
    propertyList: get(state, "propertyList", []),
    dateRange: get(state, "dateRange", []),
    roomRange: get(state, "roomRange", []),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
