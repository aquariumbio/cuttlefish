import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import Page from '../Page';
import SampleBar from './SampleBar';
import Calendar from './Calendar';
import { useSelector } from 'react-redux';

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
  const session = useSelector(state => state.session);
  const [libraries, setLibraries] = useState([]);
  const [date, setDate] = useState(moment().toDate());
  const [monthsLoaded, setMonthsLoaded] = useState(0);
  const [
    openRows,
    setOpenRows
  ] = useState(); /* Tracks which rows to hide in calendar */

  useEffect(() => {
    if (props.data != null) {
      fetchSamplesFromPlans();
    }
  }, [props.data]);

  const fetchSamplesFromPlans = async () => {
    const libraries = [];
    // const currentOpenRows = [];
    for (const list of props.data) {
      const plan = JSON.parse(list.data);
      libraries.push(plan);
      // currentOpenRows.push(plan.id);
    }
    setOpenRows([]);
    setLibraries(libraries);
  };

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
