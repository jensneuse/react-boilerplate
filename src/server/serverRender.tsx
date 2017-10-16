import * as express from 'express'
import {AsyncComponentProvider, createAsyncContext} from 'react-async-component'
import * as React from "react";
import {renderToString} from "react-dom/server"
import {StaticRouter as Router} from 'react-router-dom'
import asyncBootstrapper from 'react-async-bootstrapper'
import Routes from '../common/routes'
import Helmet from "react-helmet";


export default (req: express.Request, res: express.Response) => {

    console.log('begin rendering',req.url);

    const asyncContext = createAsyncContext();
    let routerContext = {};

    const App = (
        <AsyncComponentProvider asyncContext={asyncContext}>
            <Router location={req.url} context={routerContext}>
                <Routes/>
            </Router>
        </AsyncComponentProvider>
    );

    asyncBootstrapper(App).then(() => {
        console.log('server bootstrapped',routerContext);

        const applicationHTML = renderToString(App);
        const asyncState = JSON.stringify(asyncContext.getState());
        const helmet = Helmet.renderStatic();

        res.status(200);
        res.send(`<!DOCTYPE html>
        <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <link rel="apple-touch-icon" sizes="57x57" href="/icon.png" />
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="root">${applicationHTML}</div>
            <script type="text/javascript">
                window.__ASYNC__ = ${asyncState}
            </script>
            <script type="text/javascript" src="/vendor.js"></script>
            <script type="text/javascript" src="/client.js"></script>
        </body>
        </html>`
        );

        res.end();
    }).catch((e: Error) => {
        console.log('bootstrapping failed', e);
        res.status(500);
        res.end();
    });
}