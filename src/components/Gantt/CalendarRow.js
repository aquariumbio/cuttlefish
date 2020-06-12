import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  hidden: {
    display: 'none'
  },
  tableRow: {
    overflow: 'hidden',
    lineHeight: 0
  },
  tableHead: {
    minHeight: '50px',
    minWidth: '30px',
    display: 'inline-block',
    borderRight: '1px solid #E6E6E6'
  }
}));

// CalendarRow shows visual dates for specific sample schedule in the calendar
export default function CalendarRow(props) {
  const classes = useStyles();
  const [hidden, setHidden] = useState();
  const getStyle = () => {
    if (props.taskID == null) {
      return props.openRows.includes(props.libraryID)
        ? classes.root
        : `${classes.hidden} ${classes.root}`;
    } else {
      return props.openRows.includes(props.libraryID) &&
        props.openRows.includes(props.taskID)
        ? classes.root
        : `${classes.hidden} ${classes.root}`;
    }
  };

  const getStatusColor = (completed, started) => {
    if (completed) {
      return '#4CAF50'; // Green
    } else if (started) {
      return '#FFC164'; // Yellow
    } else {
      return '#C9C9C9'; // Grey
    }
  };

  useEffect(() => {
    setHidden(props.openRows.includes(props.id));
  }, []);

  // Render the specific day block for the row
  const getDay = (day, task) => {
    if (task.startDate <= day && day <= task.endDate) {
      return (
        <tr
          style={{
            backgroundColor: getStatusColor(task.completed, task.started)
          }}
          className={classes.tableRow}
        >
          <th className={classes.tableHead}></th>
        </tr>
      );
    } else {
      return (
        <tr className={classes.tableRow}>
          <th className={classes.tableHead}></th>
        </tr>
      );
    }
  };

  // Render the row
  const row = props.daysInMonth.map(day => {
    return getDay(day, props.task);
  });

  return <div className={getStyle()}>{row}</div>;
}
