import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './AppTodo.css';

export default class AppTodo extends Component {

  maxId = 100;

  state = { 
    todoData: [
      this.createTodoTask('Completed task'),
      this.createTodoTask('Editing task'),
      this.createTodoTask('Active task')
    ],
      filterTodoData: 'all'
  }

  static defaultProps = {
    todoData: [
      {
        id: 101,
        dateCreate: new Date(),
        completed: false,
      },
    ],
    filterTodoData: 'all',
  };

  static propTypes = {
    todoData: PropTypes.instanceOf(Array),
    filterTodoData: PropTypes.string,
  };

  DeletedTask = (id) => {

    this.setState(({ todoData }) => {

      const idx = todoData.findIndex((el) => el.id === id);
    
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };


  createTodoTask(label) {
    return {
      label,
      dateCreate: new Date(),
      completed: false,
      id: this.maxId++
    }
  }

  addTask = (text) => {
    const newTask = this.createTodoTask(text);

    this.setState(({ todoData }) => {

      const newArr = [
        ...todoData,
        newTask
      ];

      return {
        todoData: newArr
      };
    });
  };
  
  onToggleCompleted = (id) =>{

    this.setState(({ todoData }) => {

      const idx = todoData.findIndex((el) => el.id === id);

      const oldTask = todoData[idx];
      const newTask = {...oldTask, completed: !oldTask.completed};

      const newArray = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      }
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.completed === false);
      return {
        todoData: newArray
      };
    });
  };

  setTodoData = (event) => {
    this.setState({
      filterTodoData: event.target.innerText.toLowerCase(),
    });
  };

  render() {

    const { todoData, filterTodoData} = this.state;
    const completedCount = todoData.filter((el) => el.completed).length;

    const todoCount = todoData.length - completedCount;

    return (
      <div className="todoapp">
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm onTaskAdded={this.addTask}/>
        </header>
        <TaskList 
          todos={todoData} 
          onDeleted={this.DeletedTask}
          onToggleCompleted={this.onToggleCompleted}
          filterTodoData={filterTodoData}/>
        <Footer 
          completed={todoCount}
          clearCompleted={this.clearCompleted}
          setTodoData={this.setTodoData}/>
      </div> 
    );
  };
}

