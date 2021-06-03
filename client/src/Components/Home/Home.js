import React from "react";
import "./Home.css";
import { get, functions, bind, isEmpty, trim } from "lodash";
import _ from "lodash";
import giphy from "../../asset/giphy.gif";
import Carousel from "react-elastic-carousel";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import RemoveIcon from "@material-ui/icons/Remove";
import { StarFill } from "react-bootstrap-icons";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import ShowMoreText from "react-show-more-text";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, Icon } from "semantic-ui-react";
import Menu from "@material-ui/core/Menu";
import tryL from "../../asset/try.jpg";
import { withRouter, Link } from "react-router-dom";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import PinDropIcon from "@material-ui/icons/PinDrop";
import { connect } from "react-redux";
import ErrorIcon from "@material-ui/icons/Error";
import {
  date,
  property,
  room,
  propRoomType,
  adult,
  child,
  emptyProperty,
} from "../../actions/index";
import { bindActionCreators } from "redux";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import * as db from "../../api/index";

let searchValidator = null;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end: null,
      roomAnchor: null,
      roomValue: this.props.roomVal,
      adultValue: this.props.adultVal,
      childValue: this.props.childVal,
      listOfProperties: [],
      dateError: "",
      cityError: "",
      clicked: false,
      open: false,
      searchValue: "",
      dateObj: [],
      loader: true,
      viewDetailsError: "",
    };
  }
  componentDidMount() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.props.date({ start: new Date(), end: tomorrow });
    this.setState({
      start: today,
      end: tomorrow,
      dateObj: this.props.dateRange,
      dateError: "",
      clicked: false,
    });
    this.getcall();
    // this.getLocation()
    // this.getRoomRates();
  }
  getcall = async () => {
    let res = await db.getproperty();
    this.props.property(res);
    this.setState({
      loader: false,
    });
    // console.log(res, "sherin");
  };

  handleDate = (e) => {
    this.props.date({
      start: e.value[0],
      end: e.value[1],
      dateError: "",
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
  handleValidate = async () => {
    if (this.state.searchValue === "") {
      this.setState({
        cityError: "Enter city",
        loader: false,
      });
    } else {
      this.setState({
        loader: true,
      });
      let res = await db.getFilteredSearch({
        location: this.state.searchValue,
        roomsrequired: this.state.roomValue,
      });
      this.props.property(res.data);
      this.setState({
        loader: false,
      });
      console.log(res, "search");
    }
  };
  handleCount = () => {
    let count = 0;
    if (this.state.adultValue/4) {
      this.setState({
        roomValue: Math.ceil(this.state.adultValue / 2)
      });
    } else {
      this.setState({
        roomValue: Math.ceil(this.state.childValue / 2),
      });
    }
  };

  handleDec = () => {
    if (this.state.roomValue !== 1) {
      this.props.room({
        roomValue: this.state.roomValue - 1,
      });
      this.setState({
        roomValue: this.state.roomValue - 1,
      });
    }
  };
  handleDecAdult = () => {
    if (this.state.adultValue !== 1) {
      this.props.adult({
        adultValue: this.state.adultValue - 1,
      });
      this.setState({
        adultValue: this.state.adultValue - 1,
      });
    }
    // this.handleCount();
  };
  handleDecChild = () => {
    if (this.state.childValue !== 0) {
      this.props.child({
        childValue: this.state.childValue - 1,
      });
      this.setState({
        childValue: this.state.childValue - 1,
      });
    }
    // this.handleCount();
  };
  handleInc = () => {
    this.props.room({
      roomValue: this.state.roomValue + 1,
    });
    this.setState({
      roomValue: this.state.roomValue + 1,
    });
  };
  handleIncAdult = () => {
    this.props.adult({
      adultValue: this.state.adultValue + 1,
    });
    this.setState({
      adultValue: this.state.adultValue + 1,
    });
    this.handleCount();
  };
  handleIncChild = () => {
    this.props.child({
      childValue: this.state.childValue + 1,
    });
    this.setState({
      childValue: this.state.childValue + 1,
    });
    // this.handleCount();
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
  handleFilter = async (e) => {
    this.setState({
      searchValue: e,
      cityError: "",
      loader: true,
    });
    if (!trim(e)) {
      let res = await db.getproperty();
      this.props.property(res);
    }
    if (!searchValidator) {
      searchValidator = setTimeout(() => {
        this.getLocation(e);
      }, 1000);
    } else {
      clearTimeout(searchValidator);
    }
    this.getLocation(e);
  };
  getLocation = async (data) => {
    let res = await db.getpropertyLocation(data);
    this.props.property(res);
    console.log(res, res.length, "come on");
    if (res.length === 0) {
      let res = await db.getproperty();
      console.log(res, "response");
      this.props.emptyProperty(res);
    }
    this.setState({
      loader: false,
    });

    console.log(res, "sherin");
  };

  executeOnClick(isExpanded) {
    console.log(isExpanded);
  }
  // handleGo=(data)=>{
  //   <Link to={`/basiclayout/${data}`}></Link>
  // }

  render() {
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    // console.log(this.props.propertyList[0].PropertyId, "sherin");
    // log()
    return (
      <div className="fullContainer">
        <div>
          <div className="banner">
            <img src={tryL} width="110%" style={{ height: "76vh" }}></img>
            {/* <div className="banner-content">
              {/* <h2>Enjoy your stay</h2> */}
              {/* <p>StayCation</p>
            </div> */} 
          </div>
          <div
            className={`date ${this.state.dateError !== "" ? "dateError" : ""}`}
          >
            <div
              className="Home-head d-flex w-98"
              style={{ width: "-webkit-fill-available" }}
            >
              <div className="d-flex">
                <input
                  list="browsers"
                  name="browser"
                  id="browser"
                  onChange={(e) => {
                    this.handleFilter(e.target.value);
                  }}
                  className={`${
                    this.state.cityError !== "" ? "cityError" : ""
                  }`}
                  placeholder=" Enter City"
                ></input>

                {this.state.cityError !== "" && (
                  <ErrorIcon color="secondary" className="ml-2 mt-4" />
                )}
              </div>
              <div className="d-flex datePickerHome">
                <DateRangePickerComponent
                  placeholder="enter date"
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
                      <p className="menu-drop">Rooms</p>
                      <div className="decre">
                        <button
                          className="circular ui icon button"
                          onClick={this.handleDec}
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                      <p className="now">{this.state.roomValue}</p>
                      <div className="incre">
                        <button
                          className="circular ui icon button"
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
                          className="circular ui icon button"
                          onClick={this.handleDecAdult}
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                      <p className="now">{this.state.adultValue}</p>
                      <div className="a-incre">
                        <button
                          className="circular ui icon button"
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
                          className="circular ui icon button"
                          onClick={this.handleDecChild}
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                      <p className="now">{this.state.childValue}</p>
                      <div className="c-incre">
                        <button
                          className="circular ui icon button"
                          onClick={this.handleIncChild}
                        >
                          <AddIcon />
                        </button>
                      </div>
                    </div>
                  </Menu>
                </div>
              </div>
              <div className="checkButton">
                <Button animated onClick={this.handleValidate}>
                  <Button.Content visible>
                    <p className="searchButton">Search</p>
                  </Button.Content>
                  <Button.Content hidden>
                    <SearchIcon />
                  </Button.Content>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {this.state.loader && <CircularProgress className="loadingSym" />}
        {this.props.propertyList.length && !this.state.loader ? (
          this.props.propertyList.map((data, index) => (
            <div className="homeContainer" key={index}>
              <div className="wrapper">
                <Carousel showArrows={false}>
                  <div style={{ marginLeft: "12em" }}>
                    <img
                      className="ImageTile"
                      key={index}
                      src={get(data, "Image[0]")}
                    ></img>
                  </div>
                  <div>
                    <img
                      className="ImageTile"
                      key={index}
                      src={get(data, "Image[1]")}
                    ></img>
                  </div>
                  <div>
                    <img
                      className="ImageTile"
                      key={index}
                      src={get(data, "Image[2]")}
                    ></img>
                  </div>
                  <div>
                    <img
                      className="ImageTile"
                      key={index}
                      src={get(data, "Image[3]")}
                    ></img>
                  </div>
                </Carousel>

                <div className="nameDes">
                  <h1>{get(data, "name", "--")}</h1>

                  <p className="starFill">
                    {_.range(
                      0,
                      parseInt(get(data, "ratings", "").split("/")[0])
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
                        <p className="pin-des">{get(data,"location", "--")}</p>
                      </div>
                      <div className="pin">
                        <PhoneInTalkIcon></PhoneInTalkIcon>
                        <p className="pin-des">{get(data, "contact", "--")}</p>
                      </div>
                    </div>
                    <div>
                      <div className="viewDetails">
                        <Link
                          to={{
                            pathname: `/basiclayout/${data.PropertyId}`,
                            props: { hotelName: get(data, "name", "--") },
                          }}
                        >
                          <button>View Details</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : this.state.searchValue.length && !this.state.loader ? (
          <div className="d-flex">
            <h2 className="noProp"> Sorry!! No properties available.</h2>

            <img className="image-error" src={giphy} alt="loading..."></img>

            
          
          </div>
        ) : null}
        {!this.props.propertyList.length && !isEmpty(this.state.searchValue)? "":null}
        {/* {console.log(this.props,"now check")} */}
        
            <p className="customMade2"><i className="customMade">Related Search : </i>Check out the properties available </p>
        {!this.props.propertyList.length?this.props.propertyEmptyList.map((data, index) => (
            <div className="homeContainer" key={index}>
              <div className="wrapper">
                <Carousel showArrows={false}>
                  <div style={{marginLeft:"12em"}}>
                    <img
                      className="ImageTile"
                      key={index}
                      src={get(data, "Image[0]")}
                    ></img>
                  </div>
                  <div>
                    <img
                      className="ImageTile"
                      key={index}
                      src={get(data, "Image[1]")}
                    ></img>
                  </div>
                  <div>
                    <img
                      className="ImageTile"
                      key={index}
                      src={get(data, "Image[2]")}
                    ></img>
                  </div>
                  <div>
                    <img
                      className="ImageTile"
                      key={index}
                      src={get(data, "Image[3]")}
                    ></img>
                  </div>
                </Carousel>

                  <div className="nameDes">
                    <h1>{get(data, "name", "--")}</h1>

                    <p className="starFill">
                      {_.range(
                        0,
                        parseInt(get(data, "ratings", "").split("/")[0])
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
                          <p className="pin-des">
                            {get(data, "Address", "--")}
                          </p>
                        </div>
                        <div className="pin">
                          <PinDropIcon
                            style={{ color: "#FF5733" }}
                          ></PinDropIcon>
                          <p className="pin-des">
                            {get(data,"location", "--")}
                          </p>
                        </div>
                        <div className="pin">
                          <PhoneInTalkIcon></PhoneInTalkIcon>
                          <p className="pin-des">
                            {get(data, "contact", "--")}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="viewDetails">
                          <Link
                            to={{
                              pathname: `/basiclayout/${data.PropertyId}`,
                              props: { hotelName: get(data, "name", "--") },
                            }}
                          >
                            <button>View Details</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    date: bindActionCreators(date, dispatch),
    room: bindActionCreators(room, dispatch),
    adult: bindActionCreators(adult, dispatch),
    child: bindActionCreators(child, dispatch),
    property: bindActionCreators(property, dispatch),
    propRoomType: bindActionCreators(propRoomType, dispatch),
    emptyProperty: bindActionCreators(emptyProperty, dispatch),
  };
};
const mapStateToProps = (state) => {
  return {
    propertyList: get(state, "propertyList", []),
    dateRange: get(state, "dateRange", []),
    roomVal: state.roomVal,
    adultVal: state.adultVal,
    childVal: state.childVal,
    propertyEmptyList: get(state, "propertyEmptyList", []),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
