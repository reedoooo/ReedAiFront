import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { useMode } from 'hooks';

export const Member = props => {
  const { avatar, name, job, ...rest } = props;
  const { theme } = useMode();
  const textColor =
    theme.palette.mode === 'dark' ? 'white' : theme.palette.grey[900];
  const bgColor = theme.palette.mode === 'dark' ? '#1B254B' : 'white';
  const boxShadow =
    theme.palette.mode === 'dark'
      ? 'none'
      : '0px 18px 40px rgba(112, 144, 176, 0.12)';

  return (
    <Card sx={{ boxShadow: boxShadow, py: 2, bgcolor: bgColor, ...rest }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                height: { xs: 48, xl: 36, '2xl': 48 },
                width: { xs: 48, xl: 36, '2xl': 48 },
                marginRight: 2,
              }}
              src={avatar}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
              }}
            >
              <Typography
                sx={{
                  color: textColor,
                  fontSize: {
                    xs: '1rem',
                    xl: '0.875rem',
                    '3xl': '1rem',
                  },
                  fontWeight: 700,
                }}
              >
                {name}
              </Typography>
              <Typography
                sx={{
                  color: 'secondaryGray.600',
                  textAlign: 'left',
                  fontSize: {
                    xs: '0.875rem',
                    xl: '0.75rem',
                    '3xl': '0.875rem',
                  },
                  fontWeight: 400,
                }}
              >
                {job}
              </Typography>
            </div>
          </div>
          <IconButton style={{ marginLeft: 'auto' }}>
            <MoreVertIcon style={{ color: textColor }} />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default Member;
