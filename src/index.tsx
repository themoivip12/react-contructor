import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import getStore from 'store/configureStore';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './locales/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const store = getStore();

const anyModule: any = module;
root.render(
  <Provider store={store}>
    {/* <ConfigProvider> */}
    <App />
    {/* </ConfigProvider> */}
  </Provider>,
);

// Hot reloadable translation json files
if (anyModule.hot) {
  anyModule.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
