import { useState } from 'react';

export const useTabs = (initialTab = 0) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return {
    activeTab,
    handleTabChange,
  };
};

export default useTabs;
