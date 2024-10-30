import React from 'react';

const TabContent = ({ title, content }) => {
  return (
    <div className="content">
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: `<p>${content}</p>` }} />
    </div>
  );
};

export default TabContent;
