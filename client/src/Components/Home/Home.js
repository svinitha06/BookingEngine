import React from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { get, forEach, functions } from "lodash";
import _ from "lodash";
import { StarFill } from "react-bootstrap-icons";
import button from "@material-ui/core/Button";
import ShowMoreText from "react-show-more-text";
import { Button, Icon } from "semantic-ui-react";
import Menu from "@material-ui/core/Menu";
import hotel3 from "./home3.jpg";
import hotel from "../../asset/hotel.jpg";
import { withRouter, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import PinDropIcon from "@material-ui/icons/PinDrop";
import StarIcon from "@material-ui/icons/Star";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { connect } from "react-redux";
import InputAdornment from "@material-ui/core/InputAdornment";
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
      cityError: "",
      clicked: false,
      open: false,
      city:""
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
  componentDidUpdate = () => {
    console.log(this.props, "hello");
    if (!this.state.listOfProperties.length) {
      this.setState({
        listOfProperties: this.props.propertyList,
      });
    }
  };
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
    const listCityProp = [...this.state.listOfProperties];
    if (e == "") {
      console.log("citytyyyy");
      this.setState({
        listOfProperties: listCityProp,
      });
      console.log(this.state.listOfProperties, "im here");
      return;
    }
    if(this.state.city !== this.state.listOfProperties.location){
      console.log("loosu")
      this.setState({
        cityError:"Enter valid city"
      })
    }

    const cityDrop = listCityProp.filter((city) => city.location.includes(e));

    this.setState({
      listOfProperties: cityDrop,
    });

    console.log(this.state.listOfProperties);
  };
  executeOnClick(isExpanded) {
    console.log(isExpanded);
  }

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
          <div
            className={`date ${this.state.dateError !== "" ? "dateError" : ""}`}
          >
            <div
              className="Home-head d-flex w-98"
              style={{ width: "-webkit-fill-available" }}
            >
              <div>
                {/* <TextField
                  id="input-with-icon-textfield"
                  placeholder="Enter city"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationSearchingIcon />
                      </InputAdornment>
                    ),
                  }}
                >  </TextField> */}
                 {/* className={`city ${this.state.cityError !== "" ? "cityError" : ""}`}> */}
                <input
                  list="browsers"
                  name="browser"
                  id="browser"
                  onChange={(e) => {
                    this.handleFilter(e.target.value);
                  }}
                  placeholder=" Enter City"
                ></input>
                  
                <datalist id="browsers">
                  <option>Chennai</option>
                  <option>Bangalore</option>
                  <option>Kolkata</option>
                  <option>Delhi</option>
                  <option>Hyderabad</option>
                </datalist>
                
                {this.state.cityError !== "" && (
                <ErrorIcon color="secondary" className="ml-2 mt-8" />
              )}
              
               
              </div>

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
                <Button animated onClick={this.handleValidate} olive>
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

        {this.state.listOfProperties.map((data, index) => (
          <div className="homeContainer">
            <div className="wrapper">
              <div>
                <img
                  className="ImageTile"
                  key={index}
                  src={get(data, "Image[0]", "--")}
                  onMouseOver={this.handleImage}
                ></img>
              </div>
              <div className="nameDes">
                <h1 style={{marginTop:"6px"}}>{get(data, "name", "--")}</h1>

                <p className="starFill">
                  {_.range(0, parseInt(get(data, "ratings").split("/")[0])).map(
                    (i) => (
                      <StarFill style={{ color: "#ffdf00" }} />
                    )
                  )}
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
                    <div className="viewDetails">
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
