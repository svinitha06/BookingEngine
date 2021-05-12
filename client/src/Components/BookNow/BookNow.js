import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react'
import RoomNum from './RoomNum'
import ReactDOM from "react-dom";
import './BookNow.css'

class BookNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
      }
    setRooms=(event)=>{
        // console.log(event.target.value)
        
        ReactDOM.render(<RoomNum total={event.target.value}/>, document.getElementById("all-rooms"))
    }
    render() {
        return (
          <div className="bookNowDiv">
            <div className="cardDiv">
              <Card className="bookCard">
                <Card.Content>
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col">
                          Arrival
                          <input type="date" id="arrDate"/>
                        </div>
                        <div className="col">
                          Departure
                          <input type="date" id="depDate"/>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      
                      <div className="room-drop">
                        <label for="rooms">Rooms</label>
                        <select name="Rooms" placeholder="Select Value" id="rooms" onChange={this.setRooms}>
                          <option value="0" >Select value</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <div id="all-rooms">
                        </div>
                      </div>
                    </div>
                    <br/>
                    <Button fluid color={"blue"} className="search">Search</Button>
                  </div>
                </Card.Content>
              </Card>
            </div>
          </div>
        );
    }

}


export default connect(null, null)(withRouter(BookNow));