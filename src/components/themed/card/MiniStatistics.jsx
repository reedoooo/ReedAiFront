import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import useMode from 'hooks/useMode';

export default function MiniStatistics(props) {
  const { startContent, endContent, name, growth, value } = props;
  const { theme } = useMode();
  const textColor = theme.palette.text.primary;
  const textColorSecondary = theme.palette.text.secondary;
  return (
    <Box
      sx={{
        borderRadius: '20px',
        padding: '20px',
        backgroundColor: '#FFFFFF',
        boxShadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
        width: '100%',
        height: '110px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {startContent}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#A0AEC0',
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '100%',
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: '#1A202C',
              fontWeight: '700',
              fontSize: '24px',
              lineHeight: '100%',
              marginTop: '4px',
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {growth && (
          <Typography
            variant="body2"
            sx={{
              color: '#A0AEC0',
              fontWeight: '500',
              fontSize: '12px',
              lineHeight: '100%',
            }}
          >
            <span
              style={{
                color: growth.startsWith('+') ? '#01B574' : '#EE5D50',
                fontWeight: '700',
              }}
            >
              {growth}
            </span>
            &nbsp;since last month
          </Typography>
        )}
        {endContent}
      </Box>
    </Box>
  );
}
// import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
// import React from 'react';
// import useMode from 'hooks/useMode';

// export const MiniStatistics = props => {
//   const { startContent, endContent, name, growth, value } = props;
//   const { theme } = useMode();
//   const textColor = theme.palette.text.primary;
//   const textColorSecondary = theme.palette.text.secondary;

//   return (
//     <Card>
//       <CardContent style={{ padding: '15px' }}>
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent={{ xs: 'center', xl: 'start' }}
//           height="100%"
//         >
//           {startContent}
//           <Box
//             ml={startContent ? 2 : 0}
//             display="flex"
//             flexDirection="column"
//             justifyContent="center"
//           >
//             <Typography
//               variant="body2"
//               color="textSecondary"
//               style={{ lineHeight: '100%' }}
//             >
//               {name}
//             </Typography>
//             <Typography
//               variant="h6"
//               color="textPrimary"
//               style={{ color: textColor }}
//             >
//               {value}
//             </Typography>
//             {growth ? (
//               <Box display="flex" alignItems="center">
//                 <Typography
//                   variant="body2"
//                   style={{
//                     color: 'green',
//                     fontWeight: 700,
//                     marginRight: '5px',
//                   }}
//                 >
//                   {growth}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   style={{
//                     color: textColorSecondary,
//                     fontWeight: 400,
//                   }}
//                 >
//                   since last month
//                 </Typography>
//               </Box>
//             ) : null}
//           </Box>
//           <Box ml="auto">{endContent}</Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default MiniStatistics;
