import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import UserDropdown from './user_dropdown';
import LoginFormContainer from '../session_form/login_form_container';
import SignupFormContainer from '../session_form/signup_form_container';
import {logout} from '../../actions/session_actions'

class Navbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchOpen: false, 
            searchVal: "",
            redirect: null
        }
    }

    handleSearchSubmit(e) {
        e.preventDefault();
        if (this.state.searchVal !== "") {
            //clear search bar
            this.setState({ searchVal: "" });
            //redirect
            this.props.history.push(`/search/${this.state.searchVal}`);
        }
    }

    handleSearchChange(e) {
        this.setState({searchVal: e.currentTarget.value})
    }

    openSearchBar() {
        this.setState({searchOpen: true})
    }
    
    closeSearchBar() {
        this.setState({ searchOpen: false })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.redirect} />
        }

        let display;
        if (this.state.searchOpen) {
            
            display = <div className="main-div"><nav className="main-nav">
                <Link to="/" className="home">QsFlash!</Link>
                <div className="main-nav-search">
                    <div>
                        <i className="fas fa-search"></i>
                        <form onSubmit={this.handleSearchSubmit.bind(this)} className='main-nav-search-form' spellCheck="false">
                            <input onBlur={this.closeSearchBar.bind(this)} type="text" placeholder="Search (ex. NBA)" onChange={this.handleSearchChange.bind(this)} value={this.state.searchVal} autoFocus />
                        </form>
                    </div>
                    <p>X</p>
                </div>
            </nav>
            </div>
        } else {
            display = <div className="main-div"><nav className="main-nav">
                <Link to="/" className="home">QsFlash!</Link>
                <div className="main-nav-items">
                    <div className="main-nav-items-left">
                        {this.props.currentUser ? 
                        <>
                        <div className="main-nav-search-button" onClick={this.openSearchBar.bind(this)}>
                            <i className="fas fa-search"></i>
                            <p>Search</p>
                        </div>
                        <Link to="/create-deck" className="main-nav-create">
                            <i className="far fa-file"></i>
                            <p>Create</p>
                        </Link>
                        </> : ""}
                    </div>
                    {this.props.currentUser ? 
                        <UserDropdown currentUser={this.props.currentUser} logout={this.props.logout}/>
                        :
                        <div className="main-nav-session-div">
                            <LoginFormContainer />
                            <SignupFormContainer />
                        </div>
                    }
                    
                </div>
            </nav>
            </div>}
        return (
            display
        )
    }
}


export default withRouter(Navbar);