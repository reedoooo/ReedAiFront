/* eslint-disable no-unused-vars */
import {
  Box,
  CardContent,
  Checkbox,
  Icon,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { MdCheckBox, MdDragIndicator } from 'react-icons/md';
import IconBox from 'assets/humanIcons/utils/IconBox';
import { Card, PaperCard } from 'components/index';
import Menu from 'components/themed/CommonUi/menu/MainMenu.jsx';
import configs from 'config/index';
import useMode from 'hooks/useMode';

export const Conversion = props => {
  const { theme } = useMode();
  const textColor = '#1B2559';
  const boxBg = '#F4F7FE';
  const brandColor = '#18b984';

  return (
    <Card
      height="100%"
      mode="dark"
      sx={{
        p: '20px',
        align: 'center',
        direction: 'column',
        width: '100%',
      }}
      {...props}
    >
      <PaperCard theme={theme}>
        <Box display="flex" alignItems="center">
          <IconBox
            bg={boxBg}
            icon={<Icon as={MdCheckBox} color={brandColor} w={24} h={24} />}
            sx={{ mr: '12px', width: '38px', height: '38px' }}
          />
          <Typography variant="h6" fontWeight="bold" color={textColor}>
            Tasks
          </Typography>
          <Menu
            items={configs.menus.genericMenuItems}
            sx={{ marginLeft: 'auto' }}
          />
        </Box>
      </PaperCard>
      <CardContent>
        <List sx={{ px: '11px' }}>
          {[
            { label: 'Landing Page Design' },
            { label: 'Dashboard Builder', checked: true },
            { label: 'Mobile App Design', checked: true },
            { label: 'Illustrations' },
            { label: 'Promotional LP', checked: true },
          ].map((task, index) => (
            <ListItem
              key={index}
              disableGutters
              sx={{
                mb: '20px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Checkbox defaultChecked={task.checked} />
              <Typography fontWeight="bold" sx={{ flex: 1 }}>
                {task.label}
              </Typography>
              <IconButton>
                <MdDragIndicator />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
export const Tasks = () => {
  return (
    <Box paddingTop={{ xs: '130px', md: '80px', xl: '80px' }}>
      <Conversion />
    </Box>
  );
};

export default Tasks;
