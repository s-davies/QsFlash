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
import MainContent from '../main_content/main_content'

class UserContent extends React.Component {
    render() {
        return(
            <div className="content-area">
                <SidebarContainer />
                <MainContent />
            </div>
        )
    }
}

export default UserContent;