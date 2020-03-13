import React from 'react'
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter,
    NavLink
} from 'react-router-dom';

class Sidebar extends React.Component {
    componentDidMount() {
        this.props.fetchDecks()
    }

    render() {
        return(
            <aside className="sidebar">
                <NavLink to="/" activeClassName="sidebar-selected" className="sidebar-link sidebar-home">
                    <div className="sidebar-link-text">
                        <i className="fas fa-home"></i>
                        <p>Home</p> 
                    </div>
                </NavLink>
                <NavLink to="/settings" activeClassName="sidebar-selected" className="sidebar-link sidebar-settings">
                    <div className="sidebar-link-text">
                        <i className="fas fa-cog"></i>
                        <p>Settings</p>
                    </div>
                </NavLink>
                <NavLink to="/help" activeClassName="sidebar-selected" className="sidebar-link sidebar-help">
                    <div className="sidebar-link-text">
                        <i className="fas fa-question-circle"></i>
                        <p>Help Center</p>
                    </div>
                </NavLink>
                <div className="sidebar-separator"></div>
                <NavLink exact to={`/${this.props.currentUser.id}/created`} activeClassName="sidebar-selected" className="sidebar-link sidebar-sets">
                    <div className="sidebar-link-text">
                        <i className="fas fa-clone"></i>
                        <p>Decks ({this.props.createdDecksCount})</p>
                    </div>
                </NavLink>
                <NavLink to="/folders" activeClassName="sidebar-selected" className="sidebar-link sidebar-folders">
                    <div className="sidebar-link-text">
                        <i className="fas fa-folder"></i>
                        <p>Folders</p>
                    </div>
                </NavLink>
                <button className="sidebar-new">
                    <i className="fas fa-folder-plus"></i>
                    <p>Create a folder</p>
                </button>

                <NavLink to="/classes" activeClassName="sidebar-selected" className="sidebar-link sidebar-classes">
                    <div className="sidebar-link-text">
                        <i className="fas fa-user-friends"></i>
                        <p>Classes</p>
                    </div>
                </NavLink>
                <button className="sidebar-new">
                    <i className="fas fa-user-plus"></i>
                    <p>Join or create a class</p>
                </button>
                
                
            </aside>
        )
    }
}

export default Sidebar;