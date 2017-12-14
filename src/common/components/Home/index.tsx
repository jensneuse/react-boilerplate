import * as React from "react";
import {Link} from "react-router-dom"
import Helmet from "react-helmet";

export default () =>
    <div>
        <Helmet>
            <title>Home</title>
        </Helmet>
        <h1>HOME</h1>
        <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/stuff">Stuff</Link></li>
            <li><Link to="/dynamic/xyz">Simple Dynamic</Link></li>
            <li><Link to="/dynamic/xyz/qwert">Simple Dynamic 2</Link></li>
            <li><Link to="/dynamic/1/2/3/4?q=3&w=7">Complex Dynamic</Link></li>
        </ul>
    </div>;