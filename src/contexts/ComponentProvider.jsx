import React, { createContext, useContext, useState } from 'react';

// Define the Tab type
const tabsInitialState = [];

// Create the context with default value undefined
const ComponentContext = createContext(undefined);

// The provider for the ComponentContext
const ComponentProvider = ({ children }) => {
  const [tabs] = useState(tabsInitialState);

  return (
    <ComponentContext.Provider
      value={{
        tabs,
        setActiveTab: async () => {},
      }}
    >
      {children}
    </ComponentContext.Provider>
  );
};

function useComponentProvider() {
  const context = useContext(ComponentContext);
  if (context === undefined) {
    throw new Error(
      'useComponentProvider must be used within a ComponentProvider'
    );
  }
  return context;
}

export { ComponentProvider, useComponentProvider };
