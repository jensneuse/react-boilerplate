import * as React from 'react'

export interface Props {
    location: {
        hash: string,
        pathname: string,
        search: string,
        state: any
    },
    match: {
        isExact: boolean,
        params: any
        path: string,
        url: string
    }
}

class DynamicRouteComponent extends React.Component<Props,{}> {
    render(){

        console.log(this.props);

        const {location,match} = this.props;

        return (
            <div>
                <p>This is an example of dynamic routing.</p>
                <ul>
                    <li>
                        location
                        <ul>
                            <li>
                                hash: {location.hash || '-'}
                            </li>
                            <li>
                                pathname: {location.pathname || '-'}
                            </li>
                            <li>
                                search: {location.search || '-'}
                            </li>
                        </ul>
                    </li>
                    <br/>
                    <li>
                        <ul>
                            <li>
                                isExact: {'' + match.isExact}
                            </li>
                            <li>
                                params: {JSON.stringify(match.params)}
                            </li>
                            <li>
                                path: {match.path || '-'}
                            </li>
                            <li>
                                url: {match.url || '-'}
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default DynamicRouteComponent;