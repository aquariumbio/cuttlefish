import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function GanttTask() {
  const classes = useStyles();

  return <div className={classes.root}>Task</div>;
}
