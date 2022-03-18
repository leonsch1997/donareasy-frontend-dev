import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

import { ReduxProvider } from './redux';
import { ChakraProvider } from '@chakra-ui/react';
import { PageWrapper } from './layout';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <ChakraProvider>
        <Router>
          <PageWrapper>
            <App />
          </PageWrapper>
        </Router>
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
