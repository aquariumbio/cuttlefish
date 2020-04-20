import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Tabs, Tab } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import TabPanel from '../../components/TabPanel';
import Kanban from './Kanban';
import Notebook from './Notebook';
import Plan from './Plan';

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
  }
}));

function StrainConstructionProject() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, newTab) => {
    setCurrentTab(newTab);
  };

  return (
    <Page className={classes.root} title="Strain Construction Project">
      <Container maxWidth={false}>
        <Header />
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          initialSelectedIndex={currentTab}
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
      </Container>
    </Page>
  );
}

export default StrainConstructionProject;
