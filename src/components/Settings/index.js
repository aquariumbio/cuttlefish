import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, Card, IconButton} from '@material-ui/core';
import Page from 'src/components/Page';
import Grid from '@material-ui/core/grid';
import EditIcon from '@material-ui/icons/Edit';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import firebase from '../../firebase/firebase';

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
  content: {
    padding: theme.spacing(5)
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
    display: 'flex',
    flexGrow: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    display: 'flex', 
    width: '200px',
    justifyContent: 'left',
    alignItems: 'center'

  },
  subtitle: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center'
  },
  dialog: {
    width: '100%'
  },
  dialogTitle: {
    marginTop: theme.spacing(1),
    paddingBottom: 0
  }
}));

function Settings(props) {
  const classes = useStyles();
  const session = useSelector(state => state.session);
  const [userType, setUserType] = React.useState('');
  const [newTitle, setTitle] = useState(session.currentProject.title);

  const [hasEdited, setHasEdited] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setUserType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };


  const CustomTypography = withStyles(theme => ({
    h3: {
      color: '#05486E'
    }
  }))(Typography);

  const handleProjectTitle = event => {
    setTitle(event.target.value);
  };

  const handleNewTitle = () => {
    firebase.db
      .collection('projects')
      .doc(session.currentProject.id)
      .update({
        title: newTitle,
      })
      .then(() => window.location.reload())
      .catch(function(error) {
        console.error('Error renaming project: ', error);
      });
    setHasEdited(true);
    handleClose();
  };

  return (
    <Page title={'Settings'}>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Grid
            container
            justify="flex-start"
            className={classes.grid}
            spacing={2}
          >
            <Grid item xs={3} className={classes.title}>
              <Typography variant="h5" >
                Project Title{' '}
              </Typography>
            </Grid>
            <Grid item className={classes.subtitle}>
              <Typography variant="subtitle1">
              {!hasEdited ? session.currentProject.title : newTitle}
            </Typography>
            </Grid>

            <Grid item xs>
              <Typography variant="subtitle1" className={classes.subtitle}>
              <Button
              onClick={handleClickOpen}
              >
                
               <EditIcon />
              </Button>
              
            </Typography>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
              <DialogTitle className={classes.dialogTitle}>
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
                  <DialogContentText>
                    Change the title of the project.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="New Project Title"
                    placeholder="Enter new Project title"
                    onChange={handleProjectTitle}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleNewTitle} color="primary">
                    Change Title
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>


          </Grid>

          <Grid
            container
            className={classes.grid}
            spacing={2}
          >
            <Grid item xs={3}  className={classes.title}>
              <Typography variant="h5">
                Project Owner{' '}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.subtitle}>
              <Typography variant="subtitle1" >
              {session.currentProject.owner}
            </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            className={classes.grid}
            spacing={2}
          >
            <Grid item xs={3}  className={classes.title}>
              <Typography variant="h5">
                Project ID
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.subtitle}>
              <Typography variant="subtitle1" >
               {session.currentProject.id}
            </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            className={classes.grid}
            spacing={2}
          >
            <Grid item xs={3} className={classes.title}>
              <Typography variant="h5" >
                Project Status{' '}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.subtitle}>
              <Typography variant="subtitle1" >
              {session.currentProject.status}
            </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            className={classes.grid}
            spacing={2}
          >
            <Grid item xs={3} className={classes.title}>
              <Typography variant="h5" >
                Project Type{' '}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.subtitle}>
              <Typography variant="subtitle1" >
              {session.currentProject.type}
            </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            className={classes.grid}
            spacing={2}
          >
            <Grid item xs={3} className={classes.title}>
              <Typography variant="h5" >
                Linked Aquarium Folder{' '}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.subtitle}>
              <Typography variant="subtitle1" >
              {session.currentProject.folder}
            </Typography>
            </Grid>
          </Grid>
        
        </CardContent>
      </Card>
      
    </Page>
  );
}

export default Settings;
