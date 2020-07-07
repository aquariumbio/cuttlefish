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

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#FFFFFF",
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
        margin: theme.spacing(3),
        marginTop: 0
    }, 
    grid: {
        flexGrow: 1,
    },
    subtitle: {
        paddingLeft: theme.spacing(3), 
        paddingBottom: theme.spacing(3)
    },
    divider: {
        height: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    member: {
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(3), 
    }
}));



function Settings(props) {
    const classes = useStyles();
    const session = useSelector(state => state.session);
    const [userType, setUserType] = React.useState('');

    const handleChange = (event) => {
        setUserType(event.target.value);
        };
    return (
        <Page title={"Settings"}>
            <List component="nav" className={classes.root} aria-label="mailbox folders">
                <ListItem boxShadow={3}>
                    <Typography variant="h5">Project Owner </Typography>
                </ListItem>
                <Typography variant="subtitle1" className={classes.subtitle}>{session.currentProject.owner}</Typography>
                <Divider className={classes.divider}/>
                
                <ListItem boxShadow={3}>
                    <Typography variant="h5">Members </Typography>
                </ListItem>
                <Grid container className={classes.grid} spacing={2}>
                <Grid item xs={3}>
                    <Typography variant="subtitle1" className={classes.member}>{session.currentProject.members}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={userType}
                        onChange={handleChange}
                        label="User Type"
                        >
                        <MenuItem value="">
                        </MenuItem>
                        <MenuItem value={1}>Manager</MenuItem>
                        <MenuItem value={2}>Collaborator</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                </Grid>

                <Divider className={classes.divider}/>

                <ListItem boxShadow={3}>
                    <Typography variant="h5">Start Date </Typography>
                </ListItem>
                <Typography variant="subtitle1" className={classes.subtitle}>{session.currentProject.start_date}</Typography>

                <Divider className={classes.divider}/>

                <ListItem boxShadow={3}>
                    <Typography variant="h5">Projected Completion Date </Typography>

                </ListItem>
                <Typography variant="subtitle1" className={classes.subtitle}>{session.currentProject.end_date}</Typography>
                <Divider className={classes.divider}/>

                <ListItem boxShadow={3}>
                    <Typography variant="h5">Project Type </Typography>
                </ListItem>
                <Typography variant="subtitle1" className={classes.subtitle}>{session.currentProject.type}</Typography>

                <Divider className={classes.divider}/>

                <ListItem boxShadow={3}>
                    <Typography variant="h5">Project Status </Typography>
                </ListItem>
                <Typography variant="subtitle1" className={classes.subtitle}>{session.currentProject.status}</Typography>
                <Divider className={classes.divider}/>

                <ListItem boxShadow={3}>
                <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        
                    >
                        Save Changes
                    </Button>
                </ListItem>
            </List>

            
            {/*<Grid container className={classes.grid} spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5">Project Owner: </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">{session.currentProject.owner}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5">Members: </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">{session.currentProject.members}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5">Start Date: </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="subtitle1">{session.currentProject.start_date}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5">Projected Completion Date: </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="subtitle1">{session.currentProject.end_date}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5">Project Type: </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">{session.currentProject.type}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5">Project Status: </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">{session.currentProject.status}</Typography>
                </Grid>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        
                    >
                        Save Changes
                    </Button>
                </Grid>
    </Grid>*/}
        </Page>
    );
}

export default Settings;
