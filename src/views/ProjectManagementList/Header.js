import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CreateProject from '../Overview/CreateProject'

const useStyles = makeStyles((theme) => ({
  addButton: {
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

function Header({ className, ...rest }) {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            Projects
          </Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.addButton}
            color="primary"
            variant="contained"
            onClick={handleShow}
          >
            <AddIcon className={classes.addIcon} />
            Add project
          </Button>
          <Modal open={show} onHide={handleClose} animation={false}>
            <CreateProject show={show} setShow={setShow} />
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
