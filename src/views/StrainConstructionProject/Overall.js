import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Page from 'src/components/Page';


const useStyles = makeStyles(theme => ({
  root: {
  },
}));

export default function Overall({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Page className={classes.root} title={"Overall"}></Page>
  );
}
