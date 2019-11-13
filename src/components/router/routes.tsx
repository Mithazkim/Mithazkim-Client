import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../login/login';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login}></Route>
      <Route path='/login' component={Login}></Route>
    </Switch>
  );
};

export default Routes;
