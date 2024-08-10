import React from 'react';
import RCSelect from '../RCSelect';
import RCOption from '../RCSelect/RCOption';

export const ExampleOne = () => {
  const options = [10, 20, 30];

  return (
    <RCSelect defaultValue={10}>
      {options.map((value, index) => (
        <RCOption key={index} value={value}>
          Option {value}
        </RCOption>
      ))}
    </RCSelect>
  );
};

export default ExampleOne;
