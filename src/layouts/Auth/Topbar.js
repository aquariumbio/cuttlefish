import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import img from "src/images/logo.png"

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  }
}));

function Topbar({ className, ...rest }) {
  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} color="primary">
      <Toolbar>
        <RouterLink to="/"><img alt="Logo" src={img} height="50"/></RouterLink>
      </Toolbar>
    </AppBar>
  );
}

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
