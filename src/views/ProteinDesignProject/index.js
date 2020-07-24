import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Container, Tabs, Tab, Modal, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import Gantt from '../../components/Gantt';
import Header from './Header';
import TabPanel from '../../components/TabPanel';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles, lighten } from '@material-ui/core/styles';
import PlanTable from 'src/components/Plans/PlanTable';
import Settings from '../../components/Settings';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    height: '100%'
  },
  progress: {
    margin: theme.spacing(2)
  },
  tabs: {
    height: '30px'
  },
  panel: {
    color: theme.palette.primary.main
  },
  addIcon: {
    marginRight: theme.spacing(1)
  }
}));

const CustomLinearProgress = withStyles(theme => ({
  root: {
    height: 5,
    backgroundColor: lighten(theme.palette.success.main, 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: theme.palette.success.main
  }
}))(LinearProgress);

function ProteinDesignProject() {
  const classes = useStyles();
  const session = useSelector(state => state.session);
  const [currentTab, setCurrentTab] = useState(0);
  const [events, setEvents] = useState([]);
  const [eventModal, setEventModal] = useState({
    open: false,
    event: null
  });
  const [progress, setProgress] = useState([0]);
  const [ganttData, setGanttData] = useState();

  const handleEventNew = () => {
    setEventModal({
      open: true,
      event: null
    });
  };

  const handleModalClose = () => {
    setEventModal({
      open: false,
      event: null
    });
  };

  const handleEventAdd = event => {
    setEvents(currentEvents => [...currentEvents, event]);
    setEventModal({
      open: false,
      event: null
    });
  };

  const handleChange = (event, newTab) => {
    setCurrentTab(newTab);
  };

  useEffect(() => {
    async function getSamples() {
      const response = await fetch('http://localhost:4000/plans/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: session.user.aqLogin,
          password: session.user.aqPassword,
          folder: session.currentProject.folder
        })
      });
      if (response.status === 200) {
        const data = await response.json();
        const result = data.reverse();
        setGanttData(result);
      } else {
        setGanttData([]);
      }
    }
    getSamples();
  }, []);

  // Conditional popup button action, rendered differently based on the respective action necessary for the project tab
  const getModal = () => {
    if (currentTab === 0) {
      return <Modal onClose={handleModalClose} open={eventModal.open}></Modal>;
    } else if (currentTab === 1) {
      return <Modal onClose={handleModalClose} open={eventModal.open}></Modal>;
    } else {
      return <Modal onClose={handleModalClose} open={eventModal.open}></Modal>;
    }
  };

  return (
    <Page className={classes.root} title="Protein Design Project">
      <Container maxWidth={false}>
        <Header currentTab={currentTab} onEventAdd={handleEventNew} />
        <div className={classes.progress}>
          <Typography gutterBottom variant="h6">
            0 tasks completed out of 0
          </Typography>
          <CustomLinearProgress
            variant="determinate"
            value={progress}
            color="primary"
          />
        </div>

        <Tabs
          value={currentTab}
          onChange={handleChange}
          indicatorColor="primary"
        >
          <Tab label="Gantt" />
          <Tab label="Plans" />
          <Tab label="Settings" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <Gantt data={ganttData} />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <PlanTable data={ganttData} />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Settings data={ganttData} />
        </TabPanel>
        {getModal()}
      </Container>
    </Page>
  );
}

export default ProteinDesignProject;
