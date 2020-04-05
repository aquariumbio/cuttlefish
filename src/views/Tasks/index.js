import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function Tasks() {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Tasks">
      <Container maxWidth={false}></Container>
    </Page>
  );
}

export default Tasks;
