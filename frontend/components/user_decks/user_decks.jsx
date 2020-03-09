import React from 'react'

import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import SidebarContainer from '../sidebar/sidebar_container';
import RecentContainer from '../recent/recent_container';

class UserDecks extends React.Component {
  render() {
    return (
      <div className="content-area">
        <SidebarContainer />
        <RecentContainer ownProps={this.props} />
      </div>
    )
  }
}

export default UserDecks;