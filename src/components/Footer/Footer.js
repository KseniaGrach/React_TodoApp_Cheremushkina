import React from 'react';
import TaskFilter from '../TaskFilter';
import './Footer.css';


const Footer = ({completed, clearCompleted, setTodoData}) =>  (
  <footer className="footer">
    
    <span className="todo-count">{`${completed} items left`}</span>
    <TaskFilter setTodoData={setTodoData}/>
    <button type="button" className="clear-completed" onClick={clearCompleted}>Clear completed</button>
  </footer>
);


export default Footer;