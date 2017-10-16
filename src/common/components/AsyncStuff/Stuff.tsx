import * as React from "react";
import {Link} from "react-router-dom";
import Helmet from "react-helmet";

export default () =>
    <div>
        <Helmet>
            <title>Stuff</title>
        </Helmet>
        <h1>Stuff</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
    </div>;