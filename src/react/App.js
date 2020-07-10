import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { channels } from '../shared/constants';
const { ipcRenderer } = window;

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();
  const [toUpdate, setToUpdate] = useState(false);

  useEffect(() => {
    fetchData();
  }, [toUpdate]);

  const fetchData = () => {
    ipcRenderer.send(channels.GET_TASK);
    ipcRenderer.on(channels.GET_TASK, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.GET_TASK);
      // console.log(arg.tasks);
      setTasks(arg.tasks);
    });
  };

  const saveTask = (e) => {
    e.preventDefault();

    ipcRenderer.send(channels.APP_INFO, task);
    setToUpdate(true);
    // ipcRenderer.on(channels.APP_INFO, (event, arg) => {
    //   ipcRenderer.removeAllListeners(channels.APP_INFO);
    //   console.log(arg.tasks);
    //   setTasks(arg.tasks);
    // });
  };

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-sm-12">
          <form className="form" onSubmit={(e) => saveTask(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Title..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btn btn-info btn-sm"
                value="Add Task"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <h3>Task List</h3>
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
              {tasks &&
                tasks.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.title}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <button className="btn btn-primary">Edit</button>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
