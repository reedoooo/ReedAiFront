// hooks/useTabManager.js
import { useState, useCallback } from 'react';

const tabConfigurations = {
  workspace: [
    { label: 'Main', value: 0 },
    { label: 'Folders', value: 1 },
  ],
  user: [
    { label: 'Profile', value: 0 },
    { label: 'Api Keys', value: 1 },
    { label: 'Account', value: 2 },
  ],
  prompts: [
    { label: 'List', value: 0 },
    { label: 'Add Prompt', value: 1 },
    { label: 'Edit Prompt', value: 2 },
    { label: 'Prompt Suggest', value: 3 },
  ],
  files: [
    { label: 'List', value: 0 },
    { label: 'Edit File', value: 1 },
    { label: 'File Info', value: 2 },
    { label: 'File Upsert', value: 3 },
  ],
  chatSessions: [
    { label: 'List', value: 0 },
    { label: 'Conversations', value: 1 },
    { label: 'Settings', value: 2 },
  ],
  assistants: [
    { label: 'List', value: 0 },
    { label: 'Display', value: 1 },
    { label: 'Templates', value: 2 },
    { label: 'Tools', value: 3 },
  ],
};

export const useTabManager = (initialSection = 'workspace') => {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [activeTabs, setActiveTabs] = useState(
    tabConfigurations[initialSection]
  );
  const [selectedTab, setSelectedTab] = useState(0);

  const changeSection = useCallback(newSection => {
    if (tabConfigurations[newSection]) {
      setActiveSection(newSection);
      setActiveTabs(tabConfigurations[newSection]);
      setSelectedTab(0);
    } else {
      console.error(`Invalid section: ${newSection}`);
    }
  }, []);

  const selectTab = useCallback(
    tabValue => {
      const tabIndex = activeTabs.findIndex(tab => tab.value === tabValue);
      if (tabIndex !== -1) {
        setSelectedTab(tabIndex);
      } else {
        console.error(`Invalid tab value: ${tabValue}`);
      }
    },
    [activeTabs]
  );

  const addCustomTab = useCallback(newTab => {
    setActiveTabs(prevTabs => [...prevTabs, newTab]);
  }, []);

  const removeTab = useCallback(
    tabValue => {
      setActiveTabs(prevTabs => prevTabs.filter(tab => tab.value !== tabValue));
      if (selectedTab === tabValue) {
        setSelectedTab(0);
      }
    },
    [selectedTab]
  );

  return {
    activeSection,
    activeTabs,
    selectedTab,
    changeSection,
    selectTab,
    addCustomTab,
    removeTab,
  };
};
