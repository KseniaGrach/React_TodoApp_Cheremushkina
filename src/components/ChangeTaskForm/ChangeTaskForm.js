import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ChangeTaskForm.css';

export default class ChangeTaskForm extends Component {
  state = {
    newLabel: '',
  };

  static defaultProps = {
    label: '',
    onChangeLabel: () => {},
  };

  static propTypes = {
    label: PropTypes.string,
    id: PropTypes.number.isRequired,
    onChangeLabel: PropTypes.func,
  };

  onLabelChange = (event) => {
    this.setState({
      newLabel: event.target.value.replace(/ +/g, ' ').trim(),
    });
  };

  onSubmit = (e) => {
    const { onChangeLabel, id, label } = this.props;
    const { newLabel } = this.state;

    if (newLabel === '') {
      onChangeLabel(id, label);
    } else {
      onChangeLabel(id, newLabel);
    }
    e.preventDefault();
  };

  render() {
    const { label } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <input type="submit" className="input-submit" />
        <input type="text" className="edit" placeholder={label} onChange={this.onLabelChange} />
      </form>
    );
  }
}
