import { styled } from '@mui/material';

export const Wrapper = styled('ul', {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  background: '#1A1D23',
  borderRadius: '8px',
  width: 'fit-content',
  border: '1px solid #2B303B',
  gap: '32px',
});

export const Tab = styled('li', {
  position: 'relative',
  listStyle: 'none',
  cursor: 'pointer',
  width: '50px',
  height: '30px',
  outline: 'none',

  span: {
    position: 'absolute',
    left: '4px',
    right: 0,
    top: '6px',
    bottom: 0,
    zIndex: 1,
    userSelect: 'none',
    fontSize: '1rem',
    color: '#E8E8FD',
  },
});
