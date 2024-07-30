'use client';

/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  Container,
  Link,
  ListItem,
} from '@mui/material';
import { useState } from 'react';
import { MdAutoAwesome, MdBolt, MdEdit, MdPerson } from 'react-icons/md';
import Bg from 'assets/img/auth/banner.png';
import useMode from 'hooks/useMode';

export default function BlogPostGenerator(props) {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [outputBlogPost, setOutputBlogPost] = useState('');
  const [loading, setLoading] = useState(false);

  const borderColor = '#e3e8ef';
  const inputColor = '#1B254B';
  const iconColor = '#422AFB';
  const bgIcon = 'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)';

  const brandColor = '#422AFB';
  const buttonBg = '#fff';
  const gray = '#697586';
  const buttonShadow = '14px 27px 45px rgba(112, 144, 176, 0.2)';

  const textColor = '#1B254B';
  const placeholderColor = '#697586';

  const handleGeneratePost = async () => {
    setLoading(true);
    const generatedContent = `
      # ${blogTitle}
      ${blogContent}
      ## Conclusion
      This is a generated blog post using AI, inspired by various Medium articles on coding and technology.
    `;
    setTimeout(() => {
      setOutputBlogPost(generatedContent);
      setLoading(false);
    }, 2000);
  };

  const handleTitleChange = event => {
    setBlogTitle(event.target.value);
  };

  const handleContentChange = event => {
    setBlogContent(event.target.value);
  };

  return (
    <Box
      sx={{
        width: '80%',
        pt: { xs: '70px', md: '0px' },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src={Bg.src}
        sx={{
          position: 'absolute',
          width: '350px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mx: 'auto',
          width: { xs: '100%', md: '100%', xl: '100%' },
          minHeight: { xs: '75vh', '2xl': '85vh' },
          maxWidth: '1000px',
        }}
      >
        <Box sx={{ width: '100%', mb: outputBlogPost ? '20px' : 'auto' }}>
          <TextField
            variant="outlined"
            fullWidth
            sx={{
              minHeight: '54px',
              mb: '20px',
              fontSize: 'lg',
              fontWeight: '600',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: borderColor,
                },
                '&:hover fieldset': {
                  borderColor: borderColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'none',
                },
                color: inputColor,
              },
            }}
            placeholder="Enter your blog title here..."
            onChange={handleTitleChange}
          />
          <TextField
            variant="outlined"
            fullWidth
            sx={{
              minHeight: '200px',
              fontSize: 'md',
              fontWeight: '500',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: borderColor,
                },
                '&:hover fieldset': {
                  borderColor: borderColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'none',
                },
                color: inputColor,
              },
            }}
            placeholder="Write your blog content here..."
            multiline
            rows={10}
            onChange={handleContentChange}
          />
          <Button
            variant="contained"
            sx={{
              py: '20px',
              px: '16px',
              width: { xs: '160px', md: '210px' },
              height: '54px',
              mt: 2,
              boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48)',
              background:
                'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              '&:hover': {
                boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48)',
                background:
                  'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
              },
            }}
            onClick={handleGeneratePost}
            disabled={loading}
          >
            Generate Post
          </Button>
        </Box>
        <Box
          sx={{
            display: outputBlogPost ? 'flex' : 'none',
            flexDirection: 'column',
            width: '100%',
            mx: 'auto',
            mb: 'auto',
          }}
        >
          <Box
            sx={{
              p: '22px',
              width: '100%',
              zIndex: 2,
              background: 'white',
              borderRadius: '14px',
              boxShadow: buttonShadow,
            }}
          >
            <Typography
              sx={{
                color: textColor,
                fontWeight: '600',
                fontSize: { xs: 'lg', md: 'xl' },
                lineHeight: { xs: '28px', md: '32px' },
              }}
            >
              {outputBlogPost}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: '20px',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 'xs', textAlign: 'center', color: gray }}>
            Generated using AI. Please review the content for accuracy and
            relevance.
          </Typography>
          <Link
            href="https://medium.com"
            sx={{
              ml: '5px',
              fontSize: 'xs',
              fontWeight: '500',
              textDecoration: 'underline',
            }}
          >
            Explore more tech articles on Medium
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
