import React, { Component } from "react";
import "./Comment.css";

class Comment extends Component {
  render() {
    const { onRemoveCom, comId, color, comtext } = this.props;
    return (
      <div className="comment-item">
        <div
          className="remove"
          onClick={e => {
            e.stopPropagation(); // no propagation to onToggle
            onRemoveCom(comId);
          }}
        >
          &times;
        </div>
        <div style={{ color }} className="comment-text">
          <div>{comtext}</div>
        </div>
      </div>
    );
  }
}

export default Comment;
