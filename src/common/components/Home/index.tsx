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
        </ul>
    </div>;