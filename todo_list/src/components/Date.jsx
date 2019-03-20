import React, { Component } from "react";
import Calendar from "react-calendar";
import "bootstrap/dist/css/bootstrap.css";
import "./Date.css";

class Date extends Component {
  render() {
    const { showCal, onNoDate, onDateChange, onCloseCal } = this.props;
    return (
      <div className={showCal ? "calBlock" : "nothing"}>
        <div className="buttons">
          <button type="button" className="btn btn-primary" onClick={onNoDate}>
            No End Date
          </button>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={onCloseCal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <Calendar onChange={onDateChange} selectRange={true} />
      </div>
    );
  }
}

export default Date;
