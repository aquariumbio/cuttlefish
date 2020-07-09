import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import LibraryTab from './LibraryTab';
import LibraryTask from './LibraryTask';

import LibrarySubTask from './LibrarySubTask';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '2px'
  },
  container: {
    display: 'flex'
  },
  taskList: {
    background: theme.palette.white.main,
    width: '350px',
    minWidth: '350px',
    textOverflow: 'ellipsis'
  },

  topBar: {
    background: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    borderTopLeftRadius: '3px',
    // marginBottom: theme.spacing(0.2),
    textOverflow: 'ellipsis'
  }
}));

const CustomTypography = withStyles(theme => ({
  h5: {
    color: '#FFFFFF'
  }
}))(Typography);

// Dropdown menu that lists plan samples, paired with Calendar to form a Gantt chart
export default function SampleBar(props) {
  const classes = useStyles();
  const session = useSelector(state => state.session);
  const [sampleNames, setSampleNames] = useState();

  useEffect(() => {
    getOperationNames();
  }, [props.libraries]);

  async function getOperationNames() {
    const response = await fetch('http://localhost:4000/plans/op_names', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: session.user.username,
        password: session.user.password
      })
    });
    if (response.status === 200) {
      const data = await response.json();
      setSampleNames(data);
    } else {
      setSampleNames([]);
    }
  }

  const getOperationName = id => {
    if (sampleNames != null) {
      const operation = sampleNames.find(operation => operation.id == id);
      return operation.name;
    }
    return 'LOADING';
  };

  const libraryTabs = props.libraries.map(library => (
    <LibraryTab
      library={library}
      open={false}
      setOpenRows={props.setOpenRows}
      openRows={props.openRows}
    >
      {library.operations.map(operation => (
        <Grid item key={operation.id}>
          <LibraryTask
            operation={operation}
            open={false}
            setOpenRows={props.setOpenRows}
            openRows={props.openRows}
            name={getOperationName(operation.operation_type_id)}
          >
            {/* {task.subtasks.map(subtask => (
              <LibrarySubTask subtask={subtask} />
            ))} */}
          </LibraryTask>
        </Grid>
      ))}
    </LibraryTab>
  ));

  return (
    <div className={classes.taskList}>
      <Grid item className={classes.topBar}>
        <CustomTypography variant="h5" noWrap>
          Library
        </CustomTypography>
        <CustomTypography variant="h5" noWrap>
          Owner ID
        </CustomTypography>
      </Grid>
      <div className={classes.libraries}>{libraryTabs}</div>
    </div>
  );
}
