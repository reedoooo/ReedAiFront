import { colors, typography } from 'assets/themes/base';

const { text } = colors;
const { size, fontFamily, lineHeight } = typography;

export default {
  '--Icon-fontSize': 'calc(var(--FormHelperText-lineHeight) * 1em)',
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  fontFamily: 'var(--FormHelperText-fontFamily, ' + fontFamily + ')',
  fontSize: 'var(--FormHelperText-fontSize, ' + size.sm + ')',
  lineHeight: 'var(--FormHelperText-lineHeight, ' + lineHeight + ')',
  color: 'var(--FormHelperText-color, ' + text.main + ')',
  margin: 'var(--FormHelperText-margin, 0px)',
};
