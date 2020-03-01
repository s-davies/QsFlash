import React from 'react'
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import GreetingContainer from '../greeting/greeting_container';
import SignUpFormContainer from '../session_form/signup_form_container';
import LogInFormContainer from '../session_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';

class MainContent extends React.Component {
    render() {
        return (
            <div className="main-content">
                <header>
                    <Link to="/" className="header-link">
                        <h1>QsFlash</h1>
                    </Link>
                    <GreetingContainer />
                </header>
                <Switch>
                    <AuthRoute exact path="/login" component={LogInFormContainer} />
                    <AuthRoute exact path="/signup" component={SignUpFormContainer} />
                </Switch>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex recusandae quidem, impedit dolores illo enim quo suscipit earum sapiente in sit consectetur voluptates animi quasi nobis rerum mollitia quam delectus.</p>
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