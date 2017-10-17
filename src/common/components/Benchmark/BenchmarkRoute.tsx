import * as React from "react"
import RecursiveDivs from "./RecursiveDivs";
import Helmet from "react-helmet";

const depth: number = 4;
const breadth: number = 11;

console.log('DEPTH: ', depth, 'BREADTH: ', breadth);

export default () => (
    <div>
        <Helmet>
            <title>Benchmark</title>
        </Helmet>
        <RecursiveDivs depth={depth} breadth={breadth}/>
    </div>
)