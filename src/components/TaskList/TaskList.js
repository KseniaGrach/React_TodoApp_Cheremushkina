import React from 'react';

import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './TaskList.css';
import Task from '../Task';

const TaskList = ({ todos, onDeleted, onToggleCompleted }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    const timeAfterCreate = formatDistanceToNow(new Date(item.dateCreate));

    let classNames = 'active';
    let checked = false;

    if (item.completed) {
      classNames = 'completed';
      checked = true;
    }

    return (
      <li key={id} className={classNames}>
        <Task
          {...itemProps}
          checked={checked}
          timeAfterCreate={timeAfterCreate}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
        />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  filterTodoData: 'all',
  todos: () => {},
  onDeleted: () => {},
};

TaskList.propTypes = {
  filterTodoData: PropTypes.string,
  todos: PropTypes.instanceOf(Array),
  onDeleted: PropTypes.func,
};

export default TaskList;
