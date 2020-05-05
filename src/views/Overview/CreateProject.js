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
  Chip,
  Divider,
  colors
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: colors.blue[900],
    '&:hover': {
      backgroundColor: colors.blue[600]
    }
  }
}));

const defaultEvent = {
  title: 'Enter your project name',
  type: 'Enter your project type',
  desc: 'Enter your project description',
  direc: 'Enter your project directory',
  start: moment().toDate(),
  end: moment().toDate(), 
  dur: 'Project Duration',
  contr: 'Enter name',
  role: 'Select Role'
};

const AddEditEvent = forwardRef((props, ref) => {
  const {
    event,
    onDelete,
    onCancel,
    onAdd,
    onEdit,
    className,
    ...rest
  } = props;
  const classes = useStyles();
  const [values, setValues] = useState(event || { ...defaultEvent });
  const projectTypes = [
    {
      value: 'Basic',
      label: 'Basic',
    },
    {
      value: 'Protein Design',
      label: 'Protein Design',
    },
    {
      value: 'Strain Construction',
      label: 'Strain Construction',
    }
  ];
  const [type, setType] = React.useState('Basic');
  const [role, setRole] = React.useState('Owner');
  const roleTypes = [
    {
      value: 'Owner',
      label: 'Owner',
    },
    {
      value: 'Manager',
      label: 'Manager',
    },
    {
      value: 'Contributor',
      label: 'Contributor',
    }
  ];
  const chipsArray = [];
  const chips = [];

  const handleFieldChange = (e) => {
    e.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleAdd = () => {
    if (!values.title || !values.desc) {
      return;
    }

    onAdd({ ...values, id: uuid() });
  };


  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleAddChip = (name) => {
    console.log('chip added');
    chipsArray.push(name);
    chips.push(
      <Chip
      label={name}
      onDelete={(name, index) => handleDeleteChip(name, index)}
    />
    );
  };

  const handleDeleteChip = (chip, index) => {
    console.log('chip deleted');
    chipsArray.splice(index, 1);
    showChipArray();
  };

  const showChipArray = () => {
    chipsArray.forEach(function (index, chip) {
      chips.push(
        <Chip
        label={chip}
        onDelete={(chip, index) => handleDeleteChip(chip, index)}
      />
      );
      console.log('pushed chip ' + index);
    })
  }


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      ref={ref}
    >
      <form>
        <CardContent>
          <Typography
            align="center"
            gutterBottom
            variant="h3"
          >
            Create Project
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            label="Project Name"
            name="Project Name"
            onChange={handleFieldChange}
            value={values.title}
            variant="outlined"
          />
          <TextField
            className={classes.field}
            fullWidth
            select
            SelectProps={{
              native: true,
            }}
            label="Project Type"
            name="type"
            onChange={handleTypeChange}
            value={type}
            variant="outlined">
            {projectTypes.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            </TextField>
          <TextField
            className={classes.field}
            fullWidth
            label="Project Description"
            name="desc"
            onChange={handleFieldChange}
            value={values.desc}
            variant="outlined"
          />
          <TextField
            className={classes.field}
            fullWidth
            label="Project Directory"
            name="direc"
            onChange={handleFieldChange}
            value={values.direc}
            variant="outlined"
          />
          <TextField
            className={classes.field}
            defaultValue={moment(values.start).format('YYYY-MM-DDThh:mm:ss')}
            style = {{width: '35%', marginRight: 10}}
            margin="normal"
            label="Start date"
            name="start"
            onChange={handleFieldChange}
            type="datetime-local"
            variant="outlined"
          />
          <TextField
            className={classes.field}
            defaultValue={moment(values.end).format('YYYY-MM-DDThh:mm:ss')}
            disabled={values.allDay}
            style = {{width: '35%', marginRight: 10}}
            margin="normal"
            label="End date"
            name="end"
            onChange={handleFieldChange}
            type="datetime-local"
            variant="outlined"
          />
          <TextField
            className={classes.field}
            label="Project Duration (days)"
            name="dur"
            style = {{width: '25%', float: 'right'}}
            margin="normal"
            onChange={handleFieldChange}
            value={moment(values.end).diff(moment(values.start), 'days')}
            multiline
            variant="filled"
          />
          <TextField
            className={classes.field}
            style = {{width: '35%', marginRight: 10}}
            label="Project Contributors"
            name="contr"
            onChange={handleFieldChange}
            value={values.contr}
            variant="outlined"
          />
          <TextField
            className={classes.field}
            style = {{width: '35%', marginRight: 10}}
            select
            SelectProps={{
              native: true,
            }}
            label="Role"
            name="role"
            onChange={handleRoleChange}
            value={role}
            variant="outlined">
              {roleTypes.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            </TextField>
          <Button
            className={classes.field}
            style = {{width: '15%'}}
            margin="normal"
            onClick={handleAddChip(values.contr)}
            variant="contained"
          >
            + Add
          </Button>
          {chips}
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
          <Button
            className={classes.confirmButton}
            onClick={handleAdd}
            variant="contained"
          >
            Create
          </Button>
        </CardActions>
      </form>
    </Card>
  );
});

AddEditEvent.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default AddEditEvent;
