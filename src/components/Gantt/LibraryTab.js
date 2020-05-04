import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import GanttTask from './GanttTask';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
    paddingRight: theme.spacing(2),
    borderTopLeftRadius: '3px',
    marginBottom: theme.spacing(0.2)
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
  }
}));

export default function LibraryTab(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDropDown = event => {
    setOpen(!open);
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

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.left}>
        {dropButton}
        <Typography variant="h6">{props.library.title}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6">{props.library.owner}</Typography>
      </Grid>
    </Grid>
  );
}
