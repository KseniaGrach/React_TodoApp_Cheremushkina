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
      this.createTodoTask('Completed task', 15, 30),
      this.createTodoTask('Editing task', 15, 30),
      this.createTodoTask('Active task', 15, 30),
    ],
    filterTodoData: 'all',
  };

  static defaultProps = {
    todoData: [
      {
        id: 101,
        dateCreate: new Date(),
        completed: false,
        editing: false,
        minValue: 15,
        secValue: 30,
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

  changeLable = (id, label) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            label,
            completed: false,
            editing: false,
          };
        }
        return el;
      });
      return {
        todoData: newArray,
      };
    });
  };

  completedTask = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            completed: !el.completed,
          };
        }
        return el;
      });
      return {
        todoData: newArray,
      };
    });
  };

  DeletedTask = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.id !== id);

      return {
        todoData: newArray,
      };
    });
  };

  createTodoTask(label, minValue, secValue) {
    let minValueNumber = +minValue;
    let secValueNumber = +secValue;
    const trimLabel = label.replace(/ +/g, ' ').trim();

    if (secValueNumber > 60) {
      minValueNumber += Math.trunc(secValueNumber / 60);
      secValueNumber -= Math.trunc(secValueNumber / 60) * 60;
    }

    return {
      label: trimLabel,
      dateCreate: new Date(),
      completed: false,
      editing: false,
      id: this.maxId++,
      minValue: minValueNumber,
      secValue: secValueNumber,
    };
  }

  addTask = (text, minValue, secValue) => {
    const newTask = this.createTodoTask(text, minValue, secValue);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask];

      return {
        todoData: newArr,
      };
    });
  };

  changeLabel = (id, label) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            label,
            completed: false,
            editing: false,
          };
        }
        return el;
      });
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

  editingItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            editing: true,
          };
        }
        return el;
      });
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
          onCheckBoxClick={this.completedTask}
          onDeleted={this.DeletedTask}
          onEditClick={this.editingItem}
          onToggleCompleted={this.onToggleCompleted}
          onChangeLabel={this.changeLabel}
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
