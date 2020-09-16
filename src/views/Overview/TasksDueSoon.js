import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid
} from '@material-ui/core';
import TaskCard from '../../components/TaskCard/index';
import firebase from '../../firebase/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#FAFAFA'
  },
  content: {
    padding: theme.spacing(1)
  }
}));

function TasksDueSoon({ customer, className, ...rest }) {
  const classes = useStyles();
  //const [anchorEl, setAnchorEl] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    var projects = [];
    await firebase.db
      .collection('projects')
      .where('status', '==', 'In Progress')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(project => {
          projects.push(project.data());
        });
      })
      .then(() => {
        const cards = projects.map(task => <TaskCard task={task} />);
        setProjects(cards);
      });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Grid container>
        <Grid item xs={10}>
          <CardHeader title="Tasks Due Soon" />
        </Grid>
        {/* <Grid item xs>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleFilter(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Grid> */}
      </Grid>
      <Divider />
      <CardContent className={classes.content}>{projects}</CardContent>
    </Card>
  );
}

export default TasksDueSoon;
