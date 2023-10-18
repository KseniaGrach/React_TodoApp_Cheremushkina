import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minValue: '',
    secValue: '',
  };

  static defaultProps = {
    onTaskAdded: () => {},
  };

  static propTypes = {
    onTaskAdded: PropTypes.func,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onTimeChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (e) => {
    const { onTaskAdded } = this.props;
    const { label, minValue, secValue } = this.state;

    const trimDescription = label.replace(/ +/g, ' ').trim();
    if (trimDescription === '') {
      onTaskAdded('Имя задачи не задано', minValue, secValue);
    } else {
      onTaskAdded(trimDescription, minValue, secValue);
    }

    e.preventDefault();

    this.setState({
      label: '',
      minValue: '',
      secValue: '',
    });
  };

  render() {
    const { label, minValue, secValue } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input type="submit" className="input-submit" />
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLabelChange} value={label} />
        <input
          className="new-todo-form__timer"
          name="minValue"
          placeholder="Min"
          value={minValue}
          onChange={this.onTimeChange}
        />
        <input
          className="new-todo-form__timer"
          name="secValue"
          placeholder="Sec"
          value={secValue}
          onChange={this.onTimeChange}
        />
      </form>
    );
  }
}
