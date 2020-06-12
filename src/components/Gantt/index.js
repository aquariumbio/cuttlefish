import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import Page from '../Page';
import SampleBar from './SampleBar';
import Calendar from './Calendar';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '2px'
  },
  container: {
    display: 'flex'
  },

  calendar: {
    background: theme.palette.white.main,
    width: '45vw',
    marginLeft: theme.spacing(1)
  }
}));

export default function Gantt(props) {
  const classes = useStyles();
  const [libraries, setLibraries] = useState([]);
  const [date, setDate] = useState(moment().toDate());
  const [monthsLoaded, setMonthsLoaded] = useState(0);
  const [
    openRows,
    setOpenRows
  ] = useState(); /* Tracks which rows to show in calendar */

  useEffect(() => {
    const libraries = [];
    const currentOpenRows = [];
    for (const list of props.data.libraries) {
      libraries.push(list);
      currentOpenRows.push(list.id);
    }
    setOpenRows(currentOpenRows);
    setLibraries(libraries);
  }, []);

  return (
    <Page className={classes.root} title={'Gantt Chart'}>
      <div className={classes.container}>
        <SampleBar
          libraries={libraries}
          openRows={openRows}
          setOpenRows={setOpenRows}
        />
        <div className={classes.calendar}>
          <Calendar
            libraries={libraries}
            openRows={openRows}
            setOpenRows={setOpenRows}
          />
        </div>
      </div>
    </Page>
  );
}
