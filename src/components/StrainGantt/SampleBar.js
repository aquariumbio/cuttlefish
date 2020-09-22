import React from 'react';
//import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import PlanTab from './PlanTab';
import JobTab from './JobTab';
import { StickyContainer, Sticky } from 'react-sticky';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '2px'
  },
  container: {
    display: 'flex'
  },
  taskList: {
    background: theme.palette.white.main,
    width: '350px',
    minWidth: '350px',
    textOverflow: 'ellipsis'
  },

  topBar: {
    background: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100px',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    borderTopLeftRadius: '3px',
    // marginBottom: theme.spacing(0.2),
    textOverflow: 'ellipsis'
  },
  stickyContainer: {
    zIndex: 99
  }
}));

const CustomTypography = withStyles(theme => ({
  h5: {
    color: '#FFFFFF'
  }
}))(Typography);

// Dropdown menu that lists plan samples, paired with Calendar to form a Gantt chart
export default function SampleBar(props) {
  const classes = useStyles();
  //const session = useSelector(state => state.session);

  const getPlanTabs = () => {
    let tabs = [];
    props.plans.forEach(plan => {
      let jobs = [];
      if (plan.jobs != null) {
        plan.jobs.forEach(job => {
          jobs.push(
            <Grid item key={job.id}>
              <JobTab
                key={job.id}
                job={job}
                setOpenRows={props.setOpenRows}
                openRows={props.openRows}
                name={job.operations[0].name}
              ></JobTab>
            </Grid>
          );
        });
      }
      tabs.push(
        <PlanTab
          key={plan.id}
          plan={plan}
          open={false}
          setOpenRows={props.setOpenRows}
          openRows={props.openRows}
        >
          {jobs}
        </PlanTab>
      );
    });
    return tabs;
  };

  return (
    <div className={classes.taskList}>
      <StickyContainer>
        <Sticky>
          {({ style, isSticky }) => (
            <div
              style={{ ...style, paddingTop: isSticky ? '64px' : '0px' }}
              className={classes.stickyContainer}
            >
              <Grid item className={classes.topBar}>
                <CustomTypography variant="h5" noWrap>
                  Name
                </CustomTypography>
                <CustomTypography variant="h5" noWrap>
                  ID
                </CustomTypography>
              </Grid>
            </div>
          )}
        </Sticky>
        <div className={classes.libraries}>
          {props.plans.length > 0 ? getPlanTabs() : null}
        </div>
      </StickyContainer>
    </div>
  );
}
