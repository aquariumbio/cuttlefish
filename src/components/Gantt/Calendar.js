import React, { useState, useEffect } from 'react';
import { Grid, GridItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {},
  month: { display: 'flex', overflowX: 'auto' },
  monthTitle: {
    height: '50px',
    borderRight: '1px solid #E6E6E6',
    borderBottom: '1px solid #E6E6E6',
    color: '#909090',
    paddingLeft: theme.spacing(2)
  },
  days: {
    display: 'flex',
    overflowX: 'auto',
    height: '100vh'
  },
  day: {
    textAlign: 'center',
    minWidth: '30px',
    height: '100vh',
    borderRight: '1px solid #E6E6E6',
    color: '#969696'
  },
  weekday: {
    background: theme.palette.white.main
  },
  weekend: {
    background: '#e8e8e8'
  },
  dayHeader: {
    minHeight: '50px'
  },
  table: { borderCollapse: 'collapse' },
  tableRow: {},
  tableHead: {
    minHeight: '50px',
    minWidth: '30px',
    display: 'inline-block'
  },
  completed: {
    backgroundColor: theme.palette.statusGreen.main,
    opacity: 0.51
  },
  inProgress: {
    backgroundColor: theme.palette.statusYellow.main,
    opacity: 0.58
  },
  notStarted: {
    backgroundColor: theme.palette.statusGrey.main,
    opacity: 0.79
  }
}));

let weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const months = moment().month();
const week = moment().week();
const currentMonth = moment().format('MMMM');

export default function Calendar(props) {
  const classes = useStyles();
  const [date, setDate] = useState(moment().toDate());
  const [monthsLoaded, setMonthsLoaded] = useState(0);

  const getRows = () => {
    let rows = [];
    for (let i = 0; i < props.rowCount; i++) {
      rows.push(
        <tr className={classes.inProgress}>
          <th className={classes.tableHead}></th>
        </tr>
      );
    }
    return rows;
  };

  const getDaysInMonth = () => {
    var daysInMonth = moment()
      .add(monthsLoaded, 'month')
      .daysInMonth();
    var arrDays = [];

    while (daysInMonth) {
      var current = moment().date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }

    return arrDays;
  };

  const getDayStyle = day => {
    if (day == 'S') {
      console.log(day);
      return classes.weekend;
    } else {
      return classes.weekday;
    }
  };

  const getMonth = () => {
    const days = getDaysInMonth();
    return (
      <div>
        <div className={classes.monthTitle}>{moment().format('MMMM')}</div>
        <div className={classes.days}>
          {days.map(day => (
            <div className={`${classes.day} ${getDayStyle(day.format('d'))}`}>
              <div className={classes.dayHeader}>
                {weekdays[day.format('d')]}
              </div>
              <table className={classes.table}>{getRows()}</table>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.month}>{getMonth()}</div>
    </div>
  );
}
