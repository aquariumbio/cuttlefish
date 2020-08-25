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
  const [libraries, setLibraries] = useState([]);
  const [date, setDate] = useState(moment());
  const [loading, setLoading] = useState();
  const [
    openRows,
    setOpenRows
  ] = useState(); /* Tracks which rows to hide in calendar */

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
      fetchSamplesFromPlans(names);
    }
  }

  const handleSetLoadingFalse = () => {
    console.log('DONE LOADING');
    setLoading(false);
  };

  const fetchSamplesFromPlans = async names => {
    const libraries = [];
    const currentOpenRows = [];
    let i = 0;
    for (const list of props.data) {
      const library = JSON.parse(list.data);
      library.operations.map(operation => {
        if (i == 0) {
          setDate(moment(operation.created_at));
          i++;
        }
        operation.name = getOperationName(names, operation.operation_type_id);
      });
      libraries.push(library);
      currentOpenRows.push(library.id);
    }
    setOpenRows(currentOpenRows);
    setLibraries(libraries);
    handleSetLoadingFalse();
  };

  const getOperationName = (names, id) => {
    if (names != null) {
      const operation = names.find(operation => operation.id == id);
      if (operation != null) {
        return operation.name;
      }
    }
    return 'LOADING';
  };

  return (
    <Page className={classes.root} title={'Timeline'}>
      <div className={classes.container}>
        {loading ? (
          <LinearProgress className={classes.progress} color="primary" />
        ) : (
          <>
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
                startDate={date}
              />
            </div>
          </>
        )}
      </div>
    </Page>
  );
}
