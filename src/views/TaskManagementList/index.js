import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Typography } from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import Paginate from 'src/components/Paginate';
import SearchBar from 'src/components/SearchBar';
import Header from './Header';
import TaskCard from './TaskCard';
import mockTasks from './tasks_data';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

function TaskManagementList() {
  const classes = useStyles();
  const [rowsPerPage] = useState(10);
  const [page] = useState(0);

  const handleFilter = () => { };

  const handleSearch = () => { };

  // useEffect(() => {
  //   let mounted = true;

  //   const fetchProjects = () => {
  //     axios.get('/api/projects').then((response) => {
  //       if (mounted) {
  //         setProjects(response.data.projects);
  //       }
  //     });
  //   };

  //   fetchProjects();

  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  return (
    <Page
      className={classes.root}
      title="Current Tasks"
    >
      <Container maxWidth={false}>
        <Header />
        <SearchBar
          onFilter={handleFilter}
          onSearch={handleSearch}
        />
        <div className={classes.results}>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
          >
            {`${mockTasks.length} tasks found. Page ${page + 1} of ${Math.ceil(mockTasks.length / rowsPerPage)}`}
          </Typography>
          {mockTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}
        </div>
        <div className={classes.paginate}>
          <Paginate pageCount={3} />
        </div>
      </Container>
    </Page>
  );
}

export default TaskManagementList;
