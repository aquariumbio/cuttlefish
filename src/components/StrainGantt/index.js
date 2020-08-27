import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import Page from '../Page';
import SampleBar from './SampleBar';
import Calendar from './Calendar';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
var CircularJSON = require('circular-json');

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
  const [operationNames, setOperationNames] = useState([]);
  const [date, setDate] = useState(moment());
  const [loading, setLoading] = useState();
  const [openRows, setOpenRows] = useState(
    []
  ); /* Tracks which rows to hide in calendar */

  useEffect(() => {
    if (props.data != null) {
      setGanttData();
    } else {
      setLoading(true);
    }
  }, [props.data]);

  async function setGanttData() {
    setLoading(true);
    const response = await fetch('http://localhost:4000/plans/op_names', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: session.user.aqLogin,
        password: session.user.aqPassword
      })
    });
    if (response.status === 200) {
      const names = await response.json();
      setOperationNames(names);
      await fetchSamplesFromPlans();
      setLoading(false);
    }
  }

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
              operationNames={operationNames}
            />
            <div className={classes.calendar}>
              <Calendar
                plans={plans}
                openRows={openRows}
                setOpenRows={setOpenRows}
                startDate={date}
              />
            </div>
          </>
        )}
      </div>
    </Page>
  );
}
