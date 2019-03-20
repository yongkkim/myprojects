import React, { Component } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Palette from "./Palette";
import "./CommentList.css";

class CommentList extends Component {
  render() {
    const {
      onChange,
      onKeyPress,
      onCreate,
      commentcolor,
      showCom,
      commenttext,
      onSelectCol,
      onCloseCom,
      comments,
      onRemoveCom,
      colors
    } = this.props;
    const commentlist = comments.map(({ comId, comtext, commentcolor }) => (
      <Comment
        comId={comId}
        comtext={comtext}
        color={commentcolor}
        onRemoveCom={onRemoveCom}
        key={comId}
      />
    ));
    return (
      <div draggable="true" className={showCom ? "comment-list" : "nothing"}>
        <div className="titleButton">
          <div className="title">Comment Box</div>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={onCloseCom}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <section>
          <Palette
            colors={colors}
            selected={commentcolor}
            onSelect={onSelectCol}
          />
        </section>
        <section className="commentform-wrapper">
          <CommentForm
            placeholder="Enter your comment"
            text={commenttext}
            onChange={onChange}
            onKeyPress={onKeyPress}
            onCreate={onCreate}
            color={commentcolor}
          />
        </section>
        <div className="comments-wrapper">{commentlist}</div>
      </div>
    );
  }
}

export default CommentList;
