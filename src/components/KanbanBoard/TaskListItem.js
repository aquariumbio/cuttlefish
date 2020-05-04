import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,

} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Label from 'src/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {
    outline: 'none',
    marginBottom: theme.spacing(2),
  },
  isDragging: {},
  content: {
    paddingTop: 0
  },
  stats: {
    display: 'flex',
    alignItems: 'center'
  },
  flexGrow: {
    flexGrow: 1
  },
  date: {
    marginLeft: theme.spacing(2)
  },
  member: {
    paddingBottom: theme.spacing(1)
  }
}));

function TaskListItem({
  task,
  onOpen,
  provided,
  snapshot,
  className,
  style,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={clsx(
        classes.root,
        {
          [classes.isDragging]: snapshot.isDragging
        },
        className
      )}
      style={{ ...style, ...provided.draggableProps.style }}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title={task.title}
        titleTypographyProps={{ variant: 'h5', gutterBottom: true }}
      />
      <CardContent className={classes.content}>
        <Typography className={classes.member} variant="body1">
          <strong>Engineers: </strong>
          {task.members}
        </Typography>
        <div className={classes.stats}>
          <Label
            color={task.statusColor}
            variant="contained"
          >
            {task.status}
          </Label>
          <div className={classes.flexGrow} />
          <Typography
            className={classes.date}
            color="textSecondary"
            variant="body2"
          >
            {moment(task.deadline).format('D MMM YYYY')}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

TaskListItem.propTypes = {
  className: PropTypes.string,
  onOpen: PropTypes.func,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
  style: PropTypes.object,
  task: PropTypes.object.isRequired
};

TaskListItem.defaultProps = {
  style: {},
  onOpen: () => { }
};

export default TaskListItem;
