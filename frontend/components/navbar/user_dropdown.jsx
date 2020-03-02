import React from 'react'
import { Link } from 'react-router-dom';

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

    hideDropdown() {
        this.setState({ cls: "main-nav-dropdown-content" })
    }

    render() {
        return(
            <div className="main-nav-dropdown">
                <button onBlur={this.hideDropdown.bind(this)} onClick={this.showDropdown.bind(this)} className="main-nav-dropbtn">
                    <p>{this.props.currentUser.username}</p>
                    <i className="fas fa-sort-down"></i>
                </button>
                <div className={this.state.cls}>
                    <Link to="/">Your Study Sets</Link>
                    <Link to="/">Settings</Link>
                    <Link to="/">Log Out</Link>
                </div>
            </div>
        )
    }
}

export default UserDropdown;