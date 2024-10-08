import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//React Router
import { BrowserRouter } from 'react-router-dom';
//Redux
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          closeOnClick
          pauseOnHover={false}
          theme="dark"
        />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


