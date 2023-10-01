import React from 'react';

import './TaskList.css';
import Task from '../Task';

const TaskList = ( { todos, filterTodoData, onDeleted, onToggleCompleted }) => {

    const elements = todos.map((item) => {

        const { id, ...itemProps } = item;

        let classNames = 'active';
        let checked = false;

        if (item.completed) {
            classNames = 'completed';
            checked = true;
          }

          if (filterTodoData === 'all') {
            return (
              <li key={id} className={classNames}>
                <Task
                  { ...itemProps } 
                  checked={checked}
                  onDeleted={() => onDeleted(id)}
                  onToggleCompleted={() => onToggleCompleted(id)}
                />
              </li>
            );
          };  
          if (classNames === filterTodoData) {
            return (
              <li key={id} className={classNames}>
                <Task
                  { ...itemProps } 
                  checked={checked}
                  onDeleted={() => onDeleted(id)}
                  onToggleCompleted={() => onToggleCompleted(id)}
                />
              </li>
            );
          }
    });

    return (
        <ul className="todo-list">
            { elements }
        </ul>
    );
}

export default TaskList;