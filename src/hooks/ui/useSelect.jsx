import { useState } from 'react';

export const useSelect = (initialValue = '') => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleSelectChange = event => {
    setSelectedValue(event.target.value);
  };

  return {
    selectedValue,
    handleSelectChange,
  };
};

export default useSelect;
