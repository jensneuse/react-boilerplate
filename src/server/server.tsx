import * as express from 'express'

const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';
const PORT: number = parseInt(process.env.PORT) || 8081;
const HOSTNAME: string = process.env.HOSTNAME || 'localhost';

const server = express();

console.log('IS_Production',IS_PRODUCTION);

if (!IS_PRODUCTION) {
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpack = require("webpack");
    const webpackConfig = require("../../webpack.client.config");
    const compiler = webpack(webpackConfig);
    server.use(webpackDevMiddleware(compiler, {
        publicPath: "/",
        noInfo: true
    }));
    server.use(require("webpack-hot-middleware")(compiler));

    server.use("/workbox-sw.prod.v2.1.0.js.map", express.static("dist/client/workbox-sw.prod.v2.1.0.js.map"));

} else {
    server.use("/", express.static("dist/client/"));
}

server.use("/sw.js", express.static("dist/client/sw.js"));
server.use("/workbox-sw.prod.v2.1.0.js", express.static("dist/client/workbox-sw.prod.v2.1.0.js"));

server.get('*', (req: express.Request, res: express.Response) => {
    res.status(200);
    res.send(`<!DOCTYPE html>
        <html>
        <head>
            <title>T-Online.ts</title>
        </head>
        <body>
            <div id="root"></div>
        </body>
        <script defer async src="/vendor.js"></script>
        <script defer async src="/client.js"></script>
        </html>`);
    res.end();
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`Listening on: ${HOSTNAME}:${PORT}`);
});