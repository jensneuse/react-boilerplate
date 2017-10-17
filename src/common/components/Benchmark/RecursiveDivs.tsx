import * as React from "react";

class RecursiveDivs extends React.Component<{depth: number, breadth: number},{}> {

    render(): any {

        const {depth, breadth} = this.props;

        if (depth <= 0) {
            return <div>{"abcdefghij"}</div>;
        }

        let children = [];
        for (let i = 0; i < breadth; i++) {
            children.push(<RecursiveDivs key={i} depth={depth-1} breadth={breadth}/>);
        }
        return <div onClick={() => this.click.bind(this)}>{children}</div>;
    }

    click() {
        alert("clicked!");
    }

    componentCacheKey() {
        return JSON.stringify(this.props);
    }

}

export default RecursiveDivs;