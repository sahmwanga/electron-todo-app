import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Dashboard from './Dashbaord';

import './App.css';

import 'semantic-ui-css/semantic.min.css';
import SecureRoute from './SecureRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <SecureRoute path="/dashboard" component={Dashboard} />
        <Redirect to="/dashboard" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
