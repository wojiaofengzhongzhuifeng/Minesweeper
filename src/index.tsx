import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {AppProviders} from './App';
import reportWebVitals from './reportWebVitals';

// 禁用右键默认行为
document.oncontextmenu = function (evt) {
  evt.preventDefault();
};

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
