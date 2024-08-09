import React from 'react';
import { RCSelect } from '..';
import { RCOption } from '../RCOption';

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
