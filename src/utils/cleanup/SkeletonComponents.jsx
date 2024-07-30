import { Box, CircularProgress, Skeleton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

// ==============================|| SKELETONS ||============================== //

// ------------------------|  DRAFT EDITOR SKELETON  |------------------------ //
// SRC: Components/CoverLetterForm.js
const SkeletonContainer = styled(Box)(({ theme }) => ({
  height: 'calc(80vh - 96px)',
  width: '100%',
  backgroundColor: '#f0f0f0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.borders.borderRadius.md,
  margin: theme.spacing(1, 0),
  position: 'relative',
}));
function DraftEditorSkeleton() {
  return (
    <SkeletonContainer>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
      />
      <CircularProgress
        sx={{
          position: 'absolute',
        }}
      />
    </SkeletonContainer>
  );
}

export { DraftEditorSkeleton };
