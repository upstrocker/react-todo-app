import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTask} from '../../actions/actionCreator';
import './Todo.css';
import Footer from '../../components/Footer/Footer';
import TodoList from '../../components/TodoList/TodoList';
import TodoInput from '../../components/TodoInput/TodoInput';

class Todo extends Component {
  state = {
    activeFilter: 'all',
    taskText: '',
  };

  handleInputChange = ({target: {value}}) => {
    this.setState({
      taskText: value
    });
  };

  addTask = ({key}) => {
    const {taskText} = this.state;

    if (taskText.length > 3 && key === 'Enter') {
      const {addTask} = this.props;

      addTask((new Date()).getTime(), taskText, false);

      this.setState({
        taskText: '',
      })
    }
  };

  render () {
    const {activeFilter, taskText} = this.state;
    const {tasks} = this.props;
    const isTasksExist = tasks && tasks.length > 0;

    return (
      <div className="todo-wrapper">
        <TodoInput onKeyPress={this.addTask} onChange={this.handleInputChange} value={taskText} />
        {isTasksExist && <TodoList tasksList={tasks} />}
        {isTasksExist && <Footer amount={tasks.length} activeFilter={activeFilter} />}
      </div>
    )
  }
}

export default connect(state => ({
  tasks: state.tasks
}), {addTask})(Todo);

