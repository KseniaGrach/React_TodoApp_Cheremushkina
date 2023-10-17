import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

export default class TaskFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

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

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'selected' : '';
      return (
        <button type="button" className={`btn ${clazz} `} key={name} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}
