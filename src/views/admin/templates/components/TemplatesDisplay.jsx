import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { FilterListIcon, UploadFileIcon } from 'assets/humanIcons';
import { useMode } from 'hooks';
import A4Paper from './A4Paper';

const TemplatesDisplay = ({ templates }) => {
  const { theme } = useMode();
  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
          Templates Display
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        />
        <IconButton>
          <FilterListIcon />
        </IconButton>
        <IconButton>
          <UploadFileIcon />
        </IconButton>
      </Toolbar>
      <Box component={Grid} container spacing={2} sx={{ padding: '16px' }}>
        {templates?.map((template, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <A4Paper
              icon={template.icon}
              route={template.route}
              title={template.title}
              description={template.description}
            />
            <NavLink
              to={template.route}
              style={{
                textDecoration: 'none',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  padding: '16px',
                  width: '100%',
                  '&:hover': {
                    color: theme.palette.primary.light,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transition: 'background-color 0.3s ease-in-out',
                  },
                }}
              >
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: theme.palette.text.primary,
                      paddingLeft: '16px',
                    }}
                  >
                    {template.icon}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: theme.palette.text.primary,
                      paddingLeft: '16px',
                    }}
                  >
                    {template.title}
                  </Typography>
                </Stack>
              </Box>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  paddingLeft: '16px',
                }}
              >
                {template.description}
              </Typography>
            </NavLink>
          </Grid>
        ))}
      </Box>
    </Paper>
  );
};

export default TemplatesDisplay;
