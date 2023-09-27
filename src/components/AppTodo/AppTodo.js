import React from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './AppTodo.css';


const AppTodo = () => {

  const todoData = [
    { label: 'Completed task', value: 'created 17 seconds ago', id: 1 },
    { label: 'Editing task', value: 'created 5 minutes ago', id: 2 },
    { label: 'Active task', value: 'created 11 minutes ago', id: 3 }
  ]
  
    return (
      <div className="todoapp">
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm />
        </header>
        <TaskList todos={ todoData }/>
        <Footer />
      </div> 
    );
  };

  export default AppTodo;