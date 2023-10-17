import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter';
import './Footer.css';
// import { id } from 'date-fns/locale';

const Footer = ({ completed, clearCompleted, filterTodoData, onFilterChange }) => (
  <footer className="footer">
    <span className="todo-count">{`${completed} items left`}</span>
    <TaskFilter filter={filterTodoData} onFilterChange={onFilterChange} />
    <button type="button" className="clear-completed" onClick={clearCompleted}>
      Clear completed
    </button>
  </footer>
);

Footer.defaultProps = {
  completed: 0,
  clearCompleted: () => {},
  filterTodoData: () => {},
  onFilterChange: () => {},
};

Footer.propTypes = {
  completed: PropTypes.number,
  clearCompleted: () => {},
  filterTodoData: () => {},
  onFilterChange: () => {},
};

export default Footer;
