import React from 'react';
import './TwoBlock.css';

class TwoBlock extends React.Component {
    constructor(prop) {
        super(prop);

        this.state = {
            input: "",
            todos: this.props.todoinfo === "" ? [] : this.props.todoinfo
        }
    }


    handleKeyPress = e => {
        if (e.key === "Enter") {
            this.handleCreate();
        }
    };

    handleCreate = () => {
        if (this.state.input === "") {
            alert("Cannot be empty");
        } else {
            this.setState({
                input: "",
                todos: this.state.todos.concat(this.state.input)
            });
        }
    };

    handleChange = e => {
        this.setState({
            input: e.target.value
        });
    };

    render() {
        let eachTodo = ""
        if (this.state.todos !== undefined) {
            eachTodo = this.state.todos.map(todo => {
                return <li className="each-todo">{todo}</li>
            })
        }

        return (
            <div className="schedule-container">
                <div className="container-title">
                    To-Do List
                </div>
                <div className="todos" style={{ height: this.props.height }}>
                    <input className="todoform" placeholder="Enter your task" value={this.state.input}
                        onChange={e => this.handleChange(e)} onKeyPress={e => this.handleKeyPress(e)} />
                    <hr className="text-primary" />
                    <ul>{eachTodo}</ul>
                </div>
                <div className="done bg-primary" onClick={e => this.props.toDoDone(this.state.todos)}>
                    Done
                </div>
            </div>
        );
    }
}

export default TwoBlock;
