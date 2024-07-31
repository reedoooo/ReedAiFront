import { Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from '@mui/material';
import React from 'react';
import { RCInput } from 'components/themed';
import useMode from 'hooks/useMode';

export function SearchBar(props) {
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props;
  const { theme } = useMode();
  // Material-UI Color Mode
  const searchIconColor = '#212121';
  const searchColor = '#212121';
  const inputBg = 'transparent';

  return (
    <TextField
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              aria-label="search"
              sx={{
                backgroundColor: 'inherit',
                borderRadius: 'inherit',
                '&:hover, &:focus, &:active': {
                  backgroundColor: 'inherit',
                  transform: 'none',
                  boxShadow: 'none',
                },
              }}
            >
              <SearchIcon
                sx={{ color: searchIconColor, width: '15px', height: '15px' }}
              />
            </IconButton>
          </InputAdornment>
        ),
        variant: 'searchbar',
      }}
      placeholder='"Search..."'
      {...rest}
    />
  );
}

export default SearchBar;
// return (
//   <TextField
//     // variant="outlined"
//     sx={{
//       width: '100%',
//       minWidth: '0px',
//       outline: 'transparent solid 2px',
//       outlineOffset: '2px',
//       position: 'relative',
//       appearance: 'none',
//       transitionProperty: 'all', // Using 'all' as a close match to Chakra's common properties
//       transitionDuration: '0.2s', // Assuming normal duration is around 0.2s
//       fontWeight: '500',
//       borderRadius: '9999px',
//       fontSize: '0.875rem', // Assuming Chakra's sm font size is 0.875rem
//       paddingInlineStart: '2.5rem', // Assuming chakra-space-10 corresponds to 2.5rem
//       paddingInlineEnd: '1rem', // Assuming chakra-space-4 corresponds to 1rem
//       height: '2.5rem', // Assuming chakra-sizes-10 corresponds to 2.5rem
//       border: 'none', // Corresponding to chakra-borders-none
//       paddingTop: '11px',
//       paddingBottom: '11px',
//       background: '#E2E8F0', // Assuming chakra-colors-secondaryGray-300 corresponds to #E2E8F0
//       color: '#4A5568', // Assuming chakra-colors-gray-700 corresponds to #4A5568
//       '& .MuiInputBase-root .MuiOutlinedInput-root': {
//         borderRadius: '9999px',
//       },
//       '& .MuiOutlinedInput-root': {
//         borderRadius: '9999px',
//       },
//     }}
// sx={{
//   marginRight: '10px',
//   borderRadius: '30px',
//   zIndex: 0,
//   backgroundColor: inputBg,
//   width: '100%',
//   '& .MuiOutlinedInput-root': {
//     borderRadius: '30px',
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     '& fieldset': {
//       borderColor: 'transparent',
//     },
//     '&:hover fieldset': {
//       borderColor: 'transparent',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: 'transparent',
//     },
//   },
//   '& .MuiInputBase-input': {
//     borderRadius: '30px',
//     color: searchColor,
//   },
//   '& .MuiInputBase-input::placeholder': {
//     color: 'text.secondary',
//     fontSize: '14px',
//   },
//   '& MuiOutlinedInput': {
//     borderRadius: '30px',
//     input: {
//       borderRadius: '30px',
//     },
//   },
//   // width: {
//   //   xs: '100px',
//   //   md: '270px',
//   //   lg: '530px',
//   //   xl: '660px',
//   // },
//   maxWidth: '100%',
//   mr: { xs: '10px', md: '20px' },
// }}
//       InputProps={{
//         startAdornment: (
//           <InputAdornment position="start">
//             <IconButton
//               aria-label="search"
//               sx={{
//                 backgroundColor: 'inherit',
//                 borderRadius: 'inherit',
//                 '&:hover, &:focus, &:active': {
//                   backgroundColor: 'inherit',
//                   transform: 'none',
//                   boxShadow: 'none',
//                 },
//               }}
//             >
//               <SearchIcon
//                 sx={{ color: searchIconColor, width: '15px', height: '15px' }}
//               />
//             </IconButton>
//           </InputAdornment>
//         ),
//       }}
//       placeholder="Search..."
//       {...rest}
//     />
//   );
// }

// export default SearchBar;
