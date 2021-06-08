import React from "react";
import "./Home.css";
import { get, functions, bind, isEmpty, trim } from "lodash";
import _ from "lodash";
import Modal from "@material-ui/core/Modal";
import Carousel from "react-bootstrap/Carousel";
import giphy from "../../asset/giphy.gif";
// import Carousel from "react-elastic-carousel";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import RemoveIcon from "@material-ui/icons/Remove";
import { StarFill } from "react-bootstrap-icons";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import ShowMoreText from "react-show-more-text";
import PermScanWifiIcon from "@material-ui/icons/PermScanWifi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, Icon } from "semantic-ui-react";
import Menu from "@material-ui/core/Menu";
import tryL from "../../asset/try.jpg";
import ReactTooltip from "react-tooltip";
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
      start: this.props.dateRange.start,
      end: this.props.dateRange.start,
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
      flag: true,
      errorAPI: false,
      errorOffline: false,
    };
  }
  componentDidMount() {
    if (true) {
      window.scroll(0, 0);
    }
    if (this.state.flag) {
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
    }
    this.setState({ flag: !this.state.flag });

    this.getcall();
  }
  getcall = async () => {
    let res = await db.getproperty().catch((err) => {
      console.log("errorApi");
      // return err
      this.setState({
        errorAPI: !this.state.errorAPI,
        // errorOffline: !this.state.errorOffline,
      });
    });

    this.props.property(res);
    this.setState({
      loader: false,
    });

    console.log(res, "getProperty");
  };

  handleDate = (e) => {
    this.props.date({
      start: e.value[0],
      end: e.value[1],
      dateError: "",
    });

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

      let res = await db
        .getFilteredSearch({
          location: this.state.searchValue,
          roomsrequired: this.state.roomValue,
        })
        .catch((err) => {
          this.setState({
            loader: false,
            errorOffline: true,
            open:true
          });
          return Promise.reject(err);
        });
      this.props.property(res.data);
      this.setState({
        loader: false,
      });
      console.log(res, "search");
    }
  };
  handleIncCount = () => {
    // let count = this.state.adultValue + this.state.childValue;
    if ((this.state.adultValue + this.state.childValue) % 4 == 0) {
      this.setState({
        roomValue: this.state.roomValue + 1,
      });
    }
    this.props.room({
      roomValue: this.state.roomValue + 1,
    });
   
  };
  handleDecCount = () => {
    console.log(this.state.adultValue, "adult");
    console.log(this.state.childValue, "child");
    if ((this.state.adultValue + this.state.childValue) % 4 == 0) {
      this.setState({
        roomValue: this.state.roomValue - 1,
      });
    }
    this.props.room({
      roomValue: this.state.roomValue - 1,
    });
    
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
      this.props.room({
        roomValue: this.state.roomValue - 1,
      });
      this.setState(
        {
          adultValue: this.state.adultValue - 1,
        },
        () => this.handleDecCount()
      );
    }
    // this.handleDecCount()
  };
  handleDecChild = () => {
    if (this.state.childValue !== 0) {
      this.props.child({
        childValue: this.state.childValue - 1,
      });
      this.props.room({
        roomValue: this.state.roomValue - 1,
      });
      this.setState(
        {
          childValue: this.state.childValue - 1,
        },
        () => this.handleDecCount()
      );
    }
    // this.handleDecCount()
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
    this.handleIncCount();
  };
  handleIncChild = () => {
    this.props.child({
      childValue: this.state.childValue + 1,
    });
    this.setState({
      childValue: this.state.childValue + 1,
    });
    this.handleIncCount();
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
    if (this.state.errorOffline === true) {
      this.setState({
        // searchValue: e,
        // cityError: "",
        loader: false,
        open: true,
        // errorOffline:false
      });
    } else {
      this.setState({
        searchValue: e,
        cityError: "",
        loader: true,
        open: false,
        // errorOffline:false
      });
    }
console.log(this.state.errorOffline,this.state.open,"errorOffline check")

  };
  getLocation = async (data) => {
    let res = await db.getpropertyLocation(data).catch((err) => {
      this.setState({
        loader: false,
        errorOffline: true,
        open:true
      });
console.log(this.state.errorOffline,this.state.open,"insidegetlocation")
      return Promise.reject(err);
    });
    this.props.property(res);
    console.log(res, res.length, "come on");
    if (res.length === 0) {
      let response = await db.getproperty();
      console.log(response, "response");
      this.props.emptyProperty(response);
    }
    this.setState({
      loader: false,
    });

    console.log(res, "sherin");
  };

  executeOnClick(isExpanded) {
    console.log(isExpanded);
    // expanded(true)
  }
  handleHomeClose = () => {
    this.setState({
      open: false,
    });
  };
  handleViewErrorOff=()=>{
    this.setState({
      open:true,
      errorOffline:true
    })
  }
  render() {
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );

    // console.log(this.props.propertyList[0].PropertyId, "sherin");
    // log()
    if(!navigator.onLine && this.state.errorAPI && this.state.errorOffline){
      return <h1>Network Error : Check your connection</h1>
    }

    return (
      <div className="fullContainer">
        <div>
          <div className="banner">
            <img src={tryL} width="110%" style={{ height: "64vh" }}></img>
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
                    this.handleFilter(e.target.value.toLowerCase());
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
        {this.state.errorAPI && navigator.onLine &&(
          <h1 className="errorAPI">Error fetching data</h1>
        )}

        {this.state.errorOffline && (
          <Modal
            open={this.state.open}
            onClose={this.handleHomeClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className="errorOffline">
              <p className="cancel" onClick={this.handleHomeClose}>
                X
              </p>

              <h1>
                Lost internet connection{" "}
                <PermScanWifiIcon style={{ color: "red" }} />
              </h1>
              <p>
                It appears you are offline. Any changes you make to your page
                may be lost. Please connect to the internet and try again !
                Kindly reload the page.
              </p>
            </div>
          </Modal>
        ) }

        {this.state.loader && <CircularProgress className="loadingSym" />}
        {this.props.propertyList.length && !this.state.loader && !this.state.errorAPI? (
          this.props.propertyList.map((data, index) => (
            <div className="homeContainer" key={index}>
              <div className="wrapper">
                <div className="carousel-NOW">
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={get(data, "Image[0]")}
                        alt="First slide"
                        height="250vh"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={get(data, "Image[1]")}
                        alt="Second slide"
                        height="250vh"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={get(data, "Image[2]")}
                        alt="Third slide"
                        height="250vh"
                      />
                    </Carousel.Item>
                  </Carousel>
                </div>

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
                        <p className="pin-des">{get(data, "location", "--")}</p>
                      </div>
                      <div className="pin">
                        <PhoneInTalkIcon></PhoneInTalkIcon>
                        <p className="pin-des">{get(data, "contact", "--")}</p>
                      </div>
                    </div>
                    <div>
                      <div className="viewDetails" id={data.name}>
                        <Link
                          to={{
                            pathname: `/basiclayout/${data.PropertyId}`,
                            props: { hotelName: get(data, "name", "--") },
                          }}
                        >
                          <button onClick={this.handleViewErrorOff}>View Details</button>
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
            <p className="customMade2">
              <i className="customMade">Related Search : </i>Check out the
              properties available{" "}
            </p>
          </div>
        ) : null}
        {!this.props.propertyList.length && !isEmpty(this.state.searchValue)
          ? ""
          : null}
{/* {this.state.errorAPI && (
          <h1 className="errorAPI">Error fetching data</h1>
        )} */}
        {!navigator.onLine ?<h1 className="networkError">Network error:Check your internet connection</h1> :null}
        {!this.props.propertyList.length && !this.state.errorAPI
          ? // && this.state.errorOffline
            this.props.propertyEmptyList.map((data, index) => (
              <div className="homeContainer" key={index}>
                <div className="wrapper">
                  <div className="carousel-NOW">
                    <Carousel>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={get(data, "Image[0]")}
                          alt="First slide"
                          height="250vh"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={get(data, "Image[1]")}
                          alt="Second slide"
                          height="250vh"
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={get(data, "Image[2]")}
                          alt="Third slide"
                          height="250vh"
                        />
                      </Carousel.Item>
                    </Carousel>
                  </div>

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
                            {get(data, "location", "--")}
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
                        <div className="viewDetails" id={data.name}>
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
