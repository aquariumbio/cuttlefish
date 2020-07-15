import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import Paginate from 'src/components/Paginate';
import SearchBar from 'src/components/SearchBar';
import Header from './Header';
import ProjectCard from './ProjectCard';
import { LinearProgress } from '@material-ui/core';
import firebase from '../../firebase/firebase';

const useStyles = makeStyles(theme => ({
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
  },
  progress: {
    width: '100%',
    marginTop: theme.spacing(5),
    '& > * + *': {
      marginTop: theme.spacing(5)
    }
  }
}));

function ProjectManagementList() {
  const classes = useStyles();
  const [rowsPerPage] = useState(10);
  const [page] = useState(0);
  const [projects, setProjects] = useState();

  const handleFilter = () => {};

  const handleSearch = () => {};

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    var projects = [];
    await firebase.db
      .collection('projects')
      .where('status', '==', 'pending')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(project => {
          projects.push(project.data());
        });
      })
      .then(() => {
        const cards = projects.map(proj => (
          <ProjectCard project={proj} key={proj.id} />
        ));
        setProjects(cards);
      });
  };

  return (
    <Page className={classes.root} title="Current Projects">
      <Container maxWidth={false}>
        <Header />
        <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
        {projects == null ? (
          <LinearProgress className={classes.progress} color="primary" />
        ) : (
          <>
            <div className={classes.results}>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {`${projects.length} projects found. Page ${page +
                  1} of ${Math.ceil(projects.length / rowsPerPage)}`}
              </Typography>
              {projects}
            </div>

            <div className={classes.paginate}>
              <Paginate pageCount={3} />
            </div>
          </>
        )}
      </Container>
    </Page>
  );
}

export default ProjectManagementList;
