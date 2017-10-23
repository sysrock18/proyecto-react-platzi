import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import Error404 from './Error404';

import Header from '../../shared/components/Header';

function Pages() {
  return (
    <main role="application">
      <Header />

      <Switch>
        {/* List de artículos */}
        <Route
          path="/"
          exact
          title="Home"
          component={Home}
        />
        {/* Detalle del artículo */}
        <Route
          path="/post/:id"
          exact
          component={Post}
        />
        {/* Perfil del usuario */}
        <Route
          path="/user/:id"
          exact
          component={Profile}
        />
        {/* Error 404 */}
        <Route component={Error404} />
      </Switch>
    </main>
  );
}

export default Pages;
