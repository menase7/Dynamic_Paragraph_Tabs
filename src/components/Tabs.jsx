import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tabs = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const cachedTabs = JSON.parse(localStorage.getItem('tabsData'));
    if (cachedTabs) {
      setTabs(cachedTabs);
      setLoading(false);
    } else {
      fetchTabData();
    }
  }, []);

  const fetchTabData = async () => {
    try {

      const response = await axios.get('/api/4/short');
      const content = response.data;


      const paragraphs = content.split(/<\/p>\s*<p>/).map(para => para.replace(/<\/?p>/g, '').trim());

      const newTabs = paragraphs.map((text, index) => ({
        id: index,
        tabTitle: `Tab ${index + 1}`,
        title: `Title ${index + 1}`,
        content: text,
        
      }));
      console.log("the paragraph is ",paragraphs);


      setTabs(newTabs.slice(0, 4));
      setLoading(false);


      localStorage.setItem('tabsData', JSON.stringify(newTabs.slice(0, 4)));
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="container">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <div className="tabs">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(index)}
                className={index === activeTab ? "tab active" : "tab"}
              >
                {tab.tabTitle}
              </button>
            ))}
          </div>
          <div className="content">
            <h2>{tabs[activeTab]?.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: `<p>${tabs[activeTab]?.content}</p>` }} />
          </div>
        </>
      )}
    </div>
  );
};

export default Tabs;
