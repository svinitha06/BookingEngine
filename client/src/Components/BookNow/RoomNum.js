import React, { Component } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./BookNow.css";

const RoomNum = (props) => {
  var list = [];
  for (var i = 1; i <= props.total; i++) {
    list.push(i);
  }
  return (
    <div>
      {list.map(function (i) {
        return (
          <div>
            <div id="RoomNum">Room-{i}:</div>
            <div class="col-md-offset-5 col-md-10 d-flex ">
              <label>Adult(s)</label>
              <input
                type="number"
                min="1"
                max="4"
                className="col-md-5 mx-2"
                name="adults"
              />
              <label>Child</label>
              <input
                type="number"
                min="0"
                max="2"
                className="col-md-5 mx-2"
                name="child"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default RoomNum;
