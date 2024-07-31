import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Calendar as DashboardCalendar } from 'react-calendar';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import 'react-calendar/dist/Calendar.css';
// import 'react-quill/dist/quill.snow.css';
import 'styles/MiniCalendar.css'; // Import custom styles

import { Card } from '../card/Card';

export const MiniCalendar = props => {
  const { selectRange, ...rest } = props;
  const [value, setValue] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [currentInput, setCurrentInput] = useState('');
  const [editingDate, setEditingDate] = useState(null);

  const handleDateChange = date => {
    setValue(date);
    setEditingDate(date);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' && editingDate) {
      setNotes({
        ...notes,
        [editingDate.toString()]: currentInput,
      });
      setCurrentInput('');
      setEditingDate(null);
    }
  };

  const renderTileContent = ({ date, view }) => {
    const note = notes[date.toString()];
    return (
      note && (
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            color: 'black',
            whiteSpace: 'nowrap',
          }}
        >
          • <strong>{date.toLocaleDateString()}</strong> - {note}
        </Typography>
      )
    );
  };

  return (
    <>
      <Card
        align="center"
        direction="column"
        width="100%"
        maxWidth="max-content"
        padding="20px 15px"
        mx="auto"
        height="max-content"
        sx={{
          p: '20px',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          position: 'relative',
          borderRadius: '20px',
          minWidth: '0px',
          wordWrap: 'break-word',
          backgroundClip: 'border-box',
          background: theme =>
            theme.palette.mode === 'dark'
              ? theme.palette.background.default
              : '#ffffff',
        }}
        {...rest}
      >
        <DashboardCalendar
          view={'month'}
          value={value}
          selectRange={selectRange}
          onChange={handleDateChange}
          tileContent={renderTileContent}
          onKeyDown={handleKeyDown}
          prevLabel={
            <IconButton
              component={Box}
              aria-label="previous month"
              sx={{
                height: '34px !important',
                minWidth: '34px !important',
                borderRadius: '10px',
              }}
            >
              <MdChevronLeft
                style={{
                  display: 'inline-block',
                  size: 24,
                  color: '#fff',
                }}
              />
            </IconButton>
          }
          nextLabel={
            <IconButton
              component={Box}
              aria-label="next month"
              sx={{
                height: '34px !important',
                minWidth: '34px !important',
                borderRadius: '10px',
              }}
            >
              <MdChevronRight
                style={{
                  display: 'inline-block',
                  size: 24,
                  color: '#fff',
                }}
              />
            </IconButton>
          }
        />
        {editingDate && (
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type your note and press Enter"
            value={currentInput}
            onChange={e => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              style: {
                fontSize: '12px',
                color: 'lightgrey',
                border: 'none',
                outline: 'none',
              },
            }}
            sx={{
              mt: 2,
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
            }}
          />
        )}
      </Card>
    </>
  );
};

export default MiniCalendar;
