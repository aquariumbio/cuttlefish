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
import { getProject } from 'src/actions';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),    
    marginBottom: theme.spacing(2)
  },
  content: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
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

function TaskCard({ task, className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const getLabelColor = () => {
    if (task.status === 'pending') {
      return palette.caution.main;
    } else if (task.status === 'completed') {
      return palette.success.main;
    } else {
      return palette.error.main;
    }
  };

  // To simulate pulling from a database, therer is a currenttTask state in redux that is being updated here so
  // the correct task view can be rendered upon clicking
  const handleClick = () => {
    dispatch(getProject(task));
    history.push(`/task/${task.title}`);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      onClick={handleClick}
    >
      <CardContent className={classes.content}>
        <Grid container className={classes.container}>
          <Grid item xs>
            <Typography variant="body2" noWrap>
              {task.deadline}
            </Typography>
            <Typography className={classes.header} variant="h4" noWrap>
              {task.title}
            </Typography>
            <Typography
              variant="body2"
              noWrap
            >{`Owned by: ${task.members}`}</Typography>
          </Grid>
          <Grid item xs className={classes.cardLabel}>
            <Typography variant="body2" noWrap>
              {/* {task.type} */}
            </Typography>
            <Label color={getLabelColor()} variant="other">
              Due Soon
            </Label>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
}

TaskCard.propTypes = {
  className: PropTypes.string
};

export default TaskCard;
