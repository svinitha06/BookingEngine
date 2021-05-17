import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom'
import { Button, Icon } from "semantic-ui-react";
import RoomNum from "./RoomNum";
import ReactDOM from "react-dom";
import "./BNresp.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

class BookNow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  setRooms = (event) => {
    // console.log(event.target.value)
    ReactDOM.render(
      <RoomNum total={event.target.value} />,
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
      <div className="bookNowDiv">
        <div className="cardDiv">
          <Card className="bookCard">
            <Card.Content>
                <div className="parent-div">
                  <div className="Text">
                    Start/End
                    </div>
                  <div className="date">
                    <DateRangePickerComponent
                      placeholder="Check-in/Check-out"
                      startDate={startValue}
                      endDate={endValue}
                      min={minValue}
                      format={"dd-MMM-yy"}
                      color={"white"}
                    ></DateRangePickerComponent>
                  </div>

                  <div className="Text">
                      Rooms
                      </div>
                      <div className="date">
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
                  </div>
                </div>

                <div id="all-rooms"></div>
                <div className="go">
                  <Button  as={NavLink} to='/basiclayout' animated inverted color="olive">
                        
                    <Button.Content visible className="Text"  >Search
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                    
                  </Button>
                </div>
              
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(withRouter(BookNow));
