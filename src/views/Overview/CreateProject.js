/* eslint-disable react/display-name */
import React, { useState, forwardRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import uuid from 'uuid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  Chip,
  Grid,
  IconButton
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import mockProjects from '../ProjectManagementList/projects_data';
import firebase from '../../firebase/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  title: {
    marginTop: theme.spacing(1),
    paddingBottom: 0
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
    },
    margin: theme.spacing(3)
  },
  closeIcon: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(30)
  },
  chipList: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none'
  },
  chip: {
    backgroundColor: '#bfbfbf'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%'
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
  direc: 'Choose your Aquarium project',
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
  const session = useSelector(state => state.session);
  const [values, setValues] = useState(event || { ...defaultEvent });
  const projectTypes = [
    {
      value: 'Basic',
      label: 'Basic'
    },
    {
      value: 'Protein Design',
      label: 'Protein Design'
    },
    {
      value: 'Strain Construction',
      label: 'Strain Construction'
    }
  ];
  const [type, setType] = useState('Basic');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('Owner');
  const roleTypes = [
    {
      value: 'Owner',
      label: 'Owner'
    },
    {
      value: 'Manager',
      label: 'Manager'
    },
    {
      value: 'Contributor',
      label: 'Contributor'
    }
  ];
  const [folder, setFolder] = useState();
  const [contributor, setContributor] = useState('');
  const [chipData, setChipData] = useState([
    { key: 0, label: session.firstName + ' ' + session.lastName, role: 'Owner' }
  ]);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(defaultEvent.start);
  const [end, setEnd] = useState(defaultEvent.end);
  const [newProjects, setNewProjects] = useState(mockProjects);
  const [aquariumFolders, setAquariumFolders] = useState([]);
  const [projectID, setProjectID] = useState(uuid());

  const handleFieldChange = e => {
    e.persist();
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleProjectTitle = event => {
    setTitle(event.target.value);
  };

  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const handleCreateProject = () => {
    console.log(session);
    firebase.db
      .collection('projects')
      .doc(projectID)
      .set({
        title: title,
        owner: session.user.username,
        description: description,
        folder: folder,
        members: chipData.map(x => x.label),
        start_date: moment(start).format('M/D/YY'),
        end_date: moment(end).format('M/D/YY'),
        type: type,
        status: 'pending'
      })
      .catch(function(error) {
        console.error('Error creating project: ', error);
      });
    setNewProjects(...newProjects, newProjects);
    handleClose();
  };

  const handleTypeChange = event => {
    setType(event.target.value);
  };

  const handleStartDate = event => {
    setStart(event.target.value);
  };

  const handleEndDate = event => {
    setEnd(event.target.value);
  };

  const handleContributorName = ({ target }) => {
    setContributor(target.value);
  };

  const handleRoleChange = event => {
    setRole(event.target.value);
  };

  const handleFolderChange = event => {
    setFolder(event.target.value);
  };

  const handleAddChip = () => {
    setChipData(chips => [
      ...chips,
      { key: chips.length + 1, label: contributor, role: role }
    ]);
  };

  const handleChipDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  const handleClose = () => {
    setShow(false);
  };

  const fetchAquariumPlanFolders = async () => {
    const response = await fetch('http://localhost:4000/plans/folders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: session.user.username,
        password: session.user.password
      })
    });
    if (response.status === 200) {
      const folders = await response.json();
      setAquariumFolders(JSON.parse(folders.data));
    }
  };

  useEffect(() => {
    fetchAquariumPlanFolders();
  }, []);

  return (
    <Dialog open={show} onClose={handleClose} className={classes.root}>
      <form>
        <DialogTitle className={classes.title}>
          <Grid container spacing={20}>
            <Grid item md={6} xs={12}>
              <CustomTypography align="left" gutterBottom variant="h3">
                Create Project
              </CustomTypography>
            </Grid>
            <Grid item md={6} xs={12}>
              <IconButton
                className={classes.closeIcon}
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
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
              native: true
            }}
            label="Project Type"
            name="type"
            onChange={handleTypeChange}
            value={type}
            variant="outlined"
          >
            {projectTypes.map(option => (
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
            onChange={handleDescription}
            placeholder={values.desc}
            value={description}
            variant="outlined"
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">
              Aquarium Plan Folder
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={folder}
              onChange={handleFolderChange}
              placeholder={values.direc}
            >
              {aquariumFolders.map(folder =>
                folder != null ? (
                  <MenuItem value={folder}>{folder}</MenuItem>
                ) : null
              )}
            </Select>
          </FormControl>
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
            label="Project Duration"
            name="dur"
            style={{ width: '25%', float: 'right' }}
            margin="normal"
            onChange={handleFieldChange}
            defaultValue={moment(end).diff(moment(start), 'days') + ' day(s)'}
            multiline
            variant="filled"
          />
          <TextField
            className={classes.field}
            style={{ width: '40%', marginRight: 10 }}
            label="Project Contributors"
            name="contr"
            onChange={handleContributorName}
            placeholder={values.contr}
            variant="outlined"
          />
          <TextField
            className={classes.field}
            style={{ width: '40%', marginRight: 10 }}
            select
            SelectProps={{
              native: true
            }}
            label="Role"
            name="role"
            onChange={handleRoleChange}
            placeholder={role}
            variant="outlined"
          >
            {roleTypes.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <Button
            className={classes.field}
            style={{ 
              width: '15%',
              padding: '15px'
            }}
            margin="normal"
            onClick={handleAddChip}
            variant="contained"
          >
            + Add
          </Button>
          <Paper component="ul" className={classes.chipList}>
            {chipData.map(data => {
              return (
                <li key={data.key}>
                  <Chip
                    label={data.label + ' - ' + data.role}
                    onDelete={
                      data.role === 'Owner' ? undefined : handleChipDelete(data)
                    }
                    className={classes.chip}
                  />
                </li>
              );
            })}
          </Paper>
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </form>
    </Dialog>
  );
});

export default CreateProject;
