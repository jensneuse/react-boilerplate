import * as React from "react";
import * as ReactDOM from "react-dom";

import {Hello} from "./components/Hello";

ReactDOM.render(
    <Hello  compiler="TypeScript" framework="React"/>,
    document.getElementById("root")
);

console.log('App rendered');

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
}