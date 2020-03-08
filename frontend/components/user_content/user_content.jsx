import React from 'react'
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import SidebarContainer from '../sidebar/sidebar_container'
import Latest from '../latest/latest'

class UserContent extends React.Component {
    render() {
        return(
            <div className="content-area">
                <SidebarContainer />
                <Latest />
            </div>
        )
    }
}

export default UserContent;