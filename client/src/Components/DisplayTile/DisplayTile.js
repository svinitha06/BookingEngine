import React, { Component } from "react";
import ImageTile from "../DisplayTile/Image.jpeg";
import "./DisplayTile.css";

class DisplayTile extends Component {
  render() {
    return (
      <div>
        <div className="wrapper">
          <div>
            <img className="ImageTile" src={ImageTile}></img>
          </div>
          <div>
            <h2>Super AC</h2>
            <p>
              Renovated & are located at the heart of the resort close to the
              pool and activity area with a separate veranda for a relaxing
              sit-out. They are well furnished with one double bed and fully
              equipped with air-conditioner, LCD TV, tea/coffee maker,
              Refrigerator and telephone. Occupancy of a minimum 5 to 6 Persons.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayTile;
