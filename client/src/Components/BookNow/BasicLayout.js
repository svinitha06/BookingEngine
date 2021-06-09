import React, { Component } from "react";
import "./BasicLayout.css";
import { connect } from "react-redux";
import ImageOne from "../BookNow/Cover3.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import { get } from "lodash";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import DisplayRedux from "../DisplayTile/DisplayRedux";
import { Button } from "semantic-ui-react";
import Menu from "@material-ui/core/Menu";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// export const pureComponentAvailable = true;
// import 'react-calendar/dist/Calendar.css';
import {
  DatePickerComponent,
  DateRangePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import {
  date,
  property,
  room,
  adult,
  child,
  propRoomType,
} from "../../actions/index";
import { DateRangePickerInput } from "react-dates";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Route, Redirect } from "react-router";
import { WindowSidebar } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

// import { StarFill } from "react-bootstrap-icons";

export class BasicLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomAnchor: null,
      roomValue: this.props.roomVal,
      adultValue: this.props.adultVal,
      childValue: this.props.childVal,
      listOfProperties: [],
      dateError: "",
      cityError: "",
      clicked: false,
      open: false,
      city: "",
    };
  }
  // getRoomNum = (numOfRooms) => {
  //   console.log("checking it", numOfRooms);
  // };
  componentDidMount() {
   
    if (true) {
      window.scroll(0, 0);
    }
    
    this.setState({
      start: this.props.dateRange.start,
      end: this.props.dateRange.end,
    });
    // if (performance.navigation.TYPE_RELOAD) {
    //   console.info("This page is reloaded");
    //   // <Redirect to="/"></Redirect>;
    //   <Redirect exact to="/" />;
    // } else {
    //   console.info("This page is not reloaded");
    // }
  }
  // setRooms = (event) => {
  //   ReactDOM.render(
  //     <ModalCompo2 total={event.target.value} open={true} />,
  //     document.getElementById("all-rooms")
  //   );
  //   window.onbeforeunload = function () {
  //     return false;
  //   };
  // };

  handleIncCount = () => {
    // let count = this.state.adultValue + this.state.childValue;
    console.log(
      "Math.floor(this.state.adultValue + this.state.childValue / 3)",
      Math.floor((this.state.adultValue + this.state.childValue) / 3)
    );

    if (
      (this.state.adultValue + this.state.childValue) % 4 == 0 &&
      Math.floor((this.state.adultValue + this.state.childValue) / 3) >=
        this.state.roomValue
    ) {
      this.setState({
        roomValue: this.state.roomValue + 1,
      });
      this.props.room({
        roomValue: this.state.roomValue + 1,
      });
    }
  };
  handleDecCount = () => {
    console.log(this.state.adultValue, "adult");
    console.log(this.state.childValue, "child");
    if (
      (this.state.adultValue + this.state.childValue) % 4 == 0 &&
      Math.floor((this.state.adultValue + this.state.childValue) / 3) <=
        this.state.roomValue
    ) {
      this.setState({
        roomValue: this.state.roomValue - 1,
      });
      this.props.room({
        roomValue: this.state.roomValue - 1,
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

  render() {
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    
    // <Route exact path="/">
    //   {window.location.reload ? <Redirect to="/" /> : null}
    // </Route>;
    
    return (
      <div className="basiclayoutClass">
        <div className="adjustHeight">
          <img src={ImageOne} style={{ width: "100%" }}></img>
        </div>
        {/* DatePicker */}
        <div className="containerBasic">
          <div className="dateContainerTwo">
            <div className="parentContainerDate">
              <div className="leftOne">
                <DateRangePickerComponent
                  placeholder="Check-in/Check-out"
                  startDate={this.props.dateRange.start}
                  endDate={this.props.dateRange.end}
                  min={minValue}
                  format={"dd-MMM-yy"}
                  color={"black"}
                  className="datepicker"
                ></DateRangePickerComponent>
              </div>
            </div>
            <div className="roomDetailsTwo">
              <div className="d-flex">
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  className="roomRangeBasic"
                >
                  <p className="roomText">
                    <GroupAddIcon />
                    <p className="value">{`${this.props.roomVal}Rooms`}</p>
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
                    <p>{this.props.roomVal}</p>
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
                    <p>{this.props.adultVal}</p>
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
                    <p>{this.props.childVal}</p>
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
          </div>
        </div>

        <DisplayRedux />
        {/* if(window.location.reload){
      // this.props.history.push("/")
    window.location.replace('http://localhost:3000/')
     } */}
     {/* {!window.location.reload ? null :window.location.assign('http://localhost:3000/')} */}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  dateRange: get(state, "dateRange", []),
  // roomRange: get(state, "roomRange", []),
  propertyList: get(state, "propertyList", []),
  roomVal: state.roomVal,
  adultVal: state.adultVal,
  childVal: state.childVal,
});
const mapDispatchToProps = (dispatch) => {
  return {
    date: bindActionCreators(date, dispatch),
    room: bindActionCreators(room, dispatch),
    adult: bindActionCreators(adult, dispatch),
    child: bindActionCreators(child, dispatch),
    // property: bindActionCreators(property, dispatch),
    // propRoomType: bindActionCreators(propRoomType, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BasicLayout));
