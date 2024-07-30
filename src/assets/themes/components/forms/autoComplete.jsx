// autocomplete

export default {
  styleOverrides: {
    root: {
      width: '100%',
      '& .MuiAutocomplete-inputRoot': {
        padding: '0px',
      },
      '& .MuiAutocomplete-input': {
        padding: '8px',
      },
      '& .MuiAutocomplete-endAdornment': {
        display: 'none',
      },
    },
    input: {
      padding: '8px',
    },
    option: {
      padding: '8px',
    },
  },
};
// defaultProps: {
// 	renderOption: (props, option, state, ownerState) => (
// 		<Box
// 			sx={{
// 				borderRadius: '8px',
// 				margin: '5px',
// 				[`&.${autocompleteClasses.option}`]: {
// 					padding: '8px',
// 				},
// 			}}
// 			component="li"
// 			{...props}
// 		>
// 			{ownerState.getOptionLabel(option)}
// 		</Box>
// 	),
// },
// };
