import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import uuid from 'uuid/v1';

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
    lineHeight: 0,
    borderBottom: '1px solid #E6E6E6',
    width: '30px'
  },
  tableHead: {
    minHeight: '50px',
    minWidth: '30px',
    display: 'inline-block',
    borderRight: '1px solid #E6E6E6'
  },
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing(1),
    boxShadow: 'none'
  }
}));

// CalendarRow shows visual dates for specific sample schedule in the calendar
export default function CalendarRow(props) {
  const classes = useStyles();
  const [hidden, setHidden] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getStyle = () => {
    if (props.parentID == null) {
      return props.openRows.includes(props.id)
        ? classes.root
        : `${classes.hidden} ${classes.root}`;
    } else {
      return props.openRows.includes(props.id) &&
        props.openRows.includes(props.parentID)
        ? classes.root
        : `${classes.hidden} ${classes.root}`;
    }
  };

  const getStatusColor = status => {
    if (status === 'done') {
      return '#4CAF50'; // Green
    } else if (status === 'pending') {
      return '#FFC164'; // Yellow
    } else if (status === 'error') {
      return '#FF0000'; // Red
    } else if (status === 'waiting') {
      return '#800080'; // Purple
    } else {
      return '#C9C9C9'; // Grey
    }
  };

  useEffect(() => {
    setHidden(props.openRows.includes(props.id));
  }, [props.id, props.openRows]);

  // Render the specific day block for the row
  const getDay = (day, operation) => {
    const start = moment(operation.created_at);
    const end = moment(operation.updated_at);
    const currentDay = day.format('MM/DD/YYYY');
    let between =
      start.format('MM/DD/YYYY') <= currentDay &&
      end.format('MM/DD/YYYY') >= currentDay;

    if (between) {
      return (
        <React.Fragment key={operation.id + currentDay}>
          <tr
            style={{
              backgroundColor: getStatusColor(operation.status)
            }}
            className={classes.tableRow}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <th className={classes.tableHead}></th>
          </tr>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography>
              <b>Name: </b>
              {props.name}
            </Typography>
            <Typography>
              <b>Status: </b>
              {operation.status}
            </Typography>
            <Typography>
              <b>Created At: </b>
              {start.format('dddd, MMMM Do YYYY	')}
            </Typography>
            <Typography>
              <b>Updated At: </b>
              {end.format('dddd, MMMM Do YYYY	')}
            </Typography>
          </Popover>
        </React.Fragment>
      );
    } else {
      return (
        <tr className={classes.tableRow} key={operation.id + currentDay}>
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
    <tbody className={getStyle()} key={uuid()}>
      {/* <tbody className={getStyle()}> */}
      {row}
    </tbody>
  );
}
