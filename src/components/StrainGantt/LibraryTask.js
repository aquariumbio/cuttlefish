import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button, IconButton } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LibrarySubTask from './LibrarySubTask';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.white.main,
    height: '50px',
    marginBottom: '1px'
  },
  left: {
    display: 'flex',
    alignItems: 'center'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginRight: theme.spacing(1)
  },
  dropButton: {
    '&:hover': {
      backgroundColor: theme.palette.white.main
    },
    padding: 0,
    margin: 0,
    minHeight: 0
  }
}));

export default function LibraryTask(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    if (props.open) {
      props.setOpenRows([...props.openRows, props.operation.id]);
    }
  }, []);

  const getChildrenIDs = () => {
    const IDs = [];
    props.job.operations.map(operation => {
      IDs.push(operation.id);
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
    <div>
      <Grid container className={classes.root}>
        <Grid item xs className={classes.left} zeroMinWidth>
          {dropButton}
          <Typography variant="h6" noWrap>
            {props.name}
          </Typography>
        </Grid>
        <Grid item zeroMinWidth className={classes.right}>
          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Typography variant="h6" noWrap>
              {props.operation.id}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>{open ? props.children : null}</Grid>
    </div>
  );
}