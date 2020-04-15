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

class Folder extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cls: 'session-modal',
      deleteCls: "delete-modal",
      addDecksCls: "delete-modal",
      redirect: null,
      loading: true,
      title: "",
      description: "",
      submitDisabled: false,
      titleError: ""
    }
  }



  componentDidMount() {
    let that = this;
    this.props.fetchFolders(this.props.ownProps.match.params.userId)
      .then(() => this.props.fetchDecks([this.props.ownProps.match.params.folderId])
        .then(() => {
          this.setState({ loading: false, title: that.props.folder.title, description: that.props.folder.description });
          this.props.fetchUsers();
        }));
  }
  //refetch with new user
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.user !== this.props.user) {
  //     this.props.fetchFolders(this.props.ownProps.match.params.userId);
  //   }
  // }
  showDeleteModal() {
    if (this.state.deleteCls === "delete-modal") {
      this.setState({ deleteCls: "delete-modal show-modal" })
    }
  }

  handleDelete() {
    this.props.deleteFolder(this.props.folder.id);
    this.setState({ redirect: `/${this.props.currentUser.id}/folders` });
  }

  showAddDecksModal() {
    if (this.state.addDecksCls === "delete-modal") {
      this.setState({ addDecksCls: "delete-modal show-modal" })
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
      this.setState({ cls: "session-modal"})
    } else if (e.target.className === "delete-modal show-modal" ||
      e.target.className === "delete-close-form" ||
      e.target.className === "cancel-button") {
      this.setState({ deleteCls: "delete-modal", addDecksCls: "delete-modal" })
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
    this.props.updateFolder({
      id: this.props.folder.id,
      title: this.state.title,
      description: this.state.description,
    });
    //hide the form
    this.setState({ cls: "session-modal"});
  }

  handleRedirect(deckId) {
    return e => {
      this.setState({ redirect: `/${deckId}/flash-cards` })
    }
  }


  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />
    }

    if (!this.props.user || !this.props.folder) return null;
    
    return (
      <div className="recent folder">
        <div className="user-header">
          <div className="folder-header-top">
            <div className="folder-deck-count">
              <span>{this.props.folder.deckCount} decks</span>
              <p>created by</p>
              <Link to={`/${this.props.users[this.props.folder.ownerId].id}/created`}>{this.props.users[this.props.folder.ownerId].username}</Link>
            </div>
            {this.props.folder.ownerId === this.props.currentUser.id ?
            <div onClick={this.showAddDecksModal.bind(this)} className="folder-add-edit">
              <div className="tooltip-options">
                <i className="fas fa-plus"></i>
                <span className="tooltiptext-info">Add decks</span>
              </div>
              <div onClick={this.showForm.bind(this)} className="tooltip-options">
                <i className="fas fa-pen"></i>
                <span className="tooltiptext-info">Edit</span>
              </div>
              <div onClick={this.showDeleteModal.bind(this)} className="tooltip-options">
                <i className="fas fa-trash-alt"></i>
                <span className="tooltiptext-info">Delete</span>
              </div>
              <div onClick={this.hideForm.bind(this)} className={this.state.addDecksCls}>
                <div className='delete-div-box'>
                  <div className="delete-banner">
                    <h1 className="form-title">Add a deck</h1>
                    <div onClick={this.hideForm.bind(this)} className="delete-close-form">X</div>
                  </div>
                  <div className="delete-content">
                      {this.props.decks.map((deck) => (
                        <div key={deck.id} className="small-deck-tile">
                          <div className="small-deck-tile-inner">
                            <div className="small-deck-tile-bottom" >
                              <h3>{deck.title}</h3>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div onClick={this.hideForm.bind(this)} className={this.state.deleteCls}>
                <div className='delete-div-box'>
                  <div className="delete-banner">
                    <h1 className="form-title">Delete this folder?</h1>
                    <div onClick={this.hideForm.bind(this)} className="delete-close-form">X</div>
                  </div>
                  <div className="delete-content">
                    <h1>{this.props.folder.title}</h1>
                    <p>Deleting a folder is a PERMANENT action. This cannot be undone.</p>
                    <strong>Are you sure you want to delete this folder? The decks in this folder will not be deleted.</strong>
                    <div className="delete-buttons">
                      <button onClick={this.hideForm.bind(this)} className="cancel-button">Cancel</button>
                      <button onClick={this.handleDelete.bind(this)} className="delete-deck-button">Yes, delete folder</button>
                    </div>
                  </div>
                </div>
              </div>
            </div> : ""}
          </div>
          <div className="folder-title">
            <i className="fas fa-folder"></i>
            <p>{this.props.folder.title}</p>
          </div>
          <p>{this.props.folder.description}</p>
        </div>
        <div className="recent-bottom folders-bottom">
          <div className="small-deck-tiles">
            <ClipLoader
              css={override}
              size={150}
              loading={this.state.loading}
            />
            {this.props.decks.length === 0 && !this.state.loading && this.props.currentUser.id !== this.props.user.id ?
              <div className="no-latest">
                <h2>{this.props.folder.title} has no decks</h2>
              </div>
              : this.props.decks.length === 0 && !this.state.loading ?
                <div className="no-latest">
                  <h2>Let's get started!</h2>
                  <button onClick={this.showForm.bind(this)} id="large-create-folder-button" className="large-create-card teal" >Add a deck</button>
                </div>
                : ""
            }
            {this.props.decks.map((deck) => (
              <div key={deck.id} onClick={this.handleRedirect(deck.id).bind(this)} className="medium-deck-tile">
                <div className="medium-deck-tile-inner">
                  <div className="medium-deck-tile-right">
                    <h3>{deck.title}</h3>
                    <p>{deck.cardCount} terms {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</p>
                    <Link to={`/${deck.ownerId}/created`}>{this.props.users[deck.ownerId].username}</Link>
                  </div>
                  <div className="medium-deck-tile-right" >

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
        <div className="session-form-container create-folders">
          <div onClick={this.hideForm.bind(this)} className={this.state.cls}>
            <form onSubmit={this.handleSubmit.bind(this)} className='session-form-box' spellCheck="false">
              <div className="info-banner">
                <h1 className="form-title">Edit folder</h1>
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
                <input className="create-folder-submit" type="submit" value="Save" disabled={this.state.submitDisabled} />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Folder;