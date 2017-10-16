import {
    Route,
} from "react-router-dom"
import * as React from "react";

import Home from "../common/components/Home"

import About from "../common/components/AsyncAbout"
import Stuff from "../common/components/AsyncStuff"
import Helmet from "react-helmet";

class Routes extends React.Component<{},{}> {
    render(){
        return ([
            <Helmet defaultTitle="Website" titleTemplate="%s | Website">
                <meta charSet="utf8"/>
            </Helmet>,
            <Route key="home" exact path="/" component={Home} />,
            <Route key="about" exact path="/about" component={About}/>,
            <Route key="stuff" exact path="/stuff" component={Stuff}/>
        ])
    }
}

export default Routes;