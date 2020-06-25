import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import Page from '../Page';
import SampleBar from './SampleBar';
import Calendar from './Calendar';
import { useDispatch } from 'react-redux';
import { setCurrentLibraries } from 'src/actions';

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
  const dispatch = useDispatch();
  const [libraries, setLibraries] = useState([]);
  const [date, setDate] = useState(moment().toDate());
  const [monthsLoaded, setMonthsLoaded] = useState(0);
  const [
    openRows,
    setOpenRows
  ] = useState(); /* Tracks which rows to hide in calendar */

  useEffect(() => {
    async function getSamples() {
      const libraries = [];
      const currentOpenRows = [];
      const response = await fetch('http://localhost:4000/testAPI/plans');
      const data = await response.json();
      for (const list of data) {
        libraries.push(list);
        currentOpenRows.push(list.id);
      }
      setOpenRows(currentOpenRows);
      dispatch(setCurrentLibraries(libraries));
      console.log(libraries);
      setLibraries(libraries);
    }
    getSamples();
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
