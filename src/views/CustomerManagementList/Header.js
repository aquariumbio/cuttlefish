import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Header({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Customers
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
          >
            Add customer
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
