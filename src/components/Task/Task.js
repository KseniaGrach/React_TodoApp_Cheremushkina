import React, { Component } from 'react';

import './Task.css';


export default class Task extends Component {


    state = {
        completed: false
    };


    onLabelClick = () => {
        this.setState(({completed}) => {
            return {
                completed: !completed
            };
        });
    };


    render() {

        const { label, value,onDeleted } = this.props;
        const { completed } = this.state;

        let classNames = "description";

        if (completed) {
            classNames += " completed";
        }

        return (
            <div className="view">
                <input className="toggle" type="checkbox" onClick={ this.onLabelClick } />
                <label>
                    <span className={classNames} >{ label }</span>
                    <span className="created">{ value }</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
        );
    };
}



