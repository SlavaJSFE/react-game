import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import rssImage from './assets/images/rs-school-js.svg';

function Minesweeper() {
  const routes = useRoutes();
  return (
    <Router>
      <div className="minesweeper">
        {routes}
        <footer className="footer">
          <div className="footer-links">
            <div>
              <p className="text-primary">2021</p>
              <a className="text-primary" href="https://github.com/SlavaJSFE/">Slava Shpileuski &copy;</a>
            </div>
            <a href="https://rs.school/js/">
              <img className="rss-logo" src={rssImage} alt="rsschool"/>
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default Minesweeper;
