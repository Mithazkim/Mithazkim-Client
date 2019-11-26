import React from 'react';
import Routes from './components/router/routes';
import { Router } from 'react-router-dom';
import history from './utils/history';
import ErrorBoundary from 'components/errorBoundaries/errorBoundary';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Router history={history}>
          <div className='container'>
            <ToastContainer rtl />
            <Routes></Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;
