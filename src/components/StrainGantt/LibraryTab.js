import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import LibraryTask from './LibraryTask';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  dropButton: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    },
    padding: 0,
    margin: 0
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'calc(80%)'
  },
  libraryTasks: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  title: {
    background: theme.palette.primary.light,
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: theme.spacing(2),
    marginBottom: '1px',
    borderTopLeftRadius: '3px',
    width: '100%'
  },
  strainName: {
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1,
  }
}));

export default function LibraryTab(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    props.setOpenRows([...props.openRows, props.plan.id]);
  }, []);

  const getChildrenIDs = () => {
    const IDs = [];
    props.plan.jobs.map(job => {
      IDs.push(job.id);
    });
    return IDs;
  };

  // Handles dropdown as well as visible rows in calendar view
  const handleDropDown = event => {
    const childrenIDs = getChildrenIDs();
    if (!open) {
      props.setOpenRows([...props.openRows, ...childrenIDs]);
      setOpen(true);
    } else {
      props.setOpenRows(props.openRows.filter(e => !childrenIDs.includes(e)));
      setOpen(false);
    }
  };

  const dropButton = open ? (
    <Button
      className={classes.dropButton}
      color="primary"
      onClick={handleDropDown}
      disableRipple
    >
      <ArrowDropDownIcon fontSize="large" />
    </Button>
  ) : (
    <Button
      className={classes.dropButton}
      color="primary"
      onClick={handleDropDown}
      disableRipple
    >
      <ArrowRightIcon fontSize="large" />
    </Button>
  );

  return (
    <Grid container className={classes.root}>
      <div className={classes.title}>
        <Grid item className={classes.left}>
          {dropButton}

          <Typography variant="body1" className={classes.strainName} >
              {props.plan.name}

          </Typography>

        </Grid>
        <Grid item>
          <Typography variant="body1" noWrap>
            {props.plan.id}
          </Typography>
        </Grid>
      </div>
      <Grid item className={classes.libraryTasks}>
        {open ? props.children : null}
      </Grid>
    </Grid>
  );
}
