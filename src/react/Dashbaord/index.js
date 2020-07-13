import React from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import Header from '../Header';
import SecureRoute from '../SecureRoute';
import { Switch } from 'react-router-dom';
import Dashboard from './Dashboard';

export default function index() {
  return (
    <>
      <Header />
      <Switch>
        <SecureRoute path="" component={Dashboard} />
      </Switch>
    </>
  );
}
