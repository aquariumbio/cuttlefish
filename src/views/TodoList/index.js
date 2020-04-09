import React, { useState } from 'react';
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
import Header from './Header';
import Page from 'src/components/Page';
import TaskCard from 'src/components/TaskCard';
import AddEditTask from './AddEditTask';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    margin: theme.spacing(1)
  },
  todo: { color: theme.palette.error.main },
  progress: { color: theme.palette.caution.main },
  complete: { color: theme.palette.success.main }
}));

function TodoList({ className, ...rest }) {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [taskModal, setTaskModal] = useState({
    open: false,
    task: null
  });

  const handleTaskClick = info => {
    const selected = tasks.find(task => task.id === info.task.id);

    setTaskModal({
      open: true,
      task: selected
    });
  };

  const handleTaskNew = () => {
    setTaskModal({
      open: true,
      task: null
    });
  };

  const handleTaskDelete = task => {
    setTasks(currentTasks => currentTasks.filter(e => e.id !== task.id));
    setTaskModal({
      open: false,
      task: null
    });
  };

  const handleModalClose = () => {
    setTaskModal({
      open: false,
      task: null
    });
  };

  const handleTaskAdd = task => {
    setTasks(currentTasks => [...currentTasks, task]);
    setTaskModal({
      open: false,
      task: null
    });
  };

  const handleTaskEdit = task => {
    setTasks(currentTasks =>
      currentTasks.map(e => (e.id === task.id ? task : e))
    );
    setTaskModal({
      open: false,
      task: null
    });
  };

  return (
    <Page className={classes.root} title="TodoList">
      <Container maxWidth="lg">
        <Header onTaskAdd={handleTaskNew} />
        <Grid container className={classes.root}>
          <Grid item xs={4}>
            <Card {...rest} className={clsx(classes.root, className)}>
              <CardHeader
                title={
                  <Typography variant="h2" className={classes.todo}>
                    Todo
                  </Typography>
                }
              />
              <TaskCard />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card {...rest} className={clsx(classes.root, className)}>
              <CardHeader
                title={
                  <Typography variant="h2" className={classes.progress}>
                    In Progress
                  </Typography>
                }
              />
              <TaskCard />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card {...rest} className={clsx(classes.root, className)}>
              <CardHeader
                title={
                  <Typography variant="h2" className={classes.complete}>
                    Complete
                  </Typography>
                }
              />
              <TaskCard />
            </Card>
          </Grid>
        </Grid>
        <Modal onClose={handleModalClose} open={taskModal.open}>
          <AddEditTask
            task={taskModal.task}
            onAdd={handleTaskAdd}
            onCancel={handleModalClose}
            onDelete={handleTaskDelete}
            onEdit={handleTaskEdit}
          />
        </Modal>
      </Container>
    </Page>
  );
}

export default TodoList;
