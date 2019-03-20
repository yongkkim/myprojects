import React, { Component } from "react";
import "./TodoItem.css";
import CommentList from "./CommentList";

const colors = ["#343a40", "#f03e3e", "#12b886", "#228ae6"];

class TodoItem extends Component {
  comId = 0;

  state = {
    comtext: "",
    comments: [],
    commentcolor: "#343a40",
    showCom: false
  };

  handleOpenComment = id => {
    this.setState({
      showCom: id === this.props.id ? true : false
    });
  };

  handleSelectCol = commentcolor => {
    this.setState({
      commentcolor
    });
  };

  handleChange = e => {
    this.setState({
      comtext: e.target.value
    });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };

  handleCreate = () => {
    const { comtext, comments, commentcolor } = this.state;
    console.log(this.comId);
    this.setState({
      comtext: "",
      comments: comments.concat({
        comId: this.comId++,
        comtext: comtext,
        commentcolor
      })
    });
  };

  handleRemoveCom = comId => {
    this.setState({
      comments: this.state.comments.filter(comment => comment.comId !== comId)
    });
  };

  render() {
    const { comments, commentcolor, showCom, comtext } = this.state;
    const { onToggle, onRemove, id, color, checked, text } = this.props;
    return (
      <div>
        <div className="todo-item" onClick={() => onToggle(id)}>
          <div
            className="remove"
            onClick={e => {
              e.stopPropagation(); // no propagation to onToggle
              onRemove(id);
            }}
          >
            &times;
          </div>
          <div
            style={{ color }}
            className={`todo-text ${checked ? "checked" : ""}`}
          >
            <div>{text}</div>
          </div>
          {checked && <div className="check-mark">✓</div>}
          <div
            className="create-button"
            onClick={e => {
              e.stopPropagation(); // no propagation to onToggle
              this.handleOpenComment(id);
            }}
            style={showCom ? { pointerEvents: "none" } : {}}
          >
            Comments
          </div>
        </div>
        <CommentList
          id={id}
          colors={colors}
          commenttext={comtext}
          comments={comments}
          commentcolor={commentcolor}
          showCom={showCom}
          onSelectCol={this.handleSelectCol}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onCreate={this.handleCreate}
          onCloseCom={this.handleOpenComment}
          onRemoveCom={this.handleRemoveCom}
          onCheckId={this.handleCheckId}
          key={id}
        />
      </div>
    );
  }
}

export default TodoItem;
