import React from 'react'
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import SignupFormContainer from '../session_form/signup_form_container'
// import MyImage from '../../../app/assets/images/qsflash-splash1.png'

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {img: 1};
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            console.log(this.state.img)
            return this.setState({img: (this.state.img % 3) + 1})
            
        }, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div className="splash">
                <div className="splash-content">
                    <div className="splash-left">
                        <div className="splash-left-div">
                            <div className="splash-title-div">
                                <h1>Create Your Cards</h1>
                                <h1>Flash Your Skills</h1>
                            </div>
                            <p>Master any subject with your own virtual flashcards</p>
                            <div className="splash-signup-div">
                                <SignupFormContainer />
                                <a href="https://github.com/s-davies/QsFlash/wiki">Learn more about this project</a>
                            </div>
                        </div>
                    </div>
                    <div className="splash-right">
                        <img className="splash-img" src={`assets/qsflash-splash${this.state.img}.png`} alt="QsFlash"/>
                        <h4>QsFlash! is for</h4>
                        {this.state.img === 1 ? 
                            <p>“Get through exams to get to vacation” students</p>
                            :
                            this.state.img === 2 ?
                            <p>“Tonight I work, so tomorrow I can go places” students</p>
                            :
                            <p>“I’ll sleep when exams are over” students</p>
                        }
                    </div>
                </div>
                <footer className="splash-footer">

                </footer>
            </div>
        )
    }
}

export default Splash;