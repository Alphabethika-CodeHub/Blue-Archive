import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from './utils/useStore';
import { MainRoutes } from './routes/CleanLayout';
import "./custom.less";
// import "antd/dist/antd.less";

export const App = () => {
  return (
    <StoreProvider>
      <Router>
        <MainRoutes />
      </Router>
    </StoreProvider>
  )
}