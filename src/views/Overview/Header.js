import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  summaryButton: {
    backgroundColor: theme.palette.common.white
  },
  barChartIcon: {
    marginRight: theme.spacing(1)
  },
  image: {
    width: '100%',
    maxHeight: 400
  }
}));

function Header({ className, ...rest }) {
  const classes = useStyles();
  const session = useSelector((state) => state.session);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Overview
          </Typography>
          <Typography
            component="h1"
            gutterBottom
            variant="h3"
          >
            Welcome back,
            {' '}
            {session.user.first_name}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
          >
            Here’s what’s happening with your projects today
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
