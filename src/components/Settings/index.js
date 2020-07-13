import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, Card } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Page from 'src/components/Page';
import Grid from '@material-ui/core/grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { shadows } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#FFFFFF',
    userSelect: 'none',
    whiteSpace: 'normal',
    height: '100%',
    display: 'inline-flex',
    flexDirection: 'column',
    verticalAlign: 'top',
    width: '100%',
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('xs')]: {
      width: 300
    },
    horizontalAlign: 'left'
  },
  header: {
    margin: theme.spacing(3),
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    width: 180,
    margin: theme.spacing(3)
  },
  grid: {
    flexGrow: 1
  },
  subtitle: {
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  divider: {
    height: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    minWidth: 120
  },
  member: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(4)
  }
}));

function Settings(props) {
  const classes = useStyles();
  const session = useSelector(state => state.session);
  const [userType, setUserType] = React.useState('');

  const handleChange = event => {
    setUserType(event.target.value);
  };
  return (
    <Page title={'Settings'}>
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        <ListItem boxShadow={3}>
          <Typography variant="h5" className={classes.title}>
            Project Owner{' '}
          </Typography>
        </ListItem>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {session.currentProject.owner}
        </Typography>
        <Divider className={classes.divider} />

        <ListItem boxShadow={3}>
          <Typography variant="h5">Members </Typography>
        </ListItem>
        <Grid
          container
          direction={'column'}
          className={classes.grid}
          spacing={2}
        >
          {/* {session.currentProject.members.managers.map(manager => (
                    <Grid container direction={'row'} className={classes.grid} spacing={2}>
                        <Grid item xs={3}>
                        <Typography variant="subtitle1" className={classes.member}>{manager}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={handleChange}
                                defaultValue="Manager"
                                label="User Type"
                                >
                                <MenuItem selected value="Manager">Manager</MenuItem>
                                <MenuItem value="Collaborator">Collaborator</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                ))} */}

          {/* {session.currentProject.members.collaborators.map(collaborator => (
                    <Grid container direction={'row'} className={classes.grid} spacing={2}>

                        <Grid item xs={3}>
                        <Typography variant="subtitle1" className={classes.member}>{collaborator}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                defaultValue="Collaborator"
                                onChange={handleChange}
                                label="User Type"
                                >

                                <MenuItem value="Manager">Manager</MenuItem>
                                <MenuItem selected value="Collaborator">Collaborator</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                ))}
                 */}
        </Grid>

        <Divider className={classes.divider} />

        <ListItem boxShadow={3}>
          <Typography variant="h5">Start Date </Typography>
        </ListItem>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {session.currentProject.start_date}
        </Typography>

        <Divider className={classes.divider} />

        <ListItem boxShadow={3}>
          <Typography variant="h5">Projected Completion Date </Typography>
        </ListItem>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {session.currentProject.end_date}
        </Typography>
        <Divider className={classes.divider} />

        <ListItem boxShadow={3}>
          <Typography variant="h5">Project Type </Typography>
        </ListItem>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {session.currentProject.type}
        </Typography>

        <Divider className={classes.divider} />

        <ListItem boxShadow={3}>
          <Typography variant="h5">Project Status </Typography>
        </ListItem>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {session.currentProject.status}
        </Typography>
        <Divider className={classes.divider} />

        <Button variant="outlined" color="primary" className={classes.button}>
          Save Changes
        </Button>
      </List>
    </Page>
  );
}

export default Settings;
