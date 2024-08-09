import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { banner } from 'assets/img/auth';
import { avatar5 } from 'assets/img/avatars';
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
  const userStore = JSON.parse(localStorage.getItem('userStore'));
  const user = userStore.user || {};
  const [profileImage, setProfileImage] = useState(
    userStore.userInfo.profileImage || ''
  );

  const getUserProfileImage = async () => {
    try {
      // Assuming the image URL is stored in user.profile.image
      // const imageUrl = user.profile.image || avatar5;
      const imagename = 'avatar1';
      const nameWithExtension = imagename.includes('.')
        ? imagename
        : `${imagename}.png`;
      const response = await fetch(
        `http://localhost:3001/static/files/${nameWithExtension}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('imageUrl', response.url);
      setProfileImage(response.url);
    } catch (error) {
      console.error('Error fetching profile image:', error);
      setProfileImage(avatar5); // Fallback to a default avatar if there's an error
    }
  };
  useEffect(() => {
    getUserProfileImage();
  }, []);
  const userData = {
    name: user.username,
    email: user.email,
    bio: user.profile.bio || 'No bio provided',
    image: profileImage,
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
          // pr: '0.5rem',
          m: 'auto',
        }}
      >
        <Grid
          item
          xs={12}
          id="col-1"
          // direction="column"
          // sx={{
          //   display: 'flex',
          //   flexDirection: 'column',
          //   // width: '100%',
          // }}
        >
          <Grid
            container
            id="row-1"
            xs={12}
            spacing={2}
            // md={12}
            // direction="row"
            // sx={{
            //   display: 'flex',
            //   flexDirection: 'column',
            //   // gap: '1.25rem',
            //   width: '100%',
            //   height: 'fit-content',
            //   mt: '0.75rem',
            // }}
          >
            <Grid id="row-1-col-1" direction="column" item xs={12} md={4}>
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
            <Grid id="row-1-col-2" direction="column" item xs={12} md={3}>
              <Storage used={25.6} total={50} />
            </Grid>
            <Grid id="row-1-col-3" direction="column" item xs={12} md={5}>
              <Upload
              // minHeight={{ xs: 'auto', lg: '420px', xl: '365px' }}
              // paddingRight="20px"
              // paddingBottom={{ xs: '100px', lg: '20px' }}
              />
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
