import React from 'react';
const Header = ({ isCollapsed, toggleSidebar }) => {
  return (
    <header className={`top-header ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="hamburger" onClick={toggleSidebar}>
        ☰
      </div>
      <div className="left">
        <span className="title">Image map Generator</span>
      </div>

      {!isCollapsed && (
        <div className="right">
          Image Map Creation Made Easy!
        </div>
      )}
    </header>
  );
};
export default Header;
