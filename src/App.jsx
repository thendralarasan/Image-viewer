import React from 'react';
import Header from './components/Header'
import ButtonGroup from './components/ButtonGroup';
import Home from './pages/Home';
import { useState } from 'react';
import './Styles/image.css';
const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };
  return (
    <div>
       <Header isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}/>
       <Home isCollapsed={isCollapsed}/>
    </div>
  )
}

export default App
