import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, Modal } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddListDialog from './AddListDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2)
  }
}));

function Header({ onListAdd, className, ...rest }) {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  
  const [state, setState] = React.useState({
    filter: '',
    name: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        container
        justify="space-between"
      >
        <Grid item>
          <FormControl variant="outlined">
            <Select
              native
              value={state.age}
              onChange={handleChange}
              inputProps={{
                name: 'filter'
              }}
            >
              <option value={"Tasks By Status"}>Tasks By Status</option>
              <option value={"Tasks By Engineer"}>Tasks By Engineer</option>
              <option value={"Tasks in Current Sprint"}>Tasks in Current Sprint</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            // onClick={onListAdd}
            onClick={handleShow}
            variant="contained"
          >
            Add list
          </Button>
          <Modal open={show} onHide={handleClose} animation={false}>
            <AddListDialog show={show} setShow={setShow} />
          </Modal>
        </Grid>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  onListAdd: PropTypes.func
};

export default Header;
