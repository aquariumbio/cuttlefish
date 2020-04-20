import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  Grid,
  Divider,
  Typography,
  List
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import EditCheckListItem from './EditCheckListItem';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  iconAfter: {
    marginLeft: theme.spacing(1)
  },
  head: {
    alignItems: 'center'
  },
  title: {
    margin: theme.spacing(2)
  },
  addButton: {
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'white'
    }
  },
  spacer: {
    flexGrow: 0.99
  },
  closed: {
    display: 'none'
  }
}));

// TaskCard functional component lists the tasks for a user
function TaskCard({ setTasks, status, tasks, className, ...rest }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [editing, setEditing] = useState(false);

  const handleDropDown = event => {
    if (open) {
      handleEditing();
    }
    setOpen(!open);
  };

  const handleAddTask = event => {
    if (!open) {
      setOpen(true);
    }
    setEditing(true);
  };

  const handleEditing = () => {
    if (editing) {
      setEditing(false);
    }
    if (newTask != '') {
      setTasks(tasks => [...tasks, newTask]);
    }
  };

  const dropButton = open ? (
    <Button
      className={classes.addButton}
      color="primary"
      onClick={handleDropDown}
      disableRipple
    >
      <ArrowDropDownIcon fontSize="large" />
    </Button>
  ) : (
    <Button
      className={classes.addButton}
      color="primary"
      onClick={handleDropDown}
      disableRipple
    >
      <ArrowRightIcon fontSize="large" />
    </Button>
  );

  const blankTask = editing ? (
    <EditCheckListItem
      editing={true}
      text=""
      setEditing={setEditing}
      setTasks={setTasks}
      complete={false}
      tasks={tasks}
    />
  ) : null;

  const taskList = (
    <List
      disablePadding
      className={clsx({
        [classes.closed]: !open
      })}
    >
      {tasks.map(item => (
        <EditCheckListItem
          taskID={item.id}
          key={item.id}
          editing={false}
          text={item.description}
          setEditing={setEditing}
          setTasks={setTasks}
          complete={item.complete}
          tasks={tasks}
        />
      ))}
      {blankTask}
    </List>
  );

  return (
    <Card {...rest} className={clsx({ [classes.root]: true, className })}>
      <Grid container className={classes.head}>
        <Grid item>{dropButton}</Grid>
        <Typography variant="h4" className={classes.title}>
          {status}
        </Typography>
        <div className={classes.spacer}></div>
        <Grid item>
          <Button color="primary" onClick={handleAddTask} justify="flex-end">
            + Add Task
          </Button>
        </Grid>
      </Grid>
      <Divider />
      {taskList}
    </Card>
  );
}

TaskCard.propTypes = {
  className: PropTypes.string
};

export default TaskCard;
