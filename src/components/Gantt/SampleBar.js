import React, { useState, useEffect } from 'react';
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
    height: '50px',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    borderTopLeftRadius: '3px',
    marginBottom: theme.spacing(0.2),
    textOverflow: 'ellipsis'
  }
}));

const CustomTypography = withStyles(theme => ({
  h5: {
    color: '#FFFFFF'
  }
}))(Typography);

// Dropdown menu that lists samples, paired with Calendar to form a Gantt chart
export default function SampleBar(props) {
  const classes = useStyles();

  useEffect(() => {}, [props.libraries]);

  const libraryTabs = props.libraries.map(library => (
    <LibraryTab
      library={library}
      open={false}
      setOpenRows={props.setOpenRows}
      openRows={props.openRows}
    >
      {library.operations.map(operation => (
        <Grid item>
          <LibraryTask
            operation={operation}
            open={false}
            setOpenRows={props.setOpenRows}
            openRows={props.openRows}
          >
            {/* {task.subtasks.map(subtask => (
              <LibrarySubTask subtask={subtask} />
            ))} */}
          </LibraryTask>
        </Grid>
      ))}
    </LibraryTab>
  ));

  // const libraryTabs = props.libraries.map(library => (
  //   <LibraryTab
  //     library={library}
  //     open={true}
  //     setOpenRows={props.setOpenRows}
  //     openRows={props.openRows}
  //   ></LibraryTab>
  // ));

  return (
    <div className={classes.taskList}>
      <Grid item className={classes.topBar}>
        <CustomTypography variant="h5" noWrap>
          Library
        </CustomTypography>
        <CustomTypography variant="h5" noWrap>
          Owner
        </CustomTypography>
      </Grid>
      <div className={classes.libraries}>{libraryTabs}</div>
    </div>
  );
}
