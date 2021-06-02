import "./HotelDetail.css";
import { connect } from "react-redux";
import { get } from "lodash";
import React, { Component } from "react";
import {
  date,
  property,
  room,
  propRoomType,
  roomTypesRate,
} from "../../actions/index";
import { bindActionCreators } from "redux";
import Image from "../Form/Image.jpeg";

class HotelDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: "",
      end: "",
    };
  }
  componentDidMount() {
    this.setState({
      start: this.props.dateRange.start,
      end: this.props.dateRange.end,
    });
  }

  render() {
    // console.log(this.props.dateRange.start);
    return (
      <div>
        <div>
          <div className="hotelDetailContainer">
            <div className="firstContainer">
              <div className="hotelImage">
                <img src={Image}></img>
              </div>
              <div>
                <div>
                  <h4>Crown </h4>
                </div>
                <div>3/5</div>
                <div>
                  <h5>Chennai ,India</h5>
                </div>
              </div>
            </div>
            <div className="secondContainer">
              <div>
                <h3>Check-in Date</h3> {this.state.start}
              </div>
              <div>
                <h3>Check-ot Date</h3> 2 june 20221
              </div>

              <div>
                <h3>Rooms</h3> 1
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dateRange: get(state, "dateRange", []),
  roomRange: get(state, "roomRange", []),
  roomDetailsList: get(state, "roomDetailsList", []),
  roomTypeRatesData: get(state, "roomTypeRatesData", []),
  propertyList: get(state, "propertyList", []),
});
// const mapDispatchToProps = (dispatch) => {
//   return {
//     date: bindActionCreators(date, dispatch),
//     room: bindActionCreators(room, dispatch),
//     adult: bindActionCreators(adult, dispatch),
//     child: bindActionCreators(child, dispatch),
//     property: bindActionCreators(property, dispatch),
//     propRoomType: bindActionCreators(propRoomType, dispatch),
//     emptyProperty: bindActionCreators(emptyProperty, dispatch),
//   };
// };

export default connect(mapStateToProps, null)(HotelDetail);
