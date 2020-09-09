import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  TextField,
  Button,
  Chip,
  IconButton,
  Grid,
  Typography,
  Modal
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  dropButton: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    },
    padding: 0,
    margin: 0
  },
  editButton: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    },
    padding: 0,
    margin: 0
  },
  editDialog: {
    width: '100%'
  },
  editDialogTitle: {
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
    margin: theme.spacing(1)
  },
  closeIcon: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(30)
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  jobList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  title: {
    background: theme.palette.primary.light,
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: theme.spacing(2),
    marginBottom: '1px',
    borderTopLeftRadius: '3px',
    width: '100%'
  }
}));

const CustomTypography = withStyles(theme => ({
  h3: {
    color: '#05486E'
  }
}))(Typography);

export default function PlanTab(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(props.open);
  const [editOpen, setEditOpen] = useState(false);
  const [start, setStart] = useState(moment().format('MM/DD/YYYY'));
  const [end, setEnd] = useState(moment().format('MM/DD/YYYY'));

  useEffect(() => {
    props.setOpenRows([...props.openRows, props.plan.id]);
  }, []);

  const getChildrenIDs = () => {
    const IDs = [];
    props.plan.jobs.map(job => {
      const id = job.id + props.plan.id;
      IDs.push(id);
    });
    return IDs;
  };

  // Handles dropdown as well as visible rows in calendar view
  const handleDropDown = event => {
    const childrenIDs = getChildrenIDs();
    if (!open) {
      props.setOpenRows([...props.openRows, ...childrenIDs]);
      setOpen(true);
    } else {
      props.setOpenRows(props.openRows.filter(e => !childrenIDs.includes(e)));
      setOpen(false);
    }
  };

  const handleStartDate = event => {
    setStart(event.target.value);
  };

  const handleEndDate = event => {
    setEnd(event.target.value);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
  };

  const handleOpenEdit = () => {
    setEditOpen(true);
  };

  const handleTimeUpdate = () => {
    // firebase.db
    //   .collection('projects')
    //   .doc(projectID)
    //   .set({
    //     title: title,
    //     owner: session.user.firstName + ' ' + session.user.lastName,
    //     description: description,
    //     folder: folder,
    //     members: {
    //     },
    //     end_date: moment(end).format('M/D/YY'),
    //     type: type,
    //     status: 'pending',
    //     id: projectID
    //   })
    //   .then(() => window.location.reload())
    //   .catch(function(error) {
    //     console.error('Error creating project: ', error);
    //   });
    handleCloseEdit();
  };

  const dropButton = open ? (
    <Button
      className={classes.dropButton}
      color="primary"
      onClick={handleDropDown}
      disableRipple
    >
      <ArrowDropDownIcon fontSize="large" />
    </Button>
  ) : (
    <Button
      className={classes.dropButton}
      color="primary"
      onClick={handleDropDown}
      disableRipple
    >
      <ArrowRightIcon fontSize="large" />
    </Button>
  );

  const timeEditButton = () => {
    return (
      <Dialog
        open={editOpen}
        onClose={handleCloseEdit}
        className={classes.editDialog}
      >
        <form onSubmit={handleTimeUpdate}>
          <DialogTitle className={classes.editDialogTitle}>
            <Grid container spacing={20}>
              <Grid item md={6} xs={12}>
                <CustomTypography align="left" gutterBottom variant="h3">
                  Update Plan Timeframe
                </CustomTypography>
              </Grid>
              <Grid item md={6} xs={12}>
                <IconButton
                  className={classes.closeIcon}
                  onClick={handleCloseEdit}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <TextField
              required={true}
              className={classes.field}
              defaultValue={moment().format('YYYY-MM-DD')}
              style={{ width: '35%', marginRight: 10 }}
              margin="normal"
              label="Projected Start Date"
              name="start"
              onChange={handleStartDate}
              type="date"
              variant="outlined"
            />
            <TextField
              required={true}
              className={classes.field}
              defaultValue={moment().format('YYYY-MM-DD')}
              style={{ width: '35%', marginRight: 10 }}
              margin="normal"
              label="Projected End Date"
              name="end"
              onChange={handleEndDate}
              type="date"
              variant="outlined"
            />
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              className={classes.cancelButton}
              onClick={handleCloseEdit}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              className={classes.confirmButton}
              type="submit"
              variant="contained"
            >
              Update Time
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  return (
    <Grid container className={classes.root}>
      <div className={classes.title}>
        <Grid item className={classes.left}>
          {dropButton}
          <Button className={classes.editButton} color="disabled" disableRipple>
            <EditOutlinedIcon fontSize="small" onClick={handleOpenEdit} />
          </Button>
          <Typography variant="h6" noWrap>
            {props.plan.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" noWrap>
            {props.plan.id}
          </Typography>
        </Grid>
      </div>
      <Grid item className={classes.jobList}>
        {open ? props.children : null}
      </Grid>
      <Modal open={editOpen} onHide={handleCloseEdit} animation={false}>
        {timeEditButton()}
      </Modal>
    </Grid>
  );
}
