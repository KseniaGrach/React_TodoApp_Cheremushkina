import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter';
import './Footer.css';


const Footer = ({completed, clearCompleted, setTodoData}) =>  (
  <footer className="footer">
    
    <span className="todo-count">{`${completed} items left`}</span>
    <TaskFilter setTodoData={setTodoData}/>
    <button type="button" className="clear-completed" onClick={clearCompleted}>Clear completed</button>
  </footer>
);

Footer.defaultProps = {
  completed: 0,
  clearCompleted: () => {},
  setTodoData: () => {},
};

Footer.propTypes = {
  completed: PropTypes.number,
  clearCompleted: () => {},
  setTodoData: () => {},
};

export default Footer;