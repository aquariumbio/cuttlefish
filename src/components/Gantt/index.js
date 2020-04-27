import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '2px'
  },
  taskList: {
    background: theme.palette.white.main,
    height: '80vh'
  },
  calendar: {
    background: theme.palette.white.main,
    height: '80vh'
  },
  topBar: {
    background: theme.palette.primary.main,
    display: 'flex'
  }
}));

export default function Gannt() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={3} className={classes.taskList}>
        <div className={classes.topBar}>
          <Typography variant="h4">Library</Typography>
          <Typography variant="h4">Owner</Typography>
        </div>
      </Grid>
      <Grid item xs={9} className={classes.calendar}>
        Calendar
      </Grid>
    </Grid>
  );
}
