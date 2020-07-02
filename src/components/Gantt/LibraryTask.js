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
    height: '50px'
  },
  left: {
    display: 'flex',
    alignItems: 'center'
  },
  right: {
    display: 'flex',
    alignItems: 'flex-end',
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

  // Handles dropdown as well as visible rows in calendar view
  const handleDropDown = event => {
    if (!open) {
      props.setOpenRows([...props.openRows, props.operation.id]);
      setOpen(true);
    } else {
      // props.setOpenRows(props.openRows.filter(e => e !== props.operation.id));
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
          {/* <IconButton>
            <AddCircleOutlineOutlinedIcon color="action" fontSize="small" />
          </IconButton> */}
          {dropButton}
          <Typography variant="h6" noWrap>
            {props.operation.operation_type_id}
          </Typography>
        </Grid>
        <Grid item zeroMinWidth className={classes.right}>
          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            {/* <IconButton>
              <EditOutlinedIcon color="action" fontSize="small" />
            </IconButton> */}
          </Grid>
        </Grid>
      </Grid>
      <Grid container>{open ? props.children : null}</Grid>
    </div>
  );
}
