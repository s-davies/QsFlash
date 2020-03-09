import React from 'react'

import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import SidebarContainer from '../sidebar/sidebar_container';
import CreatedContainer from '../created/created_container';

class CreatedDecks extends React.Component {
  render() {
    return (
      <div className="content-area">
        <SidebarContainer />
        <CreatedContainer ownProps={this.props} />
      </div>
    )
  }
}

export default CreatedDecks;