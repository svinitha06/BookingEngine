import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom'
import { Button, Icon } from "semantic-ui-react";
import RoomNum from "./RoomNum";
import ReactDOM from "react-dom";
import "./BookNow.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import {date,room} from "../../actions/index"
import {bindActionCreators} from "redux"
import {get} from "lodash"


class BookNow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end:null,
      dateError:"",
      roomError:"",
      room:null,
      clicked:false
    };
  }
  setRooms = (event) => {
    var rooms=document.getElementById("Rooms").value
    this.props.room({
      rooms
    })
    if(rooms!=0){
      this.setState({
        roomError:"",
        clicked:false
      })
    }
    ReactDOM.render(
      <RoomNum total={event.target.value} />,
      document.getElementById("all-rooms")
    );

  };

  handleDate=(e)=>{
    this.props.date({
      start:e.value[0],
      end: e.value[1]
    })
    this.setState({
      start:e.value[0],
      end: e.value[1],
      dateError:"",
      clicked:false
    })}

  handleValidate=(e)=>{
    this.setState({
      clicked:true
    })
    var rooms=document.getElementById("Rooms").value
      if(this.state.start == null){
        this.setState({
          dateError:"Please select the date"
        })
      }
      if(rooms==0){
        this.setState({
          roomError:"Please select rooms "
        })
      }
  }
  
  

  render() {
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );

    return (
      <div className="bookNowDiv">
        <div className="cardDiv">
          <Card className="bookCard">
            <Card.Content>
              <div className="div">
                <div className="parent-div">
                  <div className={`date ${this.state.dateError !== '' ? "dateError" : ""}`}>
                  <div className="Text">
                    Check-in/Check-out
                    </div>
                    <DateRangePickerComponent
                      placeholder="Check-in/Check-out"
                      startDate={this.state.start}
                      endDate={this.state.end}
                      min={minValue}
                      format={"dd-MMM-yy"}
                      color={"white"}
                      onChange={this.handleDate}
                      className={`${this.state.dateError !== '' ? "dateError" : "great"}`}
                    ></DateRangePickerComponent>
                  </div>

                  <div id="rooms" className="Text">
                    <label className="Text" for="rooms">
                      Rooms
                    </label>
                    <select
                      id="Rooms"
                      placeholder="Select Value"
                      onChange={this.setRooms}
      
                      className={this.state.roomError !== '' ? "roomError" : "hello"}
                    >
                      <option value="0">No.of Room(s)</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>

                <div id="all-rooms"></div>
                <div className="go">
                  <div className="error">
                    {this.state.dateError}
                  </div>
                  <div className="error">
                    {this.state.roomError}
                  </div>
                  <Button id="search" animated inverted color="olive" onClick={this.handleValidate}>
                    <div >
                    {(this.state.dateError=="" && this.state.roomError=="" && this.state.clicked)?
        
                    <Redirect to="/basiclayout" />
                      :null }
                    </div>
                       
                           {/* {this.checkClick} */}
                    <Button.Content visible className="Text"  >Search
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                    
                  </Button>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps=(dispatch)=> {
  return {
      date: bindActionCreators(date, dispatch),
      room: bindActionCreators(room,dispatch)
  }
}
const mapStateToProps = state => ({
  dateRange:  get(state,"dateRange", [])
  
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookNow));
