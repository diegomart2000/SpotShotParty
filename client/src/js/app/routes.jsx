import React from 'react';
import { Route, Switch, Link } from "react-router-dom";

import App from './App';

import Grid from 'ui/Grid';
import GridContent from 'ui/GridContent';
import Background from 'ui/Background';

import NotFound from 'components/NotFound';
import PartyCreatePage from 'components/PartyPage/Create';
import HomePage from 'components/HomePage/HomePage';

export default (
  <App>
    <Background>
      <Grid>
        <GridContent>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/party/create" component={PartyCreatePage} />
            <Route component={NotFound} />
          </Switch>
        </GridContent>
      </Grid>
    </Background>
  </App>
);
