import React from 'react';
import {
  Link,
  NavLink,
  Redirect
} from 'react-router-dom';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-top-color: rgb(66, 87, 178);
    border-top-style: solid;
    border-top-width: 4px;
    border-right-color: rgb(66, 87, 178);
    border-right-style: solid;
    border-right-width: 4px;
    border-bottom-color: transparent;
    border-bottom-style: solid;
    border-bottom-width: 4px;
    border-left-color: rgb(66, 87, 178);
    border-left-style: solid;
    border-left-width: 4px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
`;

class Folders extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cls: 'session-modal',
      redirect: null,
      loading: true,
      title: "",
      description: "",
      submitDisabled: true,
      titleError: ""
    }
  }

  

  componentDidMount() {
    this.props.fetchUsers().then(() =>
      this.props.fetchFolders(this.props.ownProps.match.params.userId)
        .then(() => this.props.fetchDecks(this.props.ownProps.match.params.userId)
          .then(() => this.props.fetchFolderDecks()
            .then(() => {
              this.setState({
                loading: false,
              });
            }))));
  }
  //refetch with new user
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.props.fetchFolders(this.props.ownProps.match.params.userId);
    }
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
  }

  handleRedirect(folderId) {
    return e => {
      this.setState({ redirect: `/${this.props.ownProps.match.params.userId}/folders/${folderId}` })
    }
  }


  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />
    }

    if (!this.props.user) return null;

    return (
      <div className="recent">
        <div className="user-header">
          <div className="user-header-right">
            <h1>{this.props.user.username}</h1>
            <div className="user-header-links">
              <NavLink to={`/${this.props.user.id}/recent`} activeClassName="user-header-selected" className="user-header-link">
                <p>Recent</p>
              </NavLink>
              <NavLink to={`/${this.props.user.id}/created`} activeClassName="user-header-selected" className="user-header-link">
                <p>Created ({this.props.createdDecksCount})</p>
              </NavLink>
              <NavLink to={`/${this.props.user.id}/studied`} activeClassName="user-header-selected" className="user-header-link">
                <p>Studied</p>
              </NavLink>
              <NavLink to={`/${this.props.user.id}/folders`} activeClassName="user-header-selected" className="user-header-link">
                <p>Folders ({this.props.createdFoldersCount})</p>
              </NavLink>
              {/* <NavLink to={`/${this.props.user.id}/classes`} activeClassName="user-header-selected" className="user-header-link">
                <p>Classes</p>
              </NavLink> */}
            </div>
          </div>

        </div>
        <div className="recent-bottom folders-bottom">
          <div className="small-deck-tiles">
            <ClipLoader
              css={override}
              size={150}
              loading={this.state.loading}
            />
            {this.props.folders.length === 0 && !this.state.loading && this.props.currentUser.id !== this.props.user.id ?
              <div className="no-latest">
                <h2>{this.props.user.username} has no folders</h2>
              </div>
              : this.props.folders.length === 0 && !this.state.loading ?
                <div className="no-latest">
                  <h2>Let's get started!</h2>
                  {/* <Link to="/create-deck" className="large-create-card teal" >Create Deck</Link> */}
                  <button onClick={this.showForm.bind(this)} id="large-create-folder-button" className="large-create-card teal" >Create Folder</button>
                </div>
                : ""
            }
            {this.props.folders.map((folder) => (
              <div key={folder.id} onClick={this.handleRedirect(folder.id).bind(this)} className="small-deck-tile">
                <div className="small-deck-tile-inner">
                  <div className="small-deck-tile-top">
                    <p>{folder.deckCt === 1 ? `${folder.deckCt} Deck` : `${folder.deckCt} Decks`}</p>
                  </div>
                  <div className="small-deck-tile-bottom" >
                    <h3><i className="fas fa-folder"></i> {folder.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
      </div>
    )
  }
}

export default Folders;