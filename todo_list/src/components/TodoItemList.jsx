import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodoItemList extends Component {
  render() {
    const { todos, onToggle, onRemove, onSelect } = this.props;
    const todolist = todos.map(({ id, checked, text, color }) => (
      <TodoItem
        id={id}
        text={text}
        checked={checked}
        color={color}
        onToggle={onToggle}
        onRemove={onRemove}
        onSelect={onSelect}
        key={id}
      />
    ));
    return <div>{todolist}</div>;
  }
}

export default TodoItemList;
