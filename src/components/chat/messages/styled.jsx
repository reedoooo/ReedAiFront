import { css } from '@emotion/react';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const codeBoxStyle = css`
  position: relative;
  overflow-x: auto;
  max-width: 100%;
`;

export const codeHeaderStyle = theme => css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.palette.background.dark};
  padding: ${theme.spacing(1)};
  color: ${theme.palette.text.primary};
  border-radius: 4px 4px 0 0;
`;

export const codeHeaderTextStyle = theme => css`
  font-weight: bold;
  margin-left: ${theme.spacing(2)};
`;

export const copiedTextStyle = theme => css`
  color: ${theme.palette.success.main};
`;

export const syntaxHighlighterStyle = {
  ...oneDark,
  margin: '0',
};
