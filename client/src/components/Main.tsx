import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthType } from '../types';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { SongCreate } from './SongCreate';
import { SongDetail } from './SongDetail';
import { SongList } from './SongList';

type PrivateRouteProps = {
  component: any,
  [x: string]: any,
} & AuthType;

const PrivateRoute = ({ 
  component: Component,
  isAuthenticated,
  ...rest
}: PrivateRouteProps) => (
  <Route 
    {...rest}
    render={(props) => isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />}
  />
);

export const Main = ({
  isAuthenticated
}: AuthType) => {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={LoginForm} />
        <Route path='/login' component={LoginForm} />
        <Route path='/signup' component={SignupForm} />
        <PrivateRoute isAuthenticated={isAuthenticated} exact path="/songs" component={SongList} />
        <PrivateRoute isAuthenticated={isAuthenticated} exact path="/songs/new" component={SongCreate} />
        <PrivateRoute isAuthenticated={isAuthenticated} exact path="/songs/:id" component={SongDetail} />
      </Switch>
    </main>
  );
};
