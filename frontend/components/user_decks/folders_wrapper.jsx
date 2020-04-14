import React from 'react'

import SidebarContainer from '../sidebar/sidebar_container';
import FoldersContainer from '../folders/folders_container';

class FoldersWrapper extends React.Component {
  render() {
    return (
      <div className="content-area">
        <SidebarContainer />
        <FoldersContainer ownProps={this.props} />
      </div>
    )
  }
}

export default FoldersWrapper;