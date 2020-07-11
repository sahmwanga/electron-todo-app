import React, { useState, useEffect } from 'react';
import {Button, Icon,Divider, Input,Container,Grid} from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';

import 'semantic-ui-css/semantic.min.css'

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
    ipcRenderer.on(tasks.GET_TASK, (event, arg) => {
      console.log(arg);
      setTodos(arg.data);
      ipcRenderer.removeAllListeners(tasks.GET_TASK);
    });
  };

  const saveTask = (e) => {
    e.preventDefault();

    ipcRenderer.send(tasks.CREATE_TASK, {
      title: todoState,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    fetchData();
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
          <form  onSubmit={(e) => saveTask(e)}>
            <div >
              <Input
                placeholder="Title..."
                value={todoState}
                onChange={(e) => setTodoState(e.target.value)}
              />
            </div>
            <div >
              <Input
                type="submit"
                value="Add Task"
              />
            </div>
          </form>
      <Divider className="ui divider" />
      <Grid.Row>
        <Grid.Column>
          <Grid.Row>
            <Grid.Column>Task List</Grid.Column>
            <Grid.Column><Button floated="right" color="red" onClick={() => deleteAllTask()}><Icon name="trash" />Delete All</Button></Grid.Column>
          </Grid.Row>
          <Divider className="ui divider" />

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">TITLE</th>
                <th scope="col">DATE</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {todos &&
                todos.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.title}</td>
                    <td>{item.createdAt}</td>
                    <td>
                        <Icon color="blue" name="pencil"  />
                        <Icon color="red" name="trash" onClick={() => deleteTaskById(item.id)} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Grid.Column>
      </Grid.Row>
    </Container>
  );
}

export default App;
