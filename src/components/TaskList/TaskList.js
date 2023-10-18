import React from 'react';

import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import ChangeTaskForm from '../ChangeTaskForm';
import './TaskList.css';
import Task from '../Task';

const TaskList = ({ todos, onDeleted, filterTodoData, onToggleCompleted, onEditClick, onChangeLabel }) => {
  const elements = todos.map((item) => {
    const { id, minValue, secValue, ...itemProps } = item;
    const timeAfterCreate = formatDistanceToNow(new Date(item.dateCreate));

    let classNames = 'active';
    let checked = false;

    if (item.completed) {
      classNames = 'completed';
      checked = true;
    }

    if (item.editing) {
      classNames = 'editing';
    }

    if (filterTodoData === 'all') {
      return (
        <li key={id} className={classNames}>
          <Task
            {...itemProps}
            checked={checked}
            minValue={minValue}
            secValue={secValue}
            timeAfterCreate={timeAfterCreate}
            onDeleted={() => onDeleted(id)}
            onEditClick={() => onEditClick(id)}
            onToggleCompleted={() => onToggleCompleted(id)}
          />
          {item.editing ? <ChangeTaskForm id={id} label={item.label} onChangeLabel={onChangeLabel} /> : null}
        </li>
      );
    }
    if (classNames === filterTodoData || classNames === 'editing') {
      return (
        <li key={id} className={classNames}>
          <Task
            {...itemProps}
            checked={checked}
            minValue={minValue}
            secValue={secValue}
            timeAfterCreate={timeAfterCreate}
            onDeleted={() => onDeleted(id)}
            onEditClick={() => onEditClick(id)}
            onToggleCompleted={() => onToggleCompleted(id)}
          />
          {item.editing ? <ChangeTaskForm id={id} label={item.label} onChangeLabel={onChangeLabel} /> : null}
        </li>
      );
    }

    return null;
  });
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  filterTodoData: 'all',
  todos: () => {},
  onDeleted: () => {},
  onEditClick: () => {},
  onChangeLabel: () => {},
};

TaskList.propTypes = {
  filterTodoData: PropTypes.string,
  todos: PropTypes.instanceOf(Array),
  onDeleted: PropTypes.func,
  onEditClick: PropTypes.func,
  onChangeLabel: PropTypes.func,
};

export default TaskList;
