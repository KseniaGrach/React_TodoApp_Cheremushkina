import React, { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './AppTodo.css';

export default class AppTodo extends Component {

  state = { 
    todoData: [
      { label: 'Completed task', value: 'created 17 seconds ago', id: 1 },
      { label: 'Editing task', value: 'created 5 minutes ago', id: 2 },
      { label: 'Active task', value: 'created 11 minutes ago', id: 3 }
    ]
  }

onDeletedTask = (id) => {

  this.setState(({ todoData }) => {
    const idx = todoData.findIndex((el) => el.id ===  id);

    const newArray = [
      ...todoData.splice(0, idx),
      ...todoData.splice(idx + 1)
    ];

    return {
      todoData: newArray
    };
  });

}
render() {
      return (
      <div className="todoapp">
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm />
        </header>
        <TaskList todos={ this.state.todoData } onDeleted={ this.onDeletedTask}/>
        <Footer />
      </div> 
    );
}

}

