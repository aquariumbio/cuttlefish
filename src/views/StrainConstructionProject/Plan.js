import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, Card } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    userSelect: 'none',
    whiteSpace: 'normal',
    height: '100%',
    display: 'inline-flex',
    flexDirection: 'column',
    verticalAlign: 'top',
    width: '100%',
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('xs')]: {
      width: 300
    }
  },
  header: {
    margin: theme.spacing(3),
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    width: 180,
    margin: theme.spacing(3),
    marginTop: 0
  }
}));

function Plan({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.header}>
        <Typography
          variant="h5"
        >
          AQ plan is the way the researcher describes the work that should be done.
          It consists of the operations and links between operations, also including the inputs.
        </Typography>
      </div>
      <a href="http://52.27.43.242/launcher">
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          endIcon={<ArrowForwardIosIcon />}
        >
          Go to AQ Plan
        </Button>
      </a>

    </Card>
  );
}

export default Plan;
