import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2)
  }
}));

function Header({ onListAdd, className, ...rest }) {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
    filter: '',
    name: '',
  });

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
            onClick={onListAdd}
            variant="contained"
          >
            Add list
          </Button>
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
