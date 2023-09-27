import React from 'react';

import './TaskList.css';
import Task from '../Task';

const TaskList = ( { todos }) => {

    const elements = todos.map((item) => {

        const { id, ...itemProps } = item;

        return(
            <li key={ id }>
                <Task { ...itemProps } />
            </li>
        );
    });

    return (
        <ul className="todo-list">
            { elements }
        </ul>
    );
}

export default TaskList;