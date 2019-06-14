import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';

import Grid from 'ui/Grid';
import GridContent from 'ui/GridContent';
import Background from 'ui/Background';

import HomePage from 'components/HomePage/HomePage';
import NotFound from 'components/NotFound';

import PartyCreatePage from 'components/PartyPage/Create';
import PartyJoinPage from 'components/PartyPage/Join';
import TrackPage from 'components/TrackPage';

export default (
  <App>
    <Background>
      <Grid>
        <GridContent>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/party/create' component={PartyCreatePage} />
            <Route exact path='/party/join' component={PartyJoinPage} />
            <Route exact path='/party/track' component={TrackPage} />
            <Route component={NotFound} />
          </Switch>
        </GridContent>
      </Grid>
    </Background>
  </App>
);
