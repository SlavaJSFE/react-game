import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { GamePage } from './pages/GamePage';
import { RulesPage } from './pages/RulesPage';
import { SettingsPage } from './pages/SettingsPage';
import { ScorePage } from './pages/ScorePage';
import { AuthPage } from './pages/AuthPage';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <MainPage></MainPage>
      </Route>
      <Route path="/game" exact>
        <GamePage></GamePage>
      </Route>
      <Route path="/rules" exact>
        <RulesPage></RulesPage>
      </Route>
      <Route path="/settings" exact>
        <SettingsPage></SettingsPage>
      </Route>
      <Route path="/score" exact>
        <ScorePage></ScorePage>
      </Route>
      <Route path="/authentication" exact>
        <AuthPage></AuthPage>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  )
}