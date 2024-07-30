import { Typography } from '@mui/material';
import React from 'react';
import Project1 from 'assets/img/profile/Project1.png';
// import Project2 from 'assets/img/profile/Project2.png';
// import Project3 from 'assets/img/profile/Project3.png';
import { Card } from 'components/index';
import useMode from 'hooks/useMode';
import Project from './Project';

export default function Projects(props) {
  const { theme } = useMode();
  const textColorPrimary = theme.palette.text.primary;
  const textColorSecondary = theme.palette.text.secondary;
  // const cardShadow = '0px 18px 40px rgba(112, 144, 176, 0.12)';

  return (
    <Card mb={{ xs: '0px', '2xl': '20px' }}>
      <Typography
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        All projects
      </Typography>
      <Typography
        color={textColorSecondary}
        fontSize="md"
        marginRight="26px"
        marginBottom="40px"
      >
        Here you can find more details about your projects. Keep you user
        engaged by providing meaningful information.
      </Typography>
      <Project
        // boxShadow={cardShadow}
        mb="20px"
        image={Project1}
        ranking="1"
        link="#"
        title="Technology behind the Blockchain"
      />
      {/* <Project
        boxShadow={cardShadow}
        mb="20px"
        image={Project2}
        ranking="2"
        link="#"
        title="Greatest way to a good Economy"
      />
      <Project
        boxShadow={cardShadow}
        image={Project3}
        ranking="3"
        link="#"
        title="Most essential tips for Burnout"
      /> */}
    </Card>
  );
}
