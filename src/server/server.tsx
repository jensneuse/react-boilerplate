import * as express from 'express'

const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';
const PORT: number = parseInt(process.env.PORT) || 8080;
const HOSTNAME: string = process.env.HOSTNAME || 'localhost';

const server = express();

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
}

server.use("/", express.static("dist/client"));

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
        <script defer async src="/client.js"></script>
        </html>`);
    res.end();
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`Listening on: ${HOSTNAME}:${PORT}`);
});