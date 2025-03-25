import { Fragment, useState, type SyntheticEvent } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import type { ITabValues, INotesProps } from './types';
import { TAB_VALUES } from './constants.ts';
import './App.css'

export function Notes({ notes, setNotes }: INotesProps) {
  const [tabValue, setTabValue] = useState<ITabValues>(TAB_VALUES.ALL)

  const notesList = notes.reduce((acc, current) => {
    if (current.completed) {
      acc[2].push(current)
    } else {
      acc[1].push(current)
    }

    return acc
  }, [notes, [], []])

  const activeNotesCount = notesList[TAB_VALUES.ACTIVE].length

  const handleChangeTab = (_: SyntheticEvent, newValue: ITabValues) => {
    setTabValue(newValue);
  }

  const handleClick = (index: number) => () => {
    const notesClone = structuredClone(notes);
    notesClone[index].completed = !notesClone[index].completed;
    setNotes(notesClone);
  }

  const clearCompleted = () => {
    setNotes((prevState) => prevState.filter(({ completed }) => !completed));
  }

  return (
    <Card data-testid='notes'>
      <CardContent>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          centered
        >
          <Tab label='All' data-testid='all-notes' />
          <Tab label='Active' data-testid='active-notes' />
          <Tab label='Completed' data-testid='completed-notes' />
        </Tabs>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
          }}
        >
          {notesList[tabValue].map(({ text, completed }, index) => (
            <Fragment key={`${text}-${index}`}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleClick(index)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      slotProps={{
                        input: {
                          // @ts-expect-error https://github.com/mui/material-ui/issues/33175
                          'data-testid': `checkbox-${index}`,
                        },
                      }}
                      checked={completed}
                      tabIndex={-1}
                      edge='start'
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={completed ? {
                      color: 'text.secondary',
                      textDecoration: 'line-through',
                    } : undefined}
                    primary={text}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
          {notesList[tabValue].length === 0 && (
            <ListItem
              style={{ margin: 'auto' }}
              disablePadding
            >
              <ListItemText
                sx={{ color: 'text.secondary' }}
                primary='Empty'
              />
            </ListItem>
          )}
        </List>
      </CardContent>
      <CardActions>
        {activeNotesCount > 0 && (
          <Typography
            data-testid='items-count'
            sx={{ color: 'text.secondary' }}
            variant='body2'
          >
            {`${activeNotesCount} ${activeNotesCount > 1 ? 'items' : 'item'} left`}
          </Typography>
        )}
        <Button
          data-testid='clear-completed'
          style={{ marginLeft: 'auto' }}
          onClick={clearCompleted}
          disabled={notesList[TAB_VALUES.COMPLETED].length === 0}
          size='small'
        >
          Clear completed
        </Button>
      </CardActions>
    </Card>
  )
}
