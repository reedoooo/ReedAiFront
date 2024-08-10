import { CardContent, Grid, Typography } from '@mui/material';
import { Card } from 'components/index';
import { useMode } from 'hooks';
import Information from './Information';

export default function GeneralInformation(props) {
  const { ...rest } = props;
  const { theme } = useMode();
  const textColorPrimary = theme.palette.grey[900];
  const textColorSecondary = theme.palette.grey[400];
  const cardShadow = '0px 18px 40px rgba(112, 144, 176, 0.12)';
  return (
    <Card
      {...rest}
      sx={{ mb: { xs: '0px', '2xl': '20px' }, boxShadow: cardShadow }}
    >
      <CardContent>
        <Typography
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mt={2}
          mb={1}
        >
          General Information
        </Typography>
        <Typography color={textColorSecondary} fontSize="md" mb={5}>
          As we live, our hearts turn colder. Cause pain is what we go through
          as we become older. We get insulted by others, lose trust for those
          others. We get back stabbed by friends. It becomes harder for us to
          give others a hand. We get our heart broken by people we love, even
          that we give them all...
        </Typography>
        <Grid container spacing={2}>
          <Information
            boxShadow={cardShadow}
            title="Education"
            value="Stanford University"
          />
          <Information
            boxShadow={cardShadow}
            title="Languages"
            value="English, Spanish, Italian"
          />
          <Information
            boxShadow={cardShadow}
            title="Department"
            value="Product Design"
          />
          <Information
            boxShadow={cardShadow}
            title="Work History"
            value="Google, Facebook"
          />
          <Information
            boxShadow={cardShadow}
            title="Organization"
            value="Simmmple Web LLC"
          />
          <Information
            boxShadow={cardShadow}
            title="Birthday"
            value="20 July 1986"
          />
        </Grid>
      </CardContent>
    </Card>
  );
}
