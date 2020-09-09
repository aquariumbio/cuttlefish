import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button, IconButton } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.white.main,
    height: '50px',
    marginBottom: '1px'
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(4)
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
  },
  linkButton: {
    padding: 0,
    margin: 0
  }
}));

export default function JobTab(props) {
  const classes = useStyles();

  const getIDLabel = job => {
    if (job.status != 'error' && job.status != 'done') {
      return job.status;
    } else {
      return (
        <Button
          href={`http://52.27.43.242/krill/log?job=` + props.job.id}
          target="_blank"
          className={classes.linkButton}
          color="primary"
        >
          {props.job.id}
        </Button>
      );
    }
  };
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs className={classes.left} zeroMinWidth>
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
              {getIDLabel(props.job)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
