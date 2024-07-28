/* eslint-disable no-unused-vars */
import { Grid } from '@mui/material';
import { templateData } from 'config/data';
import useMode from 'hooks/useMode';
import TemplatesDisplay from './components/TemplatesDisplay';

// ==============================|| TEMPLATES ||============================== //

export default function Templates() {
  const { theme } = useMode();
  const data = templateData.filter(template => template.type !== 'template');
  return (
    <Grid item xs={12}>
      <TemplatesDisplay templates={data} />
    </Grid>
  );
}
