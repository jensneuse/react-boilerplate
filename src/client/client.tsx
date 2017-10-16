import * as React from "react";
import {hydrate} from "react-dom";
import {
    BrowserRouter as Router,
} from "react-router-dom"
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import _Routes from "../common/routes"

declare let window: {
    __ASYNC__: any
};

declare let System: any;

const asyncState = window.__ASYNC__;

const render = (Routes: React.ComponentClass) => (
    <AsyncComponentProvider rehydrateState={asyncState}>
        <Router>
            <Routes/>
        </Router>
    </AsyncComponentProvider>
);

const App = render(_Routes);

asyncBootstrapper(App).then(()=>{
    console.log('client bootstrapped');
    hydrate(App, document.getElementById("root"));
    console.log('App rendered');
});

if (module.hot) {
    console.log('hot reload active');
    module.hot.accept('../common/routes', () => {
        System.import('../common/routes').then((module: any) => {
            console.log('hot system import',module);
            hydrate(render(module.default), document.getElementById("root"));
        });
    });
} else {
    console.log('no hot reload :(');
}

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
