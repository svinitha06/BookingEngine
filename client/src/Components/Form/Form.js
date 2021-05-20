import React, { Component } from "react";
import "./Form.css";

export class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
    };
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

  render() {
    return (
      <div>
        <div className="form">
          <form>
            <h2>Book your Room</h2>
            <div>
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
                onChange={this.handlelastName}
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
