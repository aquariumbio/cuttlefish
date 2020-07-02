import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

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
      return props.openRows.includes(props.operationID)
        ? classes.root
        : `${classes.hidden} ${classes.root}`;
    } else {
      return props.openRows.includes(props.operationID) &&
        props.openRows.includes(props.taskID)
        ? classes.root
        : `${classes.hidden} ${classes.root}`;
    }
  };

  const getStatusColor = status => {
    if (status === 'done') {
      return '#4CAF50'; // Green
    } else if (status === 'pending') {
      return '#FFC164'; // Yellow
    } else {
      return '#C9C9C9'; // Grey
    }
  };

  useEffect(() => {
    setHidden(props.openRows.includes(props.operationID));
  }, [props.operationID, props.openRows]);

  // Render the specific day block for the row
  const getDay = (day, operation) => {
    const start = moment(operation.created_at);
    let between = moment(day.format('MM/DD/YYYY')).isSame(
      start.format('MM/DD/YYYY')
    );
    if (between) {
      return (
        <tr
          style={{
            backgroundColor: getStatusColor(operation.status)
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
    return getDay(day, props.operation);
  });

  return (
    <div className={getStyle()} key={props.operation.id}>
      {row}
    </div>
  );
}
