import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';

function Minesweeper() {
  const routes = useRoutes();
  return (
    <Router>
      <div className="Minesweeper container">
        {routes}
      </div>
    </Router>
  );
}

export default Minesweeper;
