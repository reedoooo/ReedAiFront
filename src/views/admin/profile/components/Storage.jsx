import { Menu } from '@mui/icons-material';
import { Box, LinearProgress, Typography, useTheme } from '@mui/material';
import { MdOutlineCloudDone } from 'react-icons/md';
import { Card, IconBox } from 'components/index';
import useMode from 'hooks/useMode';

export default function Banner(props) {
  const { used, total } = props;
  const { theme } = useMode();
  const textColorPrimary =
    theme.palette.mode === 'light'
      ? theme.palette.text.primary
      : theme.palette.common.white;
  const textColorSecondary = theme.palette.text.secondary;
  const boxBg =
    theme.palette.mode === 'light'
      ? theme.palette.grey[300]
      : theme.palette.grey[900];

  return (
    <Card mb={{ base: '0px', lg: '20px' }} align="center">
      <Box display="flex" width="100%">
        <Menu ms="auto" />
      </Box>
      <IconBox
        mx="auto"
        height="100px"
        width="100px"
        icon={
          <MdOutlineCloudDone
            style={{ color: textColorPrimary, fontSize: '46px' }}
          />
        }
        bg={boxBg}
      />
      <Typography
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
      >
        Your storage
      </Typography>
      <Typography
        color={textColorSecondary}
        fontSize="md"
        maxWidth={{ base: '100%', xl: '80%', '3xl': '60%' }}
        mx="auto"
      >
        Supervise your drive space in the easiest way
      </Typography>
      <Box width="100%" mt="auto">
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          mb="10px"
        >
          <Typography color={textColorSecondary} fontSize="sm" maxWidth="40%">
            {used} GB
          </Typography>
          <Typography color={textColorSecondary} fontSize="sm" maxWidth="40%">
            {total} GB
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(used / total) * 100}
          sx={{ width: '100%', height: '8px' }}
        />
      </Box>
    </Card>
  );
}
