import React from 'react';
import Typist from 'react-typist-component';

export function Typeonload(props) {
  const {
    text,
    show = true,
    hideWhenDone = true,
    startDelay = 0,
    finishDelay = 0,
    typingDelay = 0,
    backspaceDelay = 0,
    loop = false,
  } = props;

  return (
    <Typist
      cursor={show}
      startDelay={startDelay}
      typingDelay={typingDelay}
      backspaceDelay={backspaceDelay}
      finishDelay={finishDelay}
      hideCursorWhenDone={hideWhenDone}
      loop={loop}
    >
      {text}
    </Typist>
  );
}

export default Typeonload;
