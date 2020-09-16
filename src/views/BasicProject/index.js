import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Tabs, Tab, Modal } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import TabPanel from '../../components/TabPanel';
import KanbanBoard from '../../components/KanbanBoard';
import AddEditEvent from './AddFile';
//import LinearProgress from '@material-ui/core/LinearProgress';
//import { withStyles, lighten } from '@material-ui/core/styles';
import data from './mockKanbanData';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
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

/*const CustomLinearProgress = withStyles(theme => ({
  root: {
    height: 5,
    backgroundColor: lighten(theme.palette.success.main, 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: theme.palette.success.main
  }
}))(LinearProgress);*/

function BasicProject() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  //const [events, setEvents] = useState([]);
  const [eventModal, setEventModal] = useState({
    open: false,
    event: null
  });
  //const [progress, setProgress] = useState([80]);

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
    //setEvents(currentEvents => [...currentEvents, event]);
    setEventModal({
      open: false,
      event: null
    });
  };

  const handleChange = (event, newTab) => {
    setCurrentTab(newTab);
  };

  // Conditional popup button action, rendered differently based on the respective action necessary for the project tab
  const getModal = () => {
    if (currentTab === 0) {
      return <Modal onClose={handleModalClose} open={eventModal.open}></Modal>;
    } else if (currentTab === 1) {
      return (
        <Modal onClose={handleModalClose} open={eventModal.open}>
          <AddEditEvent
            event={eventModal.event}
            onAdd={handleEventAdd}
            onCancel={handleModalClose}
          />
        </Modal>
      );
    } else {
      return <Modal onClose={handleModalClose} open={eventModal.open}></Modal>;
    }
  };

  return (
    <Page className={classes.root} title={"Strain Construction Project"}>
      <Container maxWidth={false}>
        <Header currentTab={currentTab} onEventAdd={handleEventNew} />
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
        >
          <Tab label="Kanban" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <KanbanBoard data={data} />
        </TabPanel>
        {getModal()}
      </Container>
    </Page>
  );
}

export default BasicProject;
