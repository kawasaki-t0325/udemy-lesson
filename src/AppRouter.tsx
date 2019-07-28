import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PATH } from './config';
import { Signup, Top } from './containers';

const AppRouter: React.FC = () => {
  return (
        <Router>
          <div>
            <Route path={PATH.ROOT} exact component={Signup} />
            <Route path={PATH.TOP} exact component={Top} />
          </div>
        </Router>
      );
};

export default AppRouter;
