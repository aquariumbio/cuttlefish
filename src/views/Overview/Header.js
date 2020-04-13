import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  addIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header() {
  const classes = useStyles();
  const session = useSelector((state) => state.session);

  return (
    <div>
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
        <Grid item>
          <Button
            color="primary"
            component={RouterLink}
            variant="contained"
          >
            <AddIcon className={classes.addIcon} />
            Create Project
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
