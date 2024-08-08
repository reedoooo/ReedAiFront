import { Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { RCFlex } from 'components/themed/HumanUi/RCFlex';
import useMode from 'hooks/useMode';
import Brand from './Brand';
import Links from './Links';

export const Content = ({ routes }) => {
  const { theme } = useMode();
  const borderRadius = theme.borders.borderRadius.md;
  console.log('Content -> borderRadius', routes);
  return (
    <RCFlex
      direction="column"
      height="100%"
      pt="25px"
      px="16px"
      borderRadius="30px"
    >
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: '16px', '2xl': '1px' }}>
          <Links routes={routes} />
        </Box>
      </Stack>
    </RCFlex>
  );
};

Content.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const SidebarContent = ({ routes }) => Content({ routes });

export default SidebarContent;
