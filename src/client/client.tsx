import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
} from "react-router-dom"
import Routes from "../common/routes"


const App = () => (
    <Router>
        <Routes/>
    </Router>
);

ReactDOM.render(App(), document.getElementById("root"));

console.log('App rendered');

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
