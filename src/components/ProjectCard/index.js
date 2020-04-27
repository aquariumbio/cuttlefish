import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import palette from '../../theme/palette';
import { Link, Route } from 'react-router-dom';
import Label from 'src/components/Label';
import { useDispatch } from 'react-redux';
import { switchProject } from 'src/actions';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },

  content: {
    display: 'flex',
    flexDirection: 'c',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '82px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  header: {
    color: theme.palette.primary.main
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'space-between'
  },
  cardLabel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
}));

function ProjectCard({ project, className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const getLabelColor = () => {
    if (project.status === 'pending') {
      return palette.caution.main;
    } else if (project.status === 'completed') {
      return palette.success.main;
    } else {
      return palette.error.main;
    }
  };

  const handleClick = () => {
    dispatch(switchProject(project));
    history.push(`/project/${project.title}`);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      onClick={handleClick}
    >
      <CardContent className={classes.content}>
        <Grid container className={classes.container}>
          <Grid item>
            <Typography variant="body2">{project.date}</Typography>
            <Typography className={classes.header} variant="h4">
              {project.title}
            </Typography>
            <Typography variant="body2">{`Owned by: ${project.owner}`}</Typography>
          </Grid>
          <Grid item className={classes.cardLabel}>
            <Typography variant="body2">{project.type}</Typography>
            <Label color={getLabelColor()} variant="other">
              {project.status}
            </Label>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
}

ProjectCard.propTypes = {
  className: PropTypes.string
};

export default ProjectCard;
