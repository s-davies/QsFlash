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
      folders: [],
      redirect: null,
      loading: true
    }
  }

  componentDidMount() {
    this.props.fetchFolders(this.props.ownProps.match.params.userId)
      .then(() => this.props.fetchUsers()
        .then(() => this.setState({loading: false})));
    
  }
  //refetch with new user
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.props.fetchFolders(this.props.ownProps.match.params.userId);
    }
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
        <div className="recent-bottom">
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
                  <button id="large-create-folder-button" className="large-create-card teal" >Create Folder</button>
                </div>
                : ""
            }
            {this.props.folders.map((folder) => (
              <div key={folder.id} onClick={this.handleRedirect(folder.id).bind(this)} className="small-deck-tile">
                <div className="small-deck-tile-inner">
                  <div className="small-deck-tile-top">
                    <p>{folder.deckCount} Terms </p>
                  </div>
                  <div className="small-deck-tile-bottom" >
                    <h3><i className="fas fa-folder"></i> {folder.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Folders;