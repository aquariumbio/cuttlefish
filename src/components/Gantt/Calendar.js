import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { Button, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CalendarRow from './CalendarRow';
import { set } from 'immutable';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '2px'
  },
  container: {
    display: 'flex'
  },

  month: { display: 'flex', overflowX: 'auto' },
  monthContainer: { display: 'flex', flexDirection: 'column' },
  monthTitle: {
    display: 'flex',
    flexDirection: 'space-between',
    height: '50px',
    borderRight: '1px solid #E6E6E6',
    borderBottom: '1px solid #E6E6E6',
    color: '#909090',
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(0.2)
  },
  buttons: { position: 'absolute', paddingLeft: theme.spacing(4) },
  dayTitles: {
    display: 'flex',
    overflowX: 'auto'
  },
  day: {
    textAlign: 'center',
    minWidth: '30px',
    borderRight: '1px solid #E6E6E6',
    color: '#969696'
  },
  calendarRows: {
    display: 'flex',
    flexDirection: 'column',
    borderCollapse: 'collapse',
    border: 0,
    borderSpacing: 0
  },
  dayHeader: {
    minHeight: '50px'
  }
}));

let weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function Calendar(props) {
  const classes = useStyles();
  const [date, setDate] = useState(moment().toDate());
  const [monthsLoaded, setMonthsLoaded] = useState(0);

  useEffect(() => {}, [props.libraries, props.openRows, monthsLoaded]);

  const getDaysInMonth = () => {
    var daysInMonth = moment()
      .add(monthsLoaded, 'month')
      .daysInMonth();
    var arrDays = [];

    while (daysInMonth) {
      var current = moment()
        .add(monthsLoaded, 'month')
        .date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }
    const result = arrDays.reverse();
    return result;
  };

  // Sets open/closed rows for main level Library samples in chart
  const getCalendarRows = () => {
    const days = getDaysInMonth();
    let rows = [];
    props.libraries.map(library => {
      rows.push(
        <CalendarRow
          operationID={library.id}
          parentID={null}
          openRows={props.openRows}
          operation={library}
          daysInMonth={days}
        />
      );
      library.operations.map(operation => {
        rows.push(
          <CalendarRow
            operationID={operation.id}
            parentID={null}
            openRows={props.openRows}
            operation={operation}
            daysInMonth={days}
          />
        );
        // operation.subtasks.map(subtask => {
        //   rows.push(
        //     <CalendarRow
        //       operationID={library.id}
        //       taskID={operation.id}
        //       openRows={props.openRows}
        //       operation={subtask}
        //       daysInMonth={days}
        //     />
        //   );
        // });
      });
    });
    return rows;
  };

  // const getCalendarRows = () => {
  //   const days = getDaysInMonth();
  //   let rows = [];
  //   props.libraries.map(library => {
  //     rows.push(
  //       <CalendarRow
  //         libraryID={library.id}
  //         parentID={null}
  //         openRows={props.openRows}
  //         task={library}
  //         daysInMonth={days}
  //       />
  //     );
  //   });

  //   return rows;
  // };

  const getDayStyle = day => {
    if (day == 'S') {
      return '#e8e8e8';
    }
  };

  const handleScroll = e => {
    let element = e.target;
    if (element.scrollWidth - element.scrollLeft === element.clientWidth) {
      console.log('SCROLLED TO END');
    }
  };

  const getMonth = () => {
    const daysInMonth = getDaysInMonth();
    return (
      <div className={classes.monthContainer}>
        <div>
          <div className={classes.monthTitle}>
            <div>
              {moment()
                .add(monthsLoaded, 'month')
                .format('MMMM')}
            </div>
            <div className={classes.buttons}>
              <IconButton
                onClick={() => setMonthsLoaded(monthsLoaded - 1)}
                size="medium"
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                onClick={() => setMonthsLoaded(monthsLoaded + 1)}
                size="medium"
              >
                <ArrowForwardIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className={classes.dayTitles}>
          {daysInMonth.map(day => (
            <div
              className={classes.day}
              style={{ backgroundColor: getDayStyle(day.format('d')) }}
            >
              <div className={classes.dayHeader}>
                {weekdays[day.format('d')]}
              </div>
            </div>
          ))}
        </div>
        <table className={classes.calendarRows} onScroll={e => handleScroll(e)}>
          {getCalendarRows()}
        </table>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.month}>{getMonth()}</div>
    </div>
  );
}
