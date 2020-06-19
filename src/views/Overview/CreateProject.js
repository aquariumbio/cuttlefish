/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
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
  Grid,
  IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import mockProjects from '../ProjectManagementList/projects_data'

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
    backgroundColor: '#065683',
    '&:hover': {
      backgroundColor: '#065683'
    }
  },
  closeIcon: {
    marginLeft: theme.spacing(35)
  }, 
  chipList: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none'
  },
  chip: {
    backgroundColor: '#bfbfbf'
  }
}));

const CustomTypography = withStyles(theme => ({
  h3: {
    color: '#05486E'
  }
}))(Typography);

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

const CreateProject = forwardRef((props, ref) => {
  const {
    event,
    onDelete,
    onCancel,
    onAdd,
    onEdit,
    show,
    setShow,
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

  const [contributor, setContributor] = useState("")

  const [chipData, setChipData] = useState([
    { key: 0, label: 'Phuong Le', role: 'Owner'},
  ]);

  const [title, setTitle] = useState("");

  const [start, setStart] = useState("");

  const [end, setEnd] = useState("");

  const handleFieldChange = (e) => {
    e.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleProjectTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleCreateProject = () => {
    console.log(chipData.filter(x => x.role === 'Owner'));

    console.log(chipData.filter(x => x.role === 'Owner')[0].label);

    mockProjects.splice(0, 0, {title: title,
      owner: chipData.filter(x => x.role === 'Owner').map(x => x.label),
      members: chipData.map(x => x.label),
      start_date: moment(start).format('M/D/YY'),
      end_date: moment(end).format('M/D/YY'),
      type: type,
      status: 'pending'});
    handleClose()
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleStartDate = (event) => {
    setStart(event.target.value);
  };

  const handleEndDate = (event) => {
    setEnd(event.target.value);
  };

  const handleContributorName = ({ target }) => {
    setContributor(target.value)
  }

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleAddChip = () => {
    setChipData(chips => [...chips, {key: chips.length + 1, label: contributor, role: role}]);
   
  };

  const handleChipDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleClose = () => {
    setShow(false)
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      ref={ref}
    >
      <form>
        <CardContent>
          <Grid
            container
            spacing={20}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <CustomTypography
                align="left"
                gutterBottom
                variant="h3"
              >
                Create Project
              </CustomTypography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <IconButton className={classes.closeIcon} onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <TextField
            className={classes.field}
            fullWidth
            label="Project Name"
            name="Project Name"
            onChange={handleProjectTitle}
            placeholder={values.title}
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
            placeholder={values.desc}
            variant="outlined"
          />
          <TextField
            className={classes.field}
            fullWidth
            label="Project Directory"
            name="direc"
            onChange={handleFieldChange}
            placeholder={values.direc}
            variant="outlined"
          />
          <TextField
            className={classes.field}
            defaultValue={moment(values.start).format('YYYY-MM-DDThh:mm:ss')}
            style={{ width: '35%', marginRight: 10 }}
            margin="normal"
            label="Start date"
            name="start"
            onChange={handleStartDate}
            type="datetime-local"
            variant="outlined"
          />
          <TextField
            className={classes.field}
            defaultValue={moment(values.end).format('YYYY-MM-DDThh:mm:ss')}
            disabled={values.allDay}
            style={{ width: '35%', marginRight: 10 }}
            margin="normal"
            label="End date"
            name="end"
            onChange={handleEndDate}
            type="datetime-local"
            variant="outlined"
          />
          <TextField
            className={classes.field}
            label="Project Duration (days)"
            name="dur"
            style={{ width: '25%', float: 'right' }}
            margin="normal"
            onChange={handleFieldChange}
            defaultValue={moment(end).diff(moment(start), 'days')}
            multiline
            variant="filled"
          />
          <TextField
            className={classes.field}
            style={{ width: '35%', marginRight: 10 }}
            label="Project Contributors"
            name="contr"
            onChange={handleContributorName}
            placeholder={values.contr}
            variant="outlined"
          />
          <TextField
            className={classes.field}
            style={{ width: '35%', marginRight: 10 }}
            select
            SelectProps={{
              native: true,
            }}
            label="Role"
            name="role"
            onChange={handleRoleChange}
            placeholder={role}
            variant="outlined">
            {roleTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <Button
            className={classes.field}
            style={{ width: '12%' }}
            margin="normal"
            onClick={handleAddChip}
            variant="contained"
          >
            + Add
          </Button>
          <Paper component="ul" className={classes.chipList}>
          {chipData.map((data) => {
            return (
              <li key={data.key} >
                <Chip
                  label={data.label + ' - ' + data.role}
                  onDelete={data.role === 'Owner' ? undefined : handleChipDelete(data)}
                  className={classes.chip}
                />
              </li>
            );
          })}
          </Paper>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            className={classes.cancelButton}
            onClick={handleClose}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            className={classes.confirmButton}
            onClick={handleCreateProject}
            variant="contained"
          >
            Create
          </Button>
        </CardActions>
      </form>
    </Card>
  );
});

CreateProject.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default CreateProject;
