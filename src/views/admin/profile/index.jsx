import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { banner } from 'assets/img/auth';
import { avatar5 } from 'assets/img/avatars';
import { useUserStore } from 'contexts/UserProvider';
import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';
import Notifications from 'views/admin/profile/components/Notifications';
import Projects from 'views/admin/profile/components/Projects';
import Storage from 'views/admin/profile/components/Storage';
import Upload from 'views/admin/profile/components/Upload';

// =========================================================
// [USER PROFILE] | ...
// =========================================================

export default function Overview() {
  const {
    state: { user, isAuthenticated, userRequest },
    actions: { handleAuthSubmit },
  } = useUserStore();

  const userData = {
    name: user.username,
    email: user.email,
    bio: user.profile.bio || 'No bio provided',
    image: JSON.parse(localStorage.getItem('userStore')).profileImage,
    job: user.profile.job || 'No job provided',
    posts: '17',
    followers: '9700',
    following: '274',
  };
  return (
    <Box pt={{ xs: '130px', sm: '80px' }}>
      <Grid
        id="profile-layout-container"
        container
        spacing={2}
        sx={{
          m: 'auto',
        }}
      >
        <Grid item xs={12} id="col-1">
          <Grid container id="row-1" xs={12} spacing={2}>
            <Grid id="row-1-col-1" item xs={12} md={4}>
              <Banner
                banner={banner}
                avatar={userData.image}
                name={userData.name}
                job={userData.job}
                posts={userData.posts}
                followers={userData.followers}
                following={userData.following}
              />
            </Grid>
            <Grid id="row-1-col-2" item xs={12} md={3}>
              <Storage used={25.6} total={50} />
            </Grid>
            <Grid id="row-1-col-3" item xs={12} md={5}>
              <Upload />
            </Grid>
          </Grid>
          <Grid xs={12} id="row-2" direction="row" container>
            <Grid
              item
              id="row-2-col-1"
              direction="column"
              xs={12}
              md={6}
              sx={{ marginBottom: '20px' }}
            >
              <Projects />
            </Grid>
            <Grid item id="row-2-col-2" direction="column" xs={12} md={6}>
              <General minHeight="365px" paddingRight="20px" />
            </Grid>
          </Grid>
          <Grid xs={12} id="row-3" direction="row" container>
            <Grid item id="row-3-col-1" direction="column" xs={12}>
              <Notifications />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
