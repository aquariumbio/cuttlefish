import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  }
}));

function TasksDueSoon({ customer, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Tasks Due Soon" />
      <Divider />
      <CardContent className={classes.content}>
 
      </CardContent>
    </Card>
  );
}

export default TasksDueSoon;
