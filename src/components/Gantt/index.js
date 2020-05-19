import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import LibraryTab from './LibraryTab';
import Page from '../Page';
import Calendar from './Calendar';

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
  calendar: {
    background: theme.palette.white.main,
    width: '55vw',
    marginLeft: theme.spacing(1)
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
  },
  libraries: {
    width: '100%'
  }
}));

export default function Gantt(props) {
  const classes = useStyles();
  const [libraries, setLibraries] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const libraries = [];
    for (const list of props.data.libraries) {
      libraries.push({ ...list, items: [] });
    }
    setLibraries(libraries);
  }, []);

  const libraryTabs = libraries.map(library => (
    <LibraryTab
      library={library}
      setRowCount={setRowCount}
      rowCount={rowCount}
    />
  ));

  return (
    <Page className={classes.root} title={'Gantt Chart'}>
      <div className={classes.container}>
        <div className={classes.taskList}>
          <Grid item className={classes.topBar}>
            <Typography variant="h4" noWrap>
              Library
            </Typography>
            <Typography variant="h4" noWrap>
              Owner
            </Typography>
          </Grid>
          <div className={classes.libraries}>{libraryTabs}</div>
        </div>
        <div className={classes.calendar}>
          <Calendar rowCount={rowCount} />
        </div>
      </div>
    </Page>
  );
}
