import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
} from "react-router-dom"
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import Routes from "../common/routes"

declare let window: {
    __ASYNC__: any
};

const asyncState = window.__ASYNC__;

const App = (
    <AsyncComponentProvider rehydrateState={asyncState}>
        <Router>
            <Routes/>
        </Router>
    </AsyncComponentProvider>
);

asyncBootstrapper(App).then(()=>{
    console.log('client bootstrapped');

    ReactDOM.render(App, document.getElementById("root"));
    console.log('App rendered');
});


/*
if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
        .catch(function(err) {
            console.error('Unable to register service worker.', err);
        })
        .then(()=>{
            console.log('sw injected');
        });
} else {
    console.log('!navigator.serviceWorker');
}*/
