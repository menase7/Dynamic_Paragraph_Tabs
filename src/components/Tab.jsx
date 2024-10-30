import React from 'react';

const Tab = ({ tab, isActive, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className={isActive ? "tab active" : "tab"}
    >
      {tab.tabTitle}
    </button>
  );
};

export default Tab;
