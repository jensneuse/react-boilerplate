import * as React from "react";
import {Link} from "react-router-dom"

export default () =>
    <div>
        <h1>HOME!!!!!</h1>
        <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/stuff">Stuff</Link></li>
        </ul>
    </div>;