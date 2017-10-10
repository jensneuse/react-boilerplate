import {
    Route,
} from "react-router-dom"
import * as React from "react";

import Home from "../common/components/Home"

import About from "../common/components/AsyncAbout"
import Stuff from "../common/components/AsyncStuff"

class Routes extends React.Component<{},{}> {
    render(){
        return ([
            <Route key="home" exact path="/" component={Home}/>,
            <Route key="about" exact path="/about" component={About}/>,
            <Route key="stuff" exact path="/stuff" component={Stuff}/>
        ])
    }
}

export default Routes;