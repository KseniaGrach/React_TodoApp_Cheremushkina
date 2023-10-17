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
      this.createTodoTask('Active task'),
    ],
    filterTodoData: 'all',
  };

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

  filter(items, filterTodoData) {
    switch (filterTodoData) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  onFilterChange = (filterTodoData) => {
    this.setState({ filterTodoData });
  };

  DeletedTask = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.id !== id);

      return {
        todoData: newArray,
      };
    });
  };

  createTodoTask(label) {
    return {
      label,
      dateCreate: new Date(),
      completed: false,
      id: this.maxId++,
    };
  }

  addTask = (text) => {
    const newTask = this.createTodoTask(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask];

      return {
        todoData: newArr,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldTask = todoData[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };

      const newArray = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.completed === false);
      return {
        todoData: newArray,
      };
    });
  };

  render() {
    const { todoData, filterTodoData } = this.state;
    const visibleItems = this.filter(todoData, filterTodoData);

    const completedCount = todoData.filter((el) => el.completed).length;

    const todoCount = todoData.length - completedCount;

    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <TaskList
          todos={visibleItems}
          onDeleted={this.DeletedTask}
          onToggleCompleted={this.onToggleCompleted}
          filterTodoData={filterTodoData}
        />
        <Footer
          completed={todoCount}
          clearCompleted={this.clearCompleted}
          filter={filterTodoData}
          onFilterChange={this.onFilterChange}
        />
      </div>
    );
  }
}
