import { CardContent, Typography } from '@mui/material';
import { Card } from 'components/index';
import useMode from 'hooks/useMode';

export default function Information(props) {
  const { title, value, ...rest } = props;
  const { theme } = useMode();
  const textColorPrimary =
    theme.palette.mode === 'light'
      ? theme.palette.grey[900]
      : theme.palette.common.white;
  const textColorSecondary = theme.palette.grey[400];
  const bg =
    theme.palette.mode === 'light'
      ? theme.palette.common.white
      : theme.palette.primary.dark;
  return (
    <Card {...rest} sx={{ backgroundColor: bg }}>
      <CardContent>
        <Typography fontWeight="500" color={textColorSecondary} fontSize="sm">
          {title}
        </Typography>
        <Typography color={textColorPrimary} fontWeight="500" fontSize="md">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
