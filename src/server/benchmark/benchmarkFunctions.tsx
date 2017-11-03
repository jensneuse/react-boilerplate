import render from '../serverRender'
import {Resolve} from "awesome-typescript-loader/dist/checker/checker";

const url: string = process.env.BENCHMARK_URL || '/stuff';

const benchmarkRendering = (deferred: Resolve) => {
    render(url)
        .then((html: string) => {
            deferred.resolve();
        })
        .catch((e: Error)=>{
            console.log(e);
            deferred.reject(e);
        });
};

export default [
    {name: 'benchmarkRendering', defer: true, fn: benchmarkRendering}
]