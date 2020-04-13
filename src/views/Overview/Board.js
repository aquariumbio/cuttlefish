import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TasksDueSoon from './TasksDueSoon';
import OngoingProjects from './OngoingProjects';
import PushToProduction from './PushToProduction'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1)
    }
  }));
  

function Board() {
    const classes = useStyles();

    return (
        <Grid
            container
            spacing={3}
            className={classes.root}
        >
            <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
            >
                <TasksDueSoon />
            </Grid>
            <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
            >
                <OngoingProjects />
            </Grid>
            <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
            >
                <PushToProduction />
            </Grid>
        </Grid>
    );
}

export default Board;
