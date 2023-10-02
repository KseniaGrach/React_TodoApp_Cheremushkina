import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

export default class TaskFilter extends Component {
  state = {
    allTask: true,
    activeTask: false,
    completedTask: false,
  };

  static defaultProps = {
    setTodoData: () => {},
  };

  static propTypes = {
    setTodoData: PropTypes.func,
  };

  onClickButton = (event) => {
    const buttonClicked = event.target.innerText.toLowerCase();
    if (buttonClicked === 'all') {
      this.setState({
        allTask: true,
        activeTask: false,
        completedTask: false,
      });
    } else if (buttonClicked === 'active') {
      this.setState({
        allTask: false,
        activeTask: true,
        completedTask: false,
      });
    } else {
      this.setState({
        allTask: false,
        activeTask: false,
        completedTask: true,
      });
    }
  };

  render() {
    const { setTodoData } = this.props;
    const { allTask, activeTask, completedTask } = this.state;

    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={allTask ? 'selected' : ''}
            onClick={(event) => {
              setTodoData(event);
              this.onClickButton(event);
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={activeTask ? 'selected' : ''}
            onClick={(event) => {
              setTodoData(event);
              this.onClickButton(event);
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={completedTask ? 'selected' : ''}
            onClick={(event) => {
              setTodoData(event);
              this.onClickButton(event);
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
