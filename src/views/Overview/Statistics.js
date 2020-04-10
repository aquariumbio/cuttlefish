import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Typography,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0
  },
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  overline: {
    marginTop: theme.spacing(1)
  }
}));

function Statistics({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
      >
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography variant="h2">
            2
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
          >
            Total Projects
          </Typography>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography variant="h2">
            50
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
          >
            Total Tasks
          </Typography>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography variant="h2">
            10
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
          >
            Total Users
          </Typography>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography variant="h2">
            12
          </Typography>
          <Typography
            className={classes.overline}
            variant="overline"
          >
            Total Notifications
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

Statistics.propTypes = {
  className: PropTypes.string
};

export default Statistics;
