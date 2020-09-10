import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import Page from '../Page';
import SampleBar from './SampleBar';
import Calendar from './Calendar';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '2px'
  },
  container: {
    display: 'flex'
  },
  calendar: {
    background: theme.palette.white.main,
    marginLeft: theme.spacing(1),
    overflow: 'auto'
  },
  progress: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(5)
    }
  }
}));

export default function Gantt(props) {
  const classes = useStyles();
  const session = useSelector(state => state.session);
  const [plans, setPlans] = useState([]);
  const [openRows, setOpenRows] = useState(
    []
  ); /* Tracks which rows to hide in calendar */

  useEffect(() => {
    if (props.data != null) {
      fetchSamplesFromPlans();
    }
  }, [props.data]);

  const fetchSamplesFromPlans = async () => {
    const planList = [];
    const currentOpenRows = [];
    let i = 0;
    for (const list of props.data) {
      planList.push(list);
      currentOpenRows.push(list.id);
      i++;
    }
    setPlans(planList);
    setOpenRows(currentOpenRows);
  };

  return (
    <Page className={classes.root} title={'Strains'}>
      <div className={classes.container}>
        {plans.length < 1 ? (
          <LinearProgress className={classes.progress} color="primary" />
        ) : (
          <>
            <SampleBar
              plans={plans}
              openRows={openRows}
              setOpenRows={setOpenRows}
            />
            <div className={classes.calendar}>
              <Calendar
                plans={plans}
                openRows={openRows}
                setOpenRows={setOpenRows}
              />
            </div>
          </>
        )}
      </div>
    </Page>
  );
}
