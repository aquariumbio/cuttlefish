import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, IconButton } from '@material-ui/core';
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
    marginLeft: theme.spacing(12)
  },
  right: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'end',
    marginRight: theme.spacing(1)
  }
}));

export default function LibrarySubTask(props) {
  const classes = useStyles();

  return (
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
            {props.operation.id}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
