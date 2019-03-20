import React, { Component } from "react";
import "./Palette.css";
import Color from "./Color";

class Palette extends Component {
  render() {
    const { colors, selected, onSelect } = this.props;
    const colorList = colors.map(color => (
      <Color
        color={color}
        active={selected === color}
        onClick={() => onSelect(color)}
        key={color}
      />
    ));
    return <div className="palette">{colorList}</div>;
  }
}

export default Palette;
