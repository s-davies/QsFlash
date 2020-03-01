import React from 'react';
import { Provider } from 'react-redux';


import NavbarContainer from './navbar/navbar'
import SidebarContainer from './sidebar/sidebar_container'
import MainContent from './main_content/main_content'

const App = () => (
  <div className="app group">
    <NavbarContainer />
    <div className="content-area">
      <SidebarContainer />
      <MainContent />
    </div>
    
  </div>
);

export default App;
