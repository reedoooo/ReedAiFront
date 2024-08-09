import { Box, Card, LinearProgress, Typography } from '@mui/material';
import { MdOutlineCloudDone } from 'react-icons/md';
import IconBox from 'assets/humanIcons/utils/IconBox';
import { MainMenu } from 'components/index';
import configs from 'config/index';
import { useMode } from 'hooks';

export default function Banner(props) {
  const { used, total, ...rest } = props;
  const { theme } = useMode();
  const textColorPrimary = theme.palette.text.primary;
  const textColorSecondary = theme.palette.text.secondary;
  const boxBg = theme.palette.grey[300];
  const cloud = theme.palette.text.primary;
  const storageSpace = theme.palette.text.primary;

  return (
    <Card
      {...rest}
      // sx={{ mb: 2.5, p: 2.5, textAlign: 'center' }}
      sx={{ mb: 2.5, p: 2.5, textAlign: 'center', minHeight: '100%' }}
    >
      <Box display="flex" width="100%" justifyContent="flex-end">
        <MainMenu items={configs.menus.genericMenuItems} ms="auto" />
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
