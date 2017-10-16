import * as React from "react";
import {Link} from "react-router-dom";
import Helmet from "react-helmet"

export default () =>
    <div>
        <Helmet>
            <title>About</title>
        </Helmet>
    <h1>About</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/stuff">Stuff</Link></li>
        </ul>
    </div>;