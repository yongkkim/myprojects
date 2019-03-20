import React, { Component } from "react";
import "./CommentForm.css";

class CommentForm extends Component {
  render() {
    const { text, onChange, onKeyPress, onCreate, color } = this.props;

    return (
      <div className="commentForm">
        <input
          placeholder="Type your Comment"
          value={text}
          onChange={onChange}
          onKeyPress={onKeyPress}
          style={{ color }}
        />
        <div className="create-commentbutton" onClick={onCreate}>
          ADD
        </div>
      </div>
    );
  }
}

export default CommentForm;
