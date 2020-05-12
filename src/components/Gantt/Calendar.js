import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const mockData = [
  {
    name: 'May',
    days: 31
  }
];

const months = moment().months();
const week = moment().week();
const currentMonth = moment().format('MMMM');

export default function Calendar() {
  const classes = useStyles();
  const [date, setDate] = useState(moment().toDate());

  const monthItems = mockData.map(month => (
    <Grid item className={classes.month}>
      <Grid container direction="column">
        <Grid item>{currentMonth}</Grid>
        <Grid container direction="row" className={classes.days}>
          {week}
        </Grid>
      </Grid>
    </Grid>
  ));

  return (
    <Grid container className={classes.root}>
      {monthItems}
    </Grid>
  );
}
