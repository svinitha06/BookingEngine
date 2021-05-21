import React, { Component } from "react";
import "./Form.css";
import { get } from "lodash";
import { connect } from "react-redux";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";
export class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      gender: "",
      address: "",
    };
  }
  componentDidMount() {
    this.setState({
      start: this.props.dateRange.start,
      end: this.props.dateRange.end,
    });
  }
  handleFirstName = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  handleLastName = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleContact = (event) => {
    this.setState({
      contact: event.target.value,
    });
  };
  handleGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };
  handleAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };

  render() {
    const minValue = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    return (
      <div className="container-form">
        <div className="form">
          <div className="form-date">
            <Button className="form-btn" as={NavLink} to="/basiclayout">
              Back
            </Button>
            <div className="final-date">
              <span>
                <h6>Check-in / Check-out</h6>
              </span>
              <DateRangePickerComponent
                placeholder="Check-in/Check-out"
                startDate={this.state.start}
                endDate={this.state.end}
                min={minValue}
                format={"dd-MMM-yy"}
                color={"black"}
                className="form-datepicker"
                id="datepickeridform"
              ></DateRangePickerComponent>
            </div>
          </div>

          <form>
            <h2>Book your Room</h2>
            <div className="form-contents">
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleFirstName}
              ></input>
              <br />
              <label type="text" placeholder="Last Name">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleLastName}
              ></input>
              <br />
              <label>Email Address</label>
              <input
                type="email"
                placeholder="E-mail"
                value={this.state.email}
                onChange={this.handleEmail}
              ></input>
              <br />
              <label>Mobile No.</label>
              <input
                type="number"
                placeholder="Mobile"
                value={this.state.contact}
                onChange={this.handleContact}
              ></input>
              <br />
              <label>Gender</label>
              <label>
                Male
                <input
                  type="radio"
                  value="Male"
                  checked={this.state.gender === "Male"}
                  onChange={this.handleGender}
                ></input>
              </label>
              <label>
                Female
                <input
                  type="radio"
                  value="Female"
                  checked={this.state.gender === "Female"}
                  onChange={this.handleGender}
                ></input>
              </label>
              <br></br>
              <h4>Billing address</h4>
              <label>Address</label>
              <input
                type="text-area"
                value={this.state.address}
                onChange={this.handleAddress}
              ></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  dateRange: get(state, "dateRange", []),
  roomRange: get(state, "roomRange", []),
});

export default connect(mapStateToProps, null)(Form);
