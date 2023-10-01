import React, { Component } from 'react';

import './Task.css';


export default class Task extends Component {


    state = {
        completed: false,
        checked: false
    };


    // onLabelClick = () => {
    //     this.setState(({completed}) => {
    //         return {
    //             completed: !completed
    //         };
    //     });
    // };


    render() {

        const { label, value, onDeleted, onToggleCompleted, completed, checked } = this.props;


        let classNames = "description";

        if (completed) {
            classNames += " completed";
        }

        return (
            <div className="view">
                <input className="toggle" type="checkbox" onClick={onToggleCompleted} readOnly checked={checked} />
                <label>
                    <span className={classNames} >{label}</span>
                    <span className="created">{value}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
        );
    };
};