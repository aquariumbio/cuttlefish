import React, { useState } from 'react';
import { Grid, GridItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {},
  month: { display: 'flex', overflowX: 'auto' },
  monthTitle: {
    height: '50px',
    borderRight: '1px solid black',
    borderBottom: '1px solid black'
  },
  days: {
    display: 'flex',
    overflowX: 'auto',
    height: '100vh'
  },
  day: {
    textAlign: 'center',
    minWidth: '30px',
    background: theme.palette.white.main,
    height: '100vh',
    borderRight: '1px solid black'
  }
}));

let days = [
  'F',
  'S',
  'S',
  'M',
  'T',
  'W',
  'T',
  'F',
  'S',
  'S',
  'M',
  'T',
  'W',
  'T',
  'F',
  'S',
  'S',
  'M',
  'T',
  'W',
  'T',
  'F',
  'S',
  'S',
  'M',
  'T',
  'W',
  'T',
  'F',
  'S',
  'S'
];

const months = moment().months();
const week = moment().week();
const currentMonth = moment().format('MMMM');

export default function Calendar() {
  const classes = useStyles();
  const [date, setDate] = useState(moment().toDate());

  return (
    <div className={classes.root}>
      <div className={classes.month}>
        <div>
          <div className={classes.monthTitle}>May</div>
          <div className={classes.days}>
            {days.map(day => (
              <div className={classes.day}>{day}</div>
            ))}
          </div>
        </div>
        <div>
          <div className={classes.monthTitle}>June</div>
          <div className={classes.days}>
            {days.map(day => (
              <div className={classes.day}>{day}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
