import React from 'react';

import './Task.css';

const Task = ( { label, value }) => {
    return (
        <div className="view">
            <input className="toggle" type="checkbox"/>
            <label>
                <span className="description">{ label }</span>
                <span className="created">{ value }</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"></button>
        </div>
    );
}

export default Task;