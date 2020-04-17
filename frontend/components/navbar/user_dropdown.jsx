import React from 'react'
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside'

class UserDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cls: "main-nav-dropdown-content"}
    }

    showDropdown(){
        if (this.state.cls === "main-nav-dropdown-content") {
            this.setState({cls: "main-nav-dropdown-content show"})
        } else {
            this.setState({ cls: "main-nav-dropdown-content" })
        }
    }

    handleLogout() {
        this.props.logout();
    }

    handleClickOutside() {
        this.setState({ cls: "main-nav-dropdown-content" })
    }; 

    render() {
        return(
            <div className="main-nav-dropdown">
                <button onClick={this.showDropdown.bind(this)} className="main-nav-dropbtn">
                    <p>{this.props.currentUser.username}</p>
                    <i className="fas fa-sort-down"></i>
                </button>
                <div className={this.state.cls}>
                    <Link to={`/${this.props.currentUser.id}/created`}>Your Study Sets</Link>
                    {/* <Link to="/settings">Settings</Link> */}
                    <p onClick={this.handleLogout.bind(this)}>Log Out</p>
                </div>
            </div>
        )
    }
}

export default onClickOutside(UserDropdown);