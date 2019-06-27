import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  BrowserView,
  MobileView,
} from 'react-device-detect';

import App from './App';

import Grid from 'ui/Grid';
import GridContent from 'ui/GridContent';
import Background from 'ui/Background';

import HomePage from 'components/HomePage/HomePage';
import NotFound from 'components/NotFound';

import PartyCreatePage from 'components/PartyPage/Create';
import PartyJoinPage from 'components/PartyPage/Join';
import TrackPage from 'components/TrackPage';

import PlayerJoinPage from 'components/PlayerPage/Join';
import PlayerWaitingPage from 'components/PlayerPage/Waiting';

export default (
  <App>
    <Background>
      <Grid>
        <GridContent>
          <BrowserView>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/party/create' component={PartyCreatePage} />
              <Route exact path='/party/join' component={PartyJoinPage} />
              <Route exact path='/party/track' component={TrackPage} />
              <Route component={NotFound} />
            </Switch>
          </BrowserView>

          <MobileView>
            <Switch>
              <Route exact path='/' component={PlayerJoinPage} />
              <Route exact path='/waiting' component={PlayerWaitingPage} />
              <Route component={NotFound} />
            </Switch>
          </MobileView>
        </GridContent>
      </Grid>
    </Background>
  </App>
);
