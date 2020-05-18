import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Modal,
  Typography,
  Grid,
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CreateProject from './CreateProject';

const useStyles = makeStyles((theme) => ({
  createButton: {
    color: theme.palette.common.white,
    backgroundColor: '#065683',
    '&:hover': {
      backgroundColor: '#065683'
    }
  },
  addIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header() {
  const classes = useStyles();
  const session = useSelector((state) => state.session);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            className={classes.createButton}
            onClick={handleShow}
            variant="contained"
          >
            <AddIcon className={classes.addIcon} />
            Create Project
          </Button>
          <Modal open={show} onHide={handleClose} animation={false}>
            <div>
              <CreateProject show={show} setShow={setShow} />
            </div>
          </Modal>
        </Grid>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
