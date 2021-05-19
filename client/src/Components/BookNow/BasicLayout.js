import React, { Component } from "react";
import "./BasicLayout.css";

import ImageOne from "../BookNow/Cover.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import RoomNum from "./RoomNum";
import ReactDOM from "react-dom";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

import DisplayTile from "../DisplayTile/DisplayTile";
import ModalCompo2 from "../Modal/ModalCompo2";
import { Room } from "@material-ui/icons";

export class BasicLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // startDate: null,
      // endDate: null,
    };
  }

  setRooms = (event) => {
    // console.log(event.target.value)
    ReactDOM.render(
      <ModalCompo2 total={event.target.value} open={true} />,
      document.getElementById("all-rooms")
    );
  };
  render() {
    const startValue = null;
    const endValue = null;
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
        <div className="date-container">
          <div className="container">
            <DateRangePickerComponent
              placeholder="Check-in/Check-out"
              startDate={startValue}
              endDate={endValue}
              min={minValue}
              format={"dd-MMM-yy"}
              color={"black"}
              className="datepicker"
            ></DateRangePickerComponent>
            <select
              name="Rooms"
              placeholder="Select Value"
              onChange={this.setRooms}
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
        </div>
        <DisplayTile />
        <div className="btn-placement">
          <button className="reserve">Reserve</button>
        </div>
      </div>
    );
  }
}

export default BasicLayout;
