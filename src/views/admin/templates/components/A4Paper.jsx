import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { styled as styledDefault } from 'styled-components';
import { PaperCard } from 'components/styled';
import useMode from 'hooks/useMode';

const RatioBox = styledDefault(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  paddingBottom: '141.4%', // A4 ratio
  // marginBottom: '16px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  '& .content': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  '& .icon-container': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '50%',
    // width: '50%',
    margin: 'auto',
  },
}));

const A4Paper = ({ icon, route, title, description }) => {
  const { theme } = useMode();
  return (
    <RatioBox theme={theme}>
      <div className="content">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50%',
            width: '50%',
            margin: 'auto',
          }}
        >
          <PaperCard theme={theme}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                m: 'auto',
                px: 'auto',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                }}
              >
                {icon}
              </Typography>
            </Box>
          </PaperCard>
        </Box>
        <Box alignItems="center" display="flex" flexDirection="column">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '16px',
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
                {icon}
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  paddingLeft: '16px',
                }}
              >
                {title}
              </Typography>
            </Stack>
            {/* <div>{date}</div> */}
          </div>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              paddingLeft: '16px',
            }}
          >
            {description}
          </Typography>
        </Box>
      </div>
    </RatioBox>
  );
};

export default A4Paper;
