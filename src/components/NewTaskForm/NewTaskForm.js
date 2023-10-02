import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';


export default class NewTaskForm extends Component {

    state = {
        label: ''
    };

    static defaultProps = {
        onTaskAdded: () => {},
    };
    
      static propTypes = {
        onTaskAdded: PropTypes.func,
      };


    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        const { onTaskAdded } = this.props;
  
        const trimDescription = this.state.label.replace(/ +/g, ' ').trim();
        if (trimDescription  !== '') {
            onTaskAdded(trimDescription);
          }

        e.preventDefault();

        this.setState({
            label:''
        });
    };

    render() {


        return (
            <form onSubmit={this.onSubmit}>
                <input className="new-todo" placeholder="What needs to be done?"  onChange={this.onLabelChange} value={this.state.label} />
            </form>
        )  
    };  
};