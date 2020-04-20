import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Card,
  Grid,
  CardHeader,
  Typography,
  Modal
} from '@material-ui/core';
import clsx from 'clsx';
import uuid from 'uuid/v1';

import Header from './Header';
import Page from 'src/components/Page';
import TodoCard from 'src/components/TodoCard';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    margin: theme.spacing(1)
  },
  taskColumn: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.white.main
  },
  todo: { color: theme.palette.error.main },
  progress: { color: theme.palette.caution.main },
  complete: { color: theme.palette.success.main }
}));

function TodoList({ className, ...rest }) {
  const classes = useStyles();

  const [taskModal, setTaskModal] = useState({
    open: false,
    task: null
  });

  const [tasksTodo, setTasksTodo] = useState([
    {
      description:
        'This is a test task This is a test task This is a test task This is a test task This is a test task This is a test task This is a test task This is a test task This is a test task',
      complete: false,
      id: uuid()
    }
  ]);

  const [tasksInProgress, setTasksInProgress] = useState([
    {
      description: 'This is a test task',
      complete: false,
      id: uuid()
    }
  ]);

  const [tasksComplete, setTasksComplete] = useState([
    {
      description: 'This is a test task',
      complete: true,
      id: uuid()
    }
  ]);

  useEffect(() => {}, [tasksTodo, tasksInProgress, tasksComplete]);

  return (
    <Page className={classes.root} title="TodoList">
      <Container maxWidth="lg">
        <Header />
        <TodoCard status="Todo" tasks={tasksTodo} setTasks={setTasksTodo} />
        <TodoCard
          status="In Progress"
          tasks={tasksInProgress}
          setTasks={setTasksInProgress}
        />
        <TodoCard
          status="Complete"
          tasks={tasksComplete}
          setTasks={setTasksComplete}
        />
      </Container>
    </Page>
  );
}

export default TodoList;
