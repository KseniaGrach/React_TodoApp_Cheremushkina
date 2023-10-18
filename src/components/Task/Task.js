import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

export default class Task extends Component {
  state = {
    completed: false,
    min: this.props.minValue,
    sec: this.props.secValue,
    timeAfterCreate: () => {},
    checked: false,
    isCounting: false,
  };

  static defaultProps = {
    checked: false,
    onDeleted: () => {},
    onEditClick: () => {},
    timeAfterCreate: () => {},
  };

  static propTypes = {
    checked: PropTypes.bool,
    onDeleted: PropTypes.func,
    onEditClick: PropTypes.func,
    timeAfterCreate: PropTypes.string,
  };

  componentWillUnmount() {
    clearInterval(this.counterID);
  }

  minDecrement = () => {
    const { min } = this.state;
    this.setState({
      min: min - 1,
      sec: 59,
    });
  };

  secDecrement = () => {
    const { min, sec, isCounting } = this.state;
    const { onToggleCompleted } = this.props;

    if (min === 0 && sec === 0 && isCounting === true) {
      onToggleCompleted();
      clearInterval(this.counterID);
      this.setState({
        isCounting: false,
      });
    }
    if (sec > 0) {
      this.setState({
        sec: sec - 1,
        isCounting: true,
      });
    } else {
      this.minDecrement();
    }
  };

  handlePause = (event) => {
    event.stopPropagation();
    this.setState({ isCounting: false });
    clearInterval(this.counterID);
  };

  handleStart = (event) => {
    event.stopPropagation();
    this.setState({ isCounting: true });
    this.counterID = setInterval(() => {
      this.secDecrement();
    }, 1000);
  };

  render() {
    const { label, onDeleted, onToggleCompleted, timeAfterCreate, onEditClick, completed, checked } = this.props;
    const { min, sec, isCounting } = this.state;
    const buttonTimer = !isCounting ? (
      <button type="button" className="icon icon-play" onClick={this.handleStart} />
    ) : (
      <button type="button" className="icon icon-pause" onClick={this.handlePause} />
    );

    let classNames = 'description';

    if (completed) {
      classNames += ' completed';
    }

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleCompleted} readOnly checked={checked} />
        <label>
          <span className={classNames} onClick={onToggleCompleted}>
            {label}
            {buttonTimer}
            <span className="description__time-value">
              {min}:{sec}
            </span>
          </span>
          <span className="created">created {timeAfterCreate} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEditClick}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
