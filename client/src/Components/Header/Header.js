import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Menu, MenuItem, Segment } from "semantic-ui-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import "./Header.css";
export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
    };
  }

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };

  render() {
    return (
      <div className="my-div">
        <Segment className="my-seg">
          <Menu secondary className="my-menu">
            <div className="logo">
              <MenuItem>
                <h1>Booking Engine</h1>
              </MenuItem>
            </div>
            <Menu.Item position="right" as={NavLink} to="/" exact>
              Home
            </Menu.Item>
            <Menu.Item position="right" as={NavLink} to="/aboutUs">
              About Us
            </Menu.Item>
            <Menu.Item position="right" as={NavLink} to="/accommodation">
              Accomodation
            </Menu.Item>
            <Menu.Item position="right">
              <Button as={NavLink} to="/booknow">
                Book Now
              </Button>
              {/* {this.state.clicked ? } */}
              {/* <GiHamburgerMenu
                className="hamburger"
                size="30px"
                onClick={this.handleClick}
              /> */}
            </Menu.Item>
          </Menu>
        </Segment>
      </div>
    );
  }
}

export default Header;
