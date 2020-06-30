import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import CalendarRow from './CalendarRow';

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
    height: '50px',
    borderRight: '1px solid #E6E6E6',
    borderBottom: '1px solid #E6E6E6',
    color: '#909090',
    paddingLeft: theme.spacing(2)
  },
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

  useEffect(() => {}, [props.libraries]);

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
    const result = arrDays.reverse();
    return result;
  };

  // Sets open/closed rows for main level Library samples in chart
  // const getCalendarRows = () => {
  //   const days = getDaysInMonth();
  //   let rows = [];
  //   props.libraries.map(library => {
  //     library.tasks.map(task => {
  //       rows.push(
  //         <CalendarRow
  //           libraryID={library.id}
  //           taskID={null}
  //           openRows={props.openRows}
  //           task={task}
  //           daysInMonth={days}
  //         />
  //       );
  //       task.subtasks.map(subtask => {
  //         rows.push(
  //           <CalendarRow
  //             libraryID={library.id}
  //             taskID={task.id}
  //             openRows={props.openRows}
  //             task={subtask}
  //             daysInMonth={days}
  //           />
  //         );
  //       });
  //     });
  //   });
  //   return rows;
  // };

  const getCalendarRows = () => {
    const days = getDaysInMonth();
    let rows = [];
    props.libraries.map(library => {
      rows.push(
        <CalendarRow
          libraryID={library.id}
          taskID={null}
          openRows={props.openRows}
          task={library}
          daysInMonth={days}
        />
      );
    });

    return rows;
  };

  const getDayStyle = day => {
    if (day == 'S') {
      return '#e8e8e8';
    }
  };

  const getMonth = () => {
    const daysInMonth = getDaysInMonth();
    return (
      <div className={classes.monthContainer}>
        <div className={classes.monthTitle}>{moment().format('MMMM')}</div>
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
        <table className={classes.calendarRows}>{getCalendarRows()}</table>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.month}>{getMonth()}</div>
    </div>
  );
}
