import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  Link,
  Typography,
  colors
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getProject } from 'src/actions';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap'
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2)
    }
  },
  header: {
    maxWidth: '100%',
    width: 240,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      flexBasis: '100%'
    }
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  stats: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  actions: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  }
}));

function TaskCard({ task, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const statusColors = {
    'In progress': colors.orange[600],
    Canceled: colors.grey[600],
    Completed: colors.green[600]
  };

  const handleClick = () => {
    dispatch(getProject(task));
    history.push(`/project/${task.group}`);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <div>
            <Link
              color="textPrimary"
              component={RouterLink}
              noWrap
              to="#"
              variant="h5"
            >
              {task.title}
            </Link>
            <Typography variant="body2">
              by
              {' '}
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/management/customers/1"
                variant="h6"
              >
                {task.owner}
              </Link>
            </Typography>
          </div>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{task.members.length}</Typography>
          <Typography variant="body2">members</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {moment(task.start_date).format('DD/MM/YY')}
          </Typography>
          <Typography variant="body2">Task started</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {moment(task.end_date).format('DD/MM/YY')}
          </Typography>
          <Typography variant="body2">Task deadline</Typography>
        </div>
        <div className={classes.stats}>
          <Typography
            style={{ color: statusColors[task.status] }}
            variant="h6"
          >
            {task.status}
          </Typography>
          <Typography variant="body2">Task status</Typography>
        </div>
        <div className={classes.actions}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={handleClick}
          >
            View Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

TaskCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default TaskCard;
