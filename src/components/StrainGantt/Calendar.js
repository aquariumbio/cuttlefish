import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { Button, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CalendarRow from './CalendarRow';
import { set } from 'immutable';
import { StickyContainer, Sticky } from 'react-sticky';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '2px'
  },
  container: {
    display: 'flex'
  },

  month: { display: 'flex', overflowX: 'auto' },
  monthContainer: { display: 'flex', flexDirection: 'column', width: '50vw' },
  monthBar: {
    display: 'flex',
    flexDirection: 'column',
    height: '70px',
    borderRight: '1px solid #E6E6E6',
    borderBottom: '1px solid #E6E6E6',
    color: '#909090',
    backgroundColor: 'white'
  },
  spacer: { flexGrow: 1 },
  monthTitle: {
    width: '130px'
  },
  monthBarTop: {
    display: 'flex',
    position: 'absolute',
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  dayTitles: {
    display: 'flex',
    overflowX: 'auto'
  },
  day: {
    textAlign: 'center',
    width: '30px',
    color: '#969696'
  },
  calendarRows: {
    display: 'flex',
    flexDirection: 'column',
    borderCollapse: 'collapse',
    border: 0,
    borderSpacing: 0,
    width: '100%'
  },
  dayHeader: {},
  stickyContainer: {
    backgroundColor: 'white'
  }
}));

let weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function Calendar(props) {
  const classes = useStyles();
  const [monthsLoaded, setMonthsLoaded] = useState(0);
  const [date, setDate] = useState(props.startDate);

  const getDaysInMonth = dateOfFirstPlan => {
    var daysInMonth = moment(dateOfFirstPlan, 'MM/DD/YYYY')
      .add(monthsLoaded, 'month')
      .daysInMonth();
    var arrDays = [];

    while (daysInMonth) {
      var current = moment(dateOfFirstPlan, 'MM/DD/YYYY')
        .add(monthsLoaded, 'month')
        .date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }
    const result = arrDays.reverse();
    return result;
  };

  // Sets the calendar to display the month of the first plan in the project on project load
  const getDateOfFirstPlan = () => {
    var firstPlanDate = moment().toDate();
    props.plans.map(plan => {
      firstPlanDate = moment(plan.created_at);
    });
    return firstPlanDate.format('MM/DD/YYYY');
  };

  // Sets open/closed rows for main level plans in chart
  const getCalendarRows = dateOfFirstPlan => {
    const days = getDaysInMonth(dateOfFirstPlan);
    let rows = [];
    props.plans.map(plan => {
      rows.push(
        <CalendarRow
          key={plan.id}
          id={plan.id}
          parentID={null}
          openRows={props.openRows}
          operation={plan}
          daysInMonth={days}
          name={plan.name}
        />
      );
      plan.jobs.map(job => {
        rows.push(
          <CalendarRow
            key={job.id}
            id={job.id + plan.id}
            parentID={plan.id}
            openRows={props.openRows}
            operation={job}
            daysInMonth={days}
            name={job.operations[0].name}
          />
        );
      });
    });
    return rows;
  };

  const getDayStyle = day => {
    if (day == 'S') {
      return '#e8e8e8';
    }
  };

  const getMonth = () => {
    const dateOfFirstPlan = getDateOfFirstPlan();
    const daysInMonth = getDaysInMonth(dateOfFirstPlan);
    return (
      <div className={classes.monthContainer}>
        <StickyContainer>
          <Sticky>
            {({ style, isSticky }) => (
              <div
                style={{ ...style, paddingTop: isSticky ? '64px' : '0px' }}
                className={classes.stickyContainer}
              >
                <div className={classes.monthBar}>
                  <div className={classes.monthBarTop}>
                    <div className={classes.monthTitle}>
                      {moment(dateOfFirstPlan, 'MM/DD/YYYY')
                        .add(monthsLoaded, 'month')
                        .format('MMMM YYYY')}
                    </div>
                    <IconButton
                      onClick={() => setMonthsLoaded(monthsLoaded - 1)}
                      size="medium"
                      style={{ padding: 0, marginRight: '1rem' }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => setMonthsLoaded(monthsLoaded + 1)}
                      size="medium"
                      style={{ padding: 0 }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </div>
                  <div className={classes.spacer}></div>
                  <div className={classes.dayTitles}>
                    {daysInMonth.map(day => (
                      <div
                        className={classes.day}
                        style={{
                          backgroundColor: getDayStyle(day.format('d'))
                        }}
                      >
                        <div className={classes.dayHeader}>
                          {weekdays[day.format('d')]}
                          {/* {day.format('D')} */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Sticky>
          <table className={classes.calendarRows}>
            {props.plans.length > 0 ? getCalendarRows(dateOfFirstPlan) : null}
          </table>
        </StickyContainer>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.month}>{getMonth()}</div>
    </div>
  );
}
