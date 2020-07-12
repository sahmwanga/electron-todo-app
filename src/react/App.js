import React, { useState, useEffect } from 'react';
import { Divider, Input, Container, Grid } from 'semantic-ui-react';
import './App.css';

import TaskList from './TaskList';

import 'semantic-ui-css/semantic.min.css';

import { tasks } from '../shared/constants';
const { ipcRenderer } = window;

function App() {
  const [todos, setTodos] = useState([]);
  const [todoState, setTodoState] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    ipcRenderer.send(tasks.GET_TASK);
    getData();
  };

  const getData = () => {
    ipcRenderer.on(tasks.GET_TASK, (event, arg) => {
      setTodos(arg.data);
    });
  };

  const saveTask = (e) => {
    e.preventDefault();

    ipcRenderer.send(tasks.CREATE_TASK, {
      title: todoState,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    getData();
  };

  const deleteAllTask = () => {
    ipcRenderer.send(tasks.DELETE_ALL_TASK);
    fetchData();
  };

  const deleteTaskById = (taskId) => {
    ipcRenderer.send(tasks.DELETE_TASK, { taskId });
    fetchData();
  };

  return (
    <Container>
      <form onSubmit={(e) => saveTask(e)}>
        <Grid columns={2} padded>
          <Grid.Row>
            <Grid.Column width={9}>
              <Input
                fluid
                required
                placeholder="Title..."
                value={todoState}
                onChange={(e) => setTodoState(e.target.value)}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Input type="submit" value="Add Task" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </form>
      <Divider className="ui divider" />
      <TaskList todos={todos} deleteTaskById={deleteTaskById} />
    </Container>
  );
}

export default App;
