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

    constructor(props) {
        super(props)
        this.state = {
            cls: 'session-modal',
            title: "",
            description: "",
            submitDisabled: true,
            titleError: "",
            redirect: null
        }
    }

    componentDidMount() {
        this.props.fetchDecks();
        // this.props.fetchFolders(this.props.currentUser.id);
    }

    showForm() {
        if (this.state.cls === "session-modal") {
            this.setState({ cls: "session-modal show-modal" })
        } else {
            this.setState({ cls: "session-modal" })
        }
    }

    hideForm(e) {
        if (e.target.className === "session-modal show-modal" ||
            e.target.className === "close-form") {
            this.setState({ cls: "session-modal", title: "", description: "" })
        }
    }

    handleTitleChange(e) {
        let titleWord = e.currentTarget.value;
        this.setState({ title: titleWord }, () => {
            if (titleWord.length > 0) {
                this.setState({ submitDisabled: false, titleError: "" })
            } else {
                this.setState({ submitDisabled: true, titleError: "A folder must have a title" });
            }
        });
    }

    handleDescriptionChange(e) {
        this.setState({ description: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createFolder({
            title: this.state.title,
            description: this.state.description,
            deckCount: 0
        });
        //hide the form
        this.setState({ cls: "session-modal", title: "", description: "" });
        this.handleRedirect()();
    }

    handleRedirect() {
        return e => {
            this.setState({ redirect: `/${this.props.currentUser.id}/folders` });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.redirect} />
        }
        return(
            <aside className="sidebar">
                <NavLink exact to="/latest" activeClassName="sidebar-selected" className="sidebar-link sidebar-home">
                    <div className="sidebar-link-text">
                        <i className="fas fa-home"></i>
                        <p>Home</p> 
                    </div>
                </NavLink>
                {/* <Link to="#" className="sidebar-link sidebar-settings">
                    <div className="sidebar-link-text">
                        <i className="fas fa-cog"></i>
                        <p>Settings</p>
                    </div>
                </Link>
                <Link to="#" className="sidebar-link sidebar-help">
                    <div className="sidebar-link-text">
                        <i className="fas fa-question-circle"></i>
                        <p>Help Center</p>
                    </div>
                </Link> */}
                <NavLink exact to={`/${this.props.currentUser.id}/created`} activeClassName="sidebar-selected" className="sidebar-link sidebar-decks">
                    <div className="sidebar-link-text">
                        <i className="fas fa-clone"></i>
                        <p>Decks</p>
                        {/* <p>Decks ({this.props.createdDecksCount})</p> */}
                    </div>
                </NavLink>
                <Link to="/create-deck" className="sidebar-help sidebar-new">
                    <i className="fas fa-folder-plus"></i>
                    <p>Create a deck</p>
                </Link>
                <div className="sidebar-separator"></div>
                <NavLink to={`/${this.props.currentUser.id}/folders`} activeClassName="sidebar-selected" className="sidebar-link sidebar-folders">
                    <div className="sidebar-link-text">
                        <i className="fas fa-folder"></i>
                        <p>Folders</p>
                    </div>
                </NavLink>
                {/* {this.props.folders.map((folder,index) => (
                    index < 3 ?
                    <Link to={`/${this.props.currentUser.id}/folders/${folder.id}`} className="sidebar-folder">
                        <p>{folder.title}</p>
                    </Link>
                    : ""
                ))} */}
                <button onClick={this.showForm.bind(this)} className="sidebar-new">
                    <i className="fas fa-folder-plus"></i>
                    <p>Create a folder</p>
                </button>

                <Link to="#" className="sidebar-link sidebar-classes">
                    <div className="sidebar-link-text">
                        <i className="fas fa-user-friends"></i>
                        <p>Classes (Coming soon)</p>
                    </div>
                </Link>
                <button className="sidebar-new">
                    <i className="fas fa-user-plus"></i>
                    <p>Join or create a class</p>
                </button>
                {/* new folder */}
                <div className="session-form-container create-folders">
                    <div onClick={this.hideForm.bind(this)} className={this.state.cls}>
                        <form onSubmit={this.handleSubmit.bind(this)} className='session-form-box' spellCheck="false">
                            <div className="info-banner">
                                <h1 className="form-title">Create a new folder</h1>
                                <div onClick={this.hideForm.bind(this)} className="close-form">X</div>
                            </div>
                            <div className="session-form">
                                <div className="session-field">
                                    <input type="text"
                                        value={this.state.title}
                                        onChange={this.handleTitleChange.bind(this)}
                                        className="session-input"
                                        placeholder="Enter a title"
                                    />
                                    <label>TITLE</label>
                                    <div className="session-errors">{this.state.titleError}</div>
                                </div>
                                <div className="session-field">
                                    <input type="text"
                                        value={this.state.description}
                                        onChange={this.handleDescriptionChange.bind(this)}
                                        className="session-input"
                                        placeholder="Enter a description (optional)"
                                    />
                                    <label>DESCRIPTION</label>
                                </div>
                                {/* <input className="session-submit" type="submit" value="Create Folder" disabled={this.state.submitDisabled} /> */}
                                <input className="create-folder-submit" type="submit" value="Create Folder" disabled={this.state.submitDisabled} />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="sidebar-personal-links">
                    <a href="https://github.com/s-davies" target="_blank"><i className="fab fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/steven-davies-bb700119b/" target="_blank"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://angel.co/u/steven-davies-5" target="_blank"><i className="fab fa-angellist"></i></a>
                </div>
            </aside>
        )
    }
}

export default Sidebar;