import * as express from 'express'
import render from './serverRender'

const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';
const PORT: number = parseInt(process.env.PORT) || 8081;
const HOSTNAME: string = process.env.HOSTNAME || 'localhost';

const server = express();

console.log('IS_Production', IS_PRODUCTION);

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

server.use('/icon.png',express.static('dist/client/icon.png'));
server.use('/favicon.ico',express.static('dist/client/icon.png'));
server.use("/sw.js", express.static("dist/client/sw.js"));
server.use("/workbox-sw.prod.v2.1.0.js", express.static("dist/client/workbox-sw.prod.v2.1.0.js"));

server.get('*', (req: express.Request, res: express.Response) => {
    render(req.url).then((html: string) => {
        res.status(200);
        res.end(html);
    }).catch((e: Error)=> {
        console.log('Error rendering: ',e);
        res.status(500);
        res.end();
    });
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`Listening on: ${HOSTNAME}:${PORT}`);
});