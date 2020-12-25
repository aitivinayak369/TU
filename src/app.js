import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css'
// import { Provider } from 'react-redux';
// import AppRouter, { history } from './routers/AppRouter';
// import configureStore from './store/configureStore';
// import { login, logout } from './actions/auth';
// import 'normalize.css/normalize.css';
// import './styles/styles.scss';
// import 'react-dates/lib/css/_datepicker.css';
// import { firebase } from './firebase/firebase';
// import LoadingPage from './components/LoadingPage';


ReactDOM.render(<MainPage />, document.getElementById('app'));

