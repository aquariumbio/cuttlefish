import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  filterlisticon: {
    marginTop: 15,
    marginLeft: 15
  }
}));

function OngoingProjects({ customer, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid container spacing={11}>
        <Grid item xs={10}>
          <CardHeader title="Ongoing Projects" />
        </Grid>
        <Grid item xs>
          <FilterListIcon className={classes.filterlisticon} />
        </Grid>
      </Grid>
      <Divider />
      <CardContent className={classes.content}></CardContent>
    </Card>
  );
}

export default OngoingProjects;
