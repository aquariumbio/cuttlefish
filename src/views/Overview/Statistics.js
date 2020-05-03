import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Typography,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1)
  },
  subroot: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 20
  }
}));

function Statistics({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      className={classes.grid}
    >
      <Grid
        item
        lg={3}
        sm={6}
        xs={12}
      >
        <Card
          {...rest}
          className={clsx(classes.subroot, className)}
        >
          <div>
            <Typography
              component="h3"
              gutterBottom
              variant="overline"
            >
              Total Projects
            </Typography>
            <div className={classes.details}>
              <Typography variant="h3">
                3
              </Typography>
            </div>
            <Typography
              component="h6"
              variant="overline"
            >
              projects
            </Typography>
          </div>
        </Card>
      </Grid>
      <Grid
        item
        lg={3}
        sm={6}
        xs={12}
      >
        <Card
          {...rest}
          className={clsx(classes.subroot, className)}
        >
          <div>
            <Typography
              component="h3"
              gutterBottom
              variant="overline"
            >
              Total Tasks
            </Typography>
            <div className={classes.details}>
              <Typography variant="h3">
                18
              </Typography>
            </div>
            <Typography
              component="h6"
              variant="overline"
            >
              tasks
            </Typography>
          </div>
        </Card>
      </Grid>
      <Grid
        item
        lg={3}
        sm={6}
        xs={12}
      >
        <Card
          {...rest}
          className={clsx(classes.subroot, className)}
        >
          <div>
            <Typography
              component="h3"
              gutterBottom
              variant="overline"
            >
              Total Users
            </Typography>
            <div className={classes.details}>
              <Typography variant="h3">
                2
              </Typography>
            </div>
            <Typography
              component="h6"
              variant="overline"
            >
              users
            </Typography>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Statistics;
