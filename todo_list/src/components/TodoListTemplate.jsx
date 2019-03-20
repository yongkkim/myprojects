import React, { Component } from "react";
import "./TodoListTemplate.css";
import Form from "./Form";
import Palette from "./Palette";
import TodoItemList from "./TodoItemList";

const colors = ["#343a40", "#f03e3e", "#12b886", "#228ae6"];
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

class TodoListTemplate extends Component {
  id = 0;

  state = {
    input: "",
    todos: [],
    showCal: false,
    dateSelected: "",
    color: "#343a40"
  };

  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };

  handleCreate = () => {
    const { input, todos, color } = this.state;
    this.setState({
      input: "",
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color
      })
    });
  };

  handleToggle = id => {
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  };

  handleRemove = id => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  };

  handleSelect = color => {
    this.setState({
      color
    });
  };

  handleOpenCal = () => {
    this.setState({
      showCal: !this.state.showCal
    });
  };

  handleNoDate = () => {
    const { input, todos, color } = this.state;
    this.setState({
      showCal: false,
      input: "",
      todos: todos.concat({
        id: this.id++,
        text: (
          <p>
            {input} <br />
            <span style={{ float: "right", fontSize: "10px" }}>
              No End Date
            </span>
          </p>
        ),
        checked: false,
        color
      })
    });
  };

  handleDateChange = date => {
    const { input, todos, color } = this.state;
    this.setState({
      showCal: false,
      input: "",
      dateSelected: date,
      todos: todos.concat({
        id: this.id++,
        text: (
          <p>
            {input} <br />
            <span
              style={{
                background: "#FF6347",
                color: "white",
                float: "right",
                fontSize: "10px"
              }}
            >
              {date[0].getDate() +
                "/" +
                monthNames[date[0].getMonth()] +
                "/" +
                date[0]
                  .getFullYear()
                  .toString()
                  .substring(2) +
                " - " +
                date[1].getDate() +
                "/" +
                monthNames[date[1].getMonth()] +
                "/" +
                date[1]
                  .getFullYear()
                  .toString()
                  .substring(2)}
            </span>
          </p>
        ),
        checked: false,
        color
      })
    });
  };

  render() {
    const { input, showCal, todos, color } = this.state;
    return (
      <main className="todo-list-template">
        <div className="title">My Tasks</div>
        <section className="palette-wrapper">
          <Palette
            colors={colors}
            selected={color}
            onSelect={this.handleSelect}
          />
        </section>
        <section className="form-wrapper">
          <Form
            onDateChange={this.handleDateChange}
            onNoDate={this.handleNoDate}
            onOpenCal={this.handleOpenCal}
            showCal={showCal}
            value={input}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            onCreate={this.handleCreate}
            onCloseCal={this.handleOpenCal}
            color={color}
          />
        </section>
        <section className="todos-wrapper">
          <TodoItemList
            todos={todos}
            colors={colors}
            onToggle={this.handleToggle}
            onRemove={this.handleRemove}
            onSelect={this.handleSelect}
          />
        </section>
      </main>
    );
  }
}

export default TodoListTemplate;
