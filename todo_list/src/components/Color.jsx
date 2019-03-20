import React, { Component } from "react";
import "./Color.css";

class Color extends Component {
  render() {
    const { active, color, onClick } = this.props;
    return (
      <div
        className={`color ${active && "active"}`}
        style={{ background: color }}
        onClick={onClick}
      >
        <span className={`underline ${active && "active"}`} />
      </div>
    );
  }
}

export default Color;
