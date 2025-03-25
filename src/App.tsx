import { useState, type ChangeEvent } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AddIcon from '@mui/icons-material/Add';

import type { INote } from './types';
import { Notes } from './Notes';
import './App.css'

function App() {
  const [value, setValue] = useState<string>('')
  const [notes, setNotes] = useState<INote[]>([])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const addNote = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value === '') {
      return;
    }

    const newNote: INote = {
      text: value,
      completed: false,
    }

    setNotes((prevState) => [...prevState, newNote]);
    setValue('');
  }

  return (
    <>
      <Typography
        variant='h1'
        gutterBottom
      >
        todos
      </Typography>
      <form
        data-testid='form'
        onSubmit={addNote}
      >
        <TextField
          label='New Note'
          placeholder='What needs to be done?'
          slotProps={{
            htmlInput: {
              'data-testid': 'note-input',
            },
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <StickyNote2Icon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    disabled={!value}
                    data-testid='add-button'
                    type='submit'
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          value={value}
          onChange={handleChange}
          variant='outlined'
          margin='normal'
          fullWidth
        />
      </form>
      {notes.length > 0 && (
        <Notes
          notes={notes}
          setNotes={setNotes}
        />
      )}
    </>
  )
}

export default App
