import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  TextField,
  ClickAwayListener
} from '@material-ui/core';
import clsx from 'clsx';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(10),
    '&:hover': {
      backgroundColor: 'white'
    }
  },
  checked: {
    '&:hover': {
      cursor: 'default'
    }
  },
  removed: {
    display: 'none'
  },
  deleteButton: {
    color: theme.palette.primary.light,
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.dark
    }
  },
  deleted: {
    display: 'none'
  }
}));

// This component is a ListItem with a Chechbox function that has editable text
function EditCheckListItem({
  editing,
  text,
  itemID,
  complete,
  className,
  tasks,
  setTasks,
  setEditing
}) {
  const classes = useStyles();
  const [openField, setOpenField] = useState(editing);
  const [description, setDescription] = useState(text);
  const [checkValue, setCheckValue] = useState(complete);
  const existingTask = useState(description !== '');
  const [deleted, setDeleted] = useState(false);

  const handleTextClick = () => {
    if (checkValue === false) {
      setOpenField(true);
    }
  };

  const handleFieldClickAway = () => {
    handleSubmit();
    setOpenField(false);
  };

  const handleSubmit = id => {
    setEditing(false);
    // Updates the task list if new task is being added
    if (description !== '') {
      let newTask = {
        description: description,
        complete: checkValue
      };
      setTasks(tasks => [...tasks, newTask]);
    }
    // Updates task list if old task is being edited
    if (existingTask) {
      const taskIndex = tasks.findIndex(task => task.id === itemID);
      let updatedTasks = [...tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        description: description
      };
      setTasks(updatedTasks);
    }
  };

  /*const handleChange = e => {
    setDescription(e.target.value);
  };*/

  const handleCheck = () => {
    setCheckValue(!checkValue);
  };

  const handlekeyPress = e => {
    if (e.keyCode === 13) {
      setOpenField(false);
    }
  };

  const handleDelete = () => {
    setDeleted(true);
  };

  useEffect(() => {}, [openField, checkValue]);

  const listItem = openField ? (
    <ListItem
      className={clsx({
        [classes.root]: true,
        [classes.checked]: checkValue,
        [classes.removed]: description === '' && !editing,
        [classes.deleted]: deleted,
        className
      })}
      button
      divider
      disableRipple
    >
      <ListItemIcon>
        <Checkbox
          disableRipple
          edge="start"
          tabIndex={-1}
          disabled
          checked={checkValue}
        />
      </ListItemIcon>
      <ClickAwayListener onClickAway={handleFieldClickAway}>
        <TextField
          id="text"
          type="text"
          fullWidth
          autoFocus
          defaultValue={description}
          onChange={e => setDescription(e.target.value)}
          onSubmit={setOpenField}
          onKeyDown={e => handlekeyPress(e)}
        />
      </ClickAwayListener>
      <ListItemIcon>
        <ClearIcon className={classes.clear} onClick={handleDelete} />
      </ListItemIcon>
    </ListItem>
  ) : (
    <ListItem
      button
      divider
      key="blank"
      className={clsx({
        [classes.root]: true,
        [classes.checked]: checkValue,
        [classes.remove]: description === '',
        [classes.deleted]: deleted,
        className
      })}
      disableRipple
    >
      <ListItemIcon>
        <Checkbox
          disableRipple
          edge="start"
          tabIndex={-1}
          defaultChecked={checkValue}
          onChange={handleCheck}
        />
      </ListItemIcon>
      <ListItemText primary={description} onClick={handleTextClick} />
      <ListItemIcon>
        <ClearIcon className={classes.deleteButton} onClick={handleDelete} />
      </ListItemIcon>
    </ListItem>
  );
  return listItem;
}

export default EditCheckListItem;
