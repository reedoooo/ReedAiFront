import {
  Avatar,
  Box,
  Card,
  CardContent,
  styled,
  Typography,
} from '@mui/material';
import { useMode } from 'hooks';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  textAlign: 'center',
  p: 16,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
  borderRadius: '20px',
  minWidth: '0px',
  wordWrap: 'break-word',
  bg: theme.palette.secondary.main,
  backgroundClip: 'border-box',
  minHeight: '100%',
}));

const BannerImage = styled(Box)(({ theme, src }) => ({
  background: `url(${src}) no-repeat center center`,
  backgroundSize: 'cover',
  borderRadius: '0.75rem',
  height: '8rem',
  width: '100%',
  justifyContent: 'center',
  marginTop: '0.25rem',
}));

const AvatarWrapper = styled(Avatar)(({ theme }) => ({
  height: 87,
  width: 87,
  marginTop: '-43px',
  border: `4px solid ${theme.palette.background.paper}`,
  margin: 'auto',
}));

export default function Banner(props) {
  const { theme } = useMode();
  const { banner, avatar, name, job, posts, followers, following } = props;
  const textColorPrimary = theme.palette.text.primary;
  const textColorSecondary = theme.palette.text.secondary;
  const borderColor = theme.palette.background.paper;

  return (
    <StyledCard className="profile-banner" theme={theme}>
      <BannerImage src={banner} theme={theme} />
      <AvatarWrapper src={avatar} theme={theme} />
      <CardContent theme={theme}>
        <Typography
          color={textColorPrimary}
          variant="h6"
          fontWeight="bold"
          mt={1}
          theme={theme}
        >
          {name}
        </Typography>
        <Typography color={textColorSecondary} variant="body2">
          {job}
        </Typography>
        <Box display="flex" justifyContent="center" mt={3}>
          <Box textAlign="center" mx={3}>
            <Typography color={textColorPrimary} variant="h5" fontWeight="700">
              {posts}
            </Typography>
            <Typography
              color={textColorSecondary}
              variant="body2"
              fontWeight="400"
            >
              Posts
            </Typography>
          </Box>
          <Box textAlign="center" mx={3}>
            <Typography color={textColorPrimary} variant="h5" fontWeight="700">
              {followers}
            </Typography>
            <Typography
              color={textColorSecondary}
              variant="body2"
              fontWeight="400"
            >
              Followers
            </Typography>
          </Box>
          <Box textAlign="center" mx={3}>
            <Typography color={textColorPrimary} variant="h5" fontWeight="700">
              {following}
            </Typography>
            <Typography
              color={textColorSecondary}
              variant="body2"
              fontWeight="400"
            >
              Following
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
}
