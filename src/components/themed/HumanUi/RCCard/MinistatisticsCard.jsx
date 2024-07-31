import { Box, Card, CardContent, Typography } from '@mui/material';
import useMode from 'hooks/useMode';

export default function MinistatisticsCard(props) {
  const { startContent, endContent, name, growth, value } = props;
  const { theme } = useMode();
  const textColor = theme.palette.text.primary;
  const textColorSecondary = theme.palette.text.secondary;
  return (
    <Card>
      <CardContent style={{ padding: '15px' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={{ xs: 'center', xl: 'start' }}
          height="100%"
        >
          {startContent}
          <Box
            ml={startContent ? 2 : 0}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ lineHeight: '100%' }}
            >
              {name}
            </Typography>
            <Typography
              variant="h6"
              color="textPrimary"
              style={{ color: textColor }}
            >
              {value}
            </Typography>
            {growth ? (
              <Box display="flex" alignItems="center">
                <Typography
                  variant="body2"
                  style={{
                    color: 'green',
                    fontWeight: 700,
                    marginRight: '5px',
                  }}
                >
                  {growth}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    color: textColorSecondary,
                    fontWeight: 400,
                  }}
                >
                  since last month
                </Typography>
              </Box>
            ) : null}
          </Box>
          <Box ml="auto">{endContent}</Box>
        </Box>
      </CardContent>
    </Card>
  );
}
