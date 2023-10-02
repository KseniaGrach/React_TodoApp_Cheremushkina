import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

export default class Task extends Component {
  state = {
    completed: false,
    timeAfterCreate: () => {},
    checked: false,
  };

  static defaultProps = {
    checked: false,
    onDeleted: () => {},
    timeAfterCreate: () => {},
  };

  static propTypes = {
    checked: PropTypes.bool,
    onDeleted: PropTypes.func,
    timeAfterCreate: PropTypes.string,
  };

  render() {
    const { label, onDeleted, onToggleCompleted, timeAfterCreate, completed, checked } = this.props;

    let classNames = 'description';

    if (completed) {
      classNames += ' completed';
    }

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleCompleted} readOnly checked={checked} />
        <label>
          <span className={classNames}>{label}</span>
          <span className="created">created {timeAfterCreate} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
