import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { banner } from 'assets/img/auth';
import { avatar5 } from 'assets/img/avatars';
import { PageLayout } from 'components/index';
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
  const userStorage = JSON.parse(localStorage.getItem('userStorage'));
  const user = userStorage.user || {};
  const [profileImage, setProfileImage] = useState(user.userInfo.profileImage);

  // const getUserProfileImage = async () => {
  //   try {
  //     // Assuming the image URL is stored in user.profile.image
  //     // const imageUrl = user.profile.image || avatar5;
  //     const imagename = 'avatar1';
  //     const nameWithExtension = imagename.includes('.')
  //       ? imagename
  //       : `${imagename}.png`;
  //     const response = await fetch(
  //       `http://localhost:3001/static/files/${nameWithExtension}`
  //     );
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     console.log('imageUrl', response.url);
  //     setProfileImage(response.url);
  //   } catch (error) {
  //     console.error('Error fetching profile image:', error);
  //     setProfileImage(avatar5); // Fallback to a default avatar if there's an error
  //   }
  // };
  // useEffect(() => {
  //   getUserProfileImage();
  // }, []);
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
    <PageLayout>
      <Box pt={{ xs: '130px', md: '80px', xl: '80px' }}>
        <Grid
          container
          spacing={{ xs: 2, xl: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12} lg={5}>
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
          <Grid item xs={12} lg={4}>
            <Storage used={25.6} total={50} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Upload
            // minHeight={{ xs: 'auto', lg: '420px', xl: '365px' }}
            // paddingRight="20px"
            // paddingBottom={{ xs: '100px', lg: '20px' }}
            />
          </Grid>
          <Grid item xs={12} lg={6} sx={{ marginBottom: '20px' }}>
            <Projects />
          </Grid>
          <Grid item xs={12} lg={6}>
            <General minHeight="365px" paddingRight="20px" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Notifications />
          </Grid>
        </Grid>
      </Box>
    </PageLayout>
  );
}
