import React, { Component } from "react";
import "./Form.css";
import Date from "./Date";

class Form extends Component {
  render() {
    const {
      value,
      dateSelected,
      showCal,
      onOpenCal,
      onDateChange,
      onNoDate,
      onChange,
      onKeyPress,
      onCreate,
      color,
      onCloseCal
    } = this.props;

    return (
      <div className="form">
        <Date
          dateSelected={dateSelected}
          showCal={showCal}
          onDateChange={onDateChange}
          onNoDate={onNoDate}
          onCloseCal={onCloseCal}
        />
        <input
          placeholder="Enter your task"
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          style={{ color }}
        />
        <div
          className="create-button"
          onClick={onOpenCal}
          style={showCal ? { pointerEvents: "none" } : {}}
        >
          Time Interval
        </div>
        <div className="create-button" onClick={onCreate}>
          ADD
        </div>
      </div>
    );
  }
}

export default Form;
