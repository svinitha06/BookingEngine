import React, { Component } from "react";
import "./BasicLayout.css";
import { connect } from "react-redux";
import ImageOne from "../BookNow/Cover.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import { get } from "lodash";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import RoomNum from "./RoomNum";
import ReactDOM from "react-dom";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

import DisplayTile from "../DisplayTile/DisplayTile";
import ModalCompo2 from "../Modal/ModalCompo2";
import { Room } from "@material-ui/icons";
import Details from "../DisplayTile/roomTypeDetail.json";
// import PseudoDisplay from "../DisplayTile/DisplayTileTwo";
import DisplayTileTwo from "../DisplayTile/DisplayTileTwo";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";
export class BasicLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // startDate: null,
      // endDate: null,
    };
  }
  componentDidMount() {
    console.log(this.props, "here");
    this.setState({
      start: this.props.dateRange.start,
      end: this.props.dateRange.end,
    });
  }
  setRooms = (event) => {
    // console.log(event.target.value)
    ReactDOM.render(
      <ModalCompo2 total={event.target.value} open={true} />,
      document.getElementById("all-rooms")
    );
  };
  // handleRedirect = () =>{
  //   history.pus
  // }
  render() {
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );

    return (
      <div>
        <div className="wrapImage">
          <img src={ImageOne}></img>
        </div>
        {/* DatePicker */}
        <div className="container">
          <DateRangePickerComponent
            placeholder="Check-in/Check-out"
            startDate={this.state.start}
            endDate={this.state.end}
            min={minValue}
            format={"dd-MMM-yy"}
            color={"black"}
            className="datepicker"
          ></DateRangePickerComponent>
          <select
            name="Rooms"
            placeholder="Select Value"
            onChange={this.setRooms}
            value={this.props.roomRange.rooms}
          >
            <option value="0">No.of Room(s)</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <div id="all-rooms"></div>
        </div>
        <DisplayTile />
        {/* <DisplayTileTwo /> */}
        <div className="total-price">
          <h3>
            <span>Total Price: 0000</span>
          </h3>
        </div>
        <div className="btn-placement">
          {/* <button className="reserve" onClick={this.handleRedirect}>
            Reserve
          </button> */}
          <Button className="reserve" as={NavLink} to="/form">
            Reserve
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  dateRange: get(state, "dateRange", []),
  roomRange: get(state, "roomRange", []),
});

export default connect(mapStateToProps, null)(BasicLayout);
