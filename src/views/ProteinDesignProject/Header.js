import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({}));

function Header(props) {
  const classes = useStyles();
  const session = useSelector(state => state.session);

  const getButton = () => {
    if (props.currentTab === 0) {
      return null;
    } else if (props.currentTab === 1) {
      return (
        <Button color="primary" variant="contained" onClick={props.onEventAdd}>
          <AddIcon className={classes.addIcon} />
          Create Library
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <Grid alignItems="center" container justify="space-between" spacing={3}>
        <Grid item md={6} xs={12}>
          <Typography component="h1" gutterBottom variant="h3">
            {session.currentProject.title}
          </Typography>
        </Grid>
        <Grid item>{getButton()}</Grid>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
