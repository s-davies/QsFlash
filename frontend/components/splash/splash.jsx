import React from 'react'
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../../util/route_util';

class Splash extends React.Component {
    render() {
        return (
            <div>
                <h1>Splash</h1>
            </div>
        )
    }
}

export default Splash;