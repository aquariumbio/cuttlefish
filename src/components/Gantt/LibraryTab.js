import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import LibraryTask from './LibraryTask';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  dropButton: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    },
    padding: 0,
    margin: 0
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  libraryTasks: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  title: {
    background: theme.palette.primary.light,
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: theme.spacing(2),
    borderTopLeftRadius: '3px',
    marginBottom: theme.spacing(0.2),
    width: '100%'
  }
}));

export default function LibraryTab(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDropDown = event => {
    if (!open) {
      props.setRowCount(props.rowCount + props.library.tasks.length);
      setOpen(true);
    } else {
      props.setRowCount(props.rowCount - props.library.tasks.length);
      setOpen(false);
    }
  };

  const dropButton = open ? (
    <Button
      className={classes.dropButton}
      color="primary"
      onClick={handleDropDown}
      disableRipple
    >
      <ArrowDropDownIcon fontSize="large" />
    </Button>
  ) : (
    <Button
      className={classes.dropButton}
      color="primary"
      onClick={handleDropDown}
      disableRipple
    >
      <ArrowRightIcon fontSize="large" />
    </Button>
  );
  const tasks = open
    ? props.library.tasks.map(task => (
        <Grid item>
          <LibraryTask
            task={task}
            setRowCount={props.setRowCount}
            rowCount={props.rowCount}
          />
        </Grid>
      ))
    : null;

  return (
    <Grid container className={classes.root}>
      <div className={classes.title}>
        <Grid item className={classes.left}>
          {dropButton}
          <Typography variant="h6" noWrap>
            {props.library.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" noWrap>
            {props.library.owner}
          </Typography>
        </Grid>
      </div>
      <Grid item className={classes.libraryTasks}>
        {tasks}
      </Grid>
    </Grid>
  );
}
