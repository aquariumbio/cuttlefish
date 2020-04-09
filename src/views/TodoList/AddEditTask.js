/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'uuid/v1';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Divider,
  FormControlLabel,
  Switch,
  colors
} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  field: {
    marginTop: theme.spacing(3)
  },
  cancelButton: {
    marginLeft: 'auto'
  },
  confirmButton: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }
}));

const defaultTask = {
  start: moment().toDate(),
  end: moment().toDate()
};

const AddEditTask = forwardRef((props, ref) => {
  const { task, onDelete, onCancel, onAdd, onEdit, className, ...rest } = props;
  const classes = useStyles();
  const [values, setValues] = useState(task || { ...defaultTask });
  const mode = task ? 'edit' : 'add';

  const [selectEdge, setSelectEdge] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [taskStatus, setTaskStatus] = useState('todo');

  const handleRadioChange = event => {
    setTaskStatus(event.target.value);
  };

  const handleFieldChange = e => {
    e.persist();
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(task);
    }
  };

  const handleAdd = () => {
    if (!values.title || !values.desc) {
      return;
    }

    onAdd({ ...values, id: uuid() });
  };

  const handleEdit = () => {
    if (!values.title || !values.desc) {
      return;
    }

    onEdit(values);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)} ref={ref}>
      <form>
        <CardContent>
          <Typography align="left" gutterBottom variant="h3" color="primary">
            {mode === 'add' ? 'Add Task' : 'Edit Task'}
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            label="Task Name"
            name="task name"
            onChange={handleFieldChange}
            value="Name this task"
            variant="outlined"
          />
          <Grid container className={classes.field}>
            <Grid item xs={6}>
              <FormLabel component="legend">Start date</FormLabel>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/DD/YYYY"
                // margin="normal"
                id="date-picker-inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  row
                  aria-label="status"
                  name="status"
                  value={taskStatus}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="todo"
                    control={<Radio />}
                    label="Todo"
                  />
                  <FormControlLabel
                    value="in progresss"
                    control={<Radio />}
                    label="In Progress"
                  />
                  <FormControlLabel
                    value="complete"
                    control={<Radio />}
                    label="Complete"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <TextField
            className={classes.field}
            fullWidth
            label="Task description"
            name="description"
            onChange={handleFieldChange}
            value="Describe this task"
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            className={classes.cancelButton}
            onClick={onCancel}
            variant="contained"
          >
            Cancel
          </Button>
          {mode === 'add' ? (
            <Button
              className={classes.confirmButton}
              onClick={handleAdd}
              variant="contained"
            >
              Create
            </Button>
          ) : (
            <Button
              className={classes.confirmButton}
              onClick={handleEdit}
              variant="contained"
            >
              Save
            </Button>
          )}
        </CardActions>
      </form>
    </Card>
  );
});

AddEditTask.propTypes = {
  className: PropTypes.string,
  task: PropTypes.object,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default AddEditTask;
