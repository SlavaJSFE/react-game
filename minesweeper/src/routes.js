import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPage } from './pages/main/MainPage';
import { GamePage } from './pages/game/GamePage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { RulesPage } from './pages/rules/RulesPage';
import { ScorePage } from './pages/score/ScorePage';
import { AuthPage } from './pages/auth/AuthPage';


export const useRoutes = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <MainPage />
      </Route>
      <Route path='/game' exact>
        <GamePage />
      </Route>
      <Route path='/settings' exact>
        <SettingsPage />
      </Route>
      <Route path='/rules' exact>
        <RulesPage />
      </Route>
      <Route path='/score' exact>
        <ScorePage />
      </Route>
      <Route path='/auth' exact>
        <AuthPage />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}