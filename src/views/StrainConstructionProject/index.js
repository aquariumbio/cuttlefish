import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Container, Tabs, Tab, Modal } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import TabPanel from '../../components/TabPanel';
//import Overall from './Overall';
import Plan from './Plan';
import AddEditEvent from './AddFile';
//import LinearProgress from '@material-ui/core/LinearProgress';
//import { withStyles, lighten } from '@material-ui/core/styles';
import firebase from '../../firebase/firebase';
import { useHistory, useParams } from 'react-router';
import Gantt from '../../components/StrainGantt';

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

function StrainConstructionProject() {
  const classes = useStyles();
  const session = useSelector(state => state.session);
  const [currentTab, setCurrentTab] = useState(0);
  const { id } = useParams();
  const history = useHistory();
  const [strainData, setStrainData] = useState();
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

  

  

  

  useEffect(() => {
    const getPlanTimeEstimate = plan => {
      const planID = plan.id + id;
      let planRef = firebase.db.collection('plans').doc(planID);
      planRef.get().then(doc => {
        if (doc.exists) {
          plan.estimatedTimes = doc.data();
        } else {
          plan.estimatedTimes = null;
        }
      });
    };
    
    // Retrieves Plan data from Aquarium
    const getSamples = async folder => {
      const response = await fetch('http://localhost:4000/plans/folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: session.user.aqLogin,
          password: session.user.aqPassword,
          folder: folder
        })
      });
      if (response.status === 200) {
        const data = await response.json();
        data.forEach(plan => {
          getPlanTimeEstimate(plan);
        });
        //const result = data.reverse();
        console.log(data);
        setStrainData(data);
      } else {
        setStrainData([]);
      }
    };
      // Retrieves project data from Firebase
    const getProjectFromFirebase = async () => {
      var docRef = firebase.db.collection('projects').doc(id);
      await docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            getSamples(doc.data().folder);
          } else {
            history.push('/errors/error-404');
          }
        })
        .catch(function(error) {
          alert('Error getting project:', error);
          history.push('/overview');
        });
    };
    getProjectFromFirebase();
  }, [history, id, session.user.aqLogin, session.user.aqPassword]);

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
    <Page className={classes.root} title={'Strain Construction Project'}>
      <Container maxWidth={false}>
        <Header currentTab={currentTab} onEventAdd={handleEventNew} />
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
        >
          <Tab label="Strains" />
          <Tab label="Plans" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          {strainData != null ? <Gantt data={strainData} /> : null}
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <Plan />
        </TabPanel>
        {getModal()}
      </Container>
    </Page>
  );
}

export default StrainConstructionProject;
