import { colors } from 'assets/themes/base';
const { grey } = colors;
export default {
  props: { variant: 'outlined' },
  style: {
    backgroundColor: 'transparent',
    border: `1px solid ${grey[500]}`,
    color: grey[500],
    borderRadius: '1rem',
    padding: '1rem',
  },
};
