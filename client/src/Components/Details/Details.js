import React, { Component } from "react";
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

export default class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return <div>Hello Details</div>;
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
      hotelDetails: bindActionCreators(hotelDetails, dispatch),
      
      
    };
  };
  const mapStateToProps = (state) => ({
    dateRange: get(state, "dateRange", []),
    roomRange: get(state, "roomRange", []),
    roomDetailsList: get(state, "roomDetailsList", []),
    roomTypeRatesData: get(state, "roomTypeRatesData", []),
    propertyList: get(state, "propertyList", []),
    customerDetails:get(state,"customerDetails",[])
  });
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Details));