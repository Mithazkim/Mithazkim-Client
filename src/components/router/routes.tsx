import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../admin/login/login';
import AdminMenu from 'components/admin/adminMenu/adminMenu';
import AddFood from 'components/admin/addFood/addFood';
import ProtectedRoute from './protectedRoute';

export enum routes {
  login = '/login',
  admin = '/admin',
  menu = '/menu',
  addFood = '/add-food'
}

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login}></Route>
      <Route path={routes.admin + routes.login} component={Login}></Route>
      <ProtectedRoute path={routes.admin + routes.menu} component={AdminMenu}></ProtectedRoute>
      <ProtectedRoute path={routes.admin + routes.addFood} component={AddFood}></ProtectedRoute>
    </Switch>
  );
};

export default Routes;
