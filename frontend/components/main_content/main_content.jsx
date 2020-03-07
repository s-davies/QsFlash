import React from 'react'
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../../util/route_util';

class MainContent extends React.Component {
    render() {
        return (
            <div className="main-content">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
            </div>
        )
    }
}

export default MainContent;