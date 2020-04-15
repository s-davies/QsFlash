import React from 'react'

import SidebarContainer from '../sidebar/sidebar_container';
import FolderContainer from '../folders/folder_container';

class FolderWrapper extends React.Component {
  render() {
    return (
      <div className="content-area">
        <SidebarContainer />
        <FolderContainer ownProps={this.props} />
      </div>
    )
  }
}

export default FolderWrapper;