import { Box, IconButton, Link, Typography, useTheme } from '@mui/material';
import { EditIcon } from 'assets/humanIcons';
import { Card } from 'components/index';
import useMode from 'hooks/useMode';

export default function Project(props) {
  const { title, ranking, link, image, ...rest } = props;
  const { theme } = useMode();
  const textColorPrimary = theme.palette.text.primary;
  const textColorSecondary = theme.palette.text.secondary;
  const brandColor = theme.palette.primary.main;
  const bg = theme.palette.background.paper;

  return (
    <Card bg={bg} {...rest} p="14px">
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ xs: 'column', md: 'row' }}
      >
        <Box
          component="img"
          height="80px"
          width="80px"
          src={image}
          alt="project"
          style={{ borderRadius: '8px', marginRight: '20px' }}
        />
        <Box mt={{ xs: '10px', md: '0' }}>
          <Typography
            color={textColorPrimary}
            fontWeight="500"
            fontSize="md"
            mb="4px"
          >
            {title}
          </Typography>
          <Typography
            fontWeight="500"
            color={textColorSecondary}
            fontSize="sm"
            marginRight="4px"
          >
            Project #{ranking} •{' '}
            <Link fontWeight="500" color={brandColor} href={link} fontSize="sm">
              See project details
            </Link>
          </Typography>
        </Box>
        <Link
          href={link}
          variant="no-hover"
          marginRight="16px"
          marginLeft="auto"
          p="0px !important"
        >
          <IconButton>
            <EditIcon
              style={{
                color: 'secondaryGray.500',
                height: '18px',
                width: '18px',
              }}
            />
          </IconButton>
        </Link>
      </Box>
    </Card>
  );
}
