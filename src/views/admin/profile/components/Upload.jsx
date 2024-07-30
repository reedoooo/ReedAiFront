import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { MdUpload } from 'react-icons/md';
import useMode from 'hooks/useMode';
import Dropzone from './Dropzone';
export default function Upload(props) {
  const { used, total, ...rest } = props;
  const { theme } = useMode();
  const textColorPrimary = theme.palette.grey[900];
  const brandColor = theme.palette.primary.main;
  const textColorSecondary = theme.palette.grey[400];

  return (
    <Card {...rest} sx={{ mb: 2.5, p: 2.5, textAlign: 'center' }}>
      <CardContent>
        <Box
          direction={{
            xs: 'column',
            '2xl': 'row',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Dropzone
            sx={{
              width: { xs: '100%', '2xl': '268px' },
              mr: { '2xl': 4.5 },
              maxHeight: { xs: '60%', lg: '50%', '2xl': '100%' },
              minHeight: { xs: '60%', lg: '50%', '2xl': '100%' },
            }}
            content={
              <Box>
                <MdUpload
                  style={{
                    width: 80,
                    height: 80,
                    color: brandColor,
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 1.5,
                  }}
                >
                  <Typography
                    fontSize="xl"
                    fontWeight="700"
                    sx={{ color: brandColor }}
                  >
                    Upload Files
                  </Typography>
                </Box>
                <Typography
                  fontSize="sm"
                  fontWeight="500"
                  sx={{ color: 'secondaryGray.500' }}
                >
                  PNG, JPG and GIF files are allowed
                </Typography>
              </Box>
            }
          />
          <Box sx={{ textAlign: 'left', paddingRight: '44px' }}>
            <Typography
              color={textColorPrimary}
              fontWeight="bold"
              fontSize="2xl"
              mt={{ xs: 2.5, '2xl': 6.25 }}
            >
              Complete your profile
            </Typography>
            <Typography
              color={textColorSecondary}
              fontSize="md"
              my={{ xs: 'auto', '2xl': 1.25 }}
            >
              Stay on the pulse of distributed projects with an online
              whiteboard to plan, coordinate and discuss
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: { xs: 2.5, '2xl': 'auto' },
                mb: '50px',
                width: 140,
                minWidth: 140,
              }}
            >
              Publish now
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
