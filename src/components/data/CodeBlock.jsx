import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import CodeMirror from '@uiw/react-codemirror';
import React, { useEffect, useState } from 'react';
export const CodeBlock = ({
  height,
  code,
  editable = false,
  onChange = () => {},
}) => {
  const [copyText, setCopyText] = useState('Copy');
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [copyText]);
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      className: `relative h-${height}px overflow-scroll`,
    },
    /*#__PURE__*/ React.createElement(
      'button',
      {
        className:
          'absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]',
        onClick: () => {
          navigator.clipboard.writeText(code);
          setCopyText('Copied!');
        },
      },
      copyText
    ),
    /*#__PURE__*/ React.createElement(CodeMirror, {
      editable: editable,
      value: code,
      minHeight: `${height}px`,
      className: 'rounded-md overflow-scroll',
      extensions: [StreamLanguage.define(go)],
      theme: tokyoNight,
      onChange: value => onChange(value),
    })
  );
};
