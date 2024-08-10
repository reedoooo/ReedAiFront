/* eslint-disable jsx-a11y/no-autofocus */
import { MenuItem, Select, FormControl } from '@mui/material';
export const PresetSelect = ({
  presets,
  selectedPreset,
  handlePresetChange,
}) => (
  <FormControl
    variant="outlined"
    sx={{
      minWidth: 200,
      marginRight: 2,
      color: '#ffffff',
    }}
  >
    <Select
      value={selectedPreset.name || ''}
      onChange={handlePresetChange}
      label="Load a preset..."
      sx={{
        backgroundColor: 'transparent',
        color: '#ffffff',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ffffff',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ffffff',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ffffff',
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: '#333333',
            color: '#212121',
            '& .MuiMenuItem-root': {
              justifyContent: 'center',
            },
          },
        },
      }}
    >
      <MenuItem value="" disabled>
        Select a preset...
      </MenuItem>
      {presets?.map(preset => (
        <MenuItem key={preset.name} value={preset.name}>
          {preset.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default PresetSelect;
