import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Tabs,
  Tab,
  Modal
} from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import TabPanel from '../../components/TabPanel';
import Kanban from './Kanban';
import Notebook from './Notebook';
import Plan from './Plan';
import AddFile from './AddFile';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
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

function StrainConstructionProject() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);
  const [events, setEvents] = useState([]);
  const [eventModal, setEventModal] = useState({
    open: false,
    event: null
  });

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

  // Conditional popup button action, rendered differently based on the respective action necessary for the project tab
  const getModal = () => {
    if (currentTab === 0) {
      return <Modal onClose={handleModalClose} open={eventModal.open}></Modal>;
    } else if (currentTab === 1) {
      return (
        <Modal onClose={handleModalClose} open={eventModal.open}>
          <AddFile
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
    <Page className={classes.root} title="Strain Construction Project">
      <Container maxWidth={false}>
        <Header currentTab={currentTab} onEventAdd={handleEventNew} />
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
        >
          <Tab label="Kanban" />
          <Tab label="Notebook" />
          <Tab label="AQ Plan" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <Kanban />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <Notebook />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Plan />
        </TabPanel>
        {getModal()}
      </Container>
    </Page>
  );
}

export default StrainConstructionProject;
