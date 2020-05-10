import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { Typography, IconButton, Tooltip, Card } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FAFAFA",
    userSelect: 'none',
    whiteSpace: 'normal',
    height: '100%',
    display: 'inline-flex',
    flexDirection: 'column',
    verticalAlign: 'top',
    width: 350,
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('xs')]: {
      width: 300
    }
  },
  isDraggingOver: {},
  header: {
    padding: theme.spacing(0.5, 2),
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center'
  },
  counter: {
    marginLeft: theme.spacing(1)
  },
  headerAction: {
    marginLeft: 'auto'
  },
  content: {
    flexGrow: 1,
    overflowY: 'hidden'
  },
  inner: {
    padding: theme.spacing(1, 2)
  }
}));

function TaskList({
  title,
  titleColor,
  total,
  provided,
  snapshot,
  className,
  children,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      ref={provided.innerRef}
    >
      <div className={classes.header}>
        <Typography
          color={titleColor}
          variant="h5"
        >
          {title}
        </Typography>
        <Typography
          className={classes.counter}
          color={titleColor}
          variant="h6"
        >
          (
          {total}
          )
        </Typography>
        <div className={classes.headerAction}>
          <Tooltip title="Add task">
            <IconButton
              color="inherit"
              edge="end"
              variant="contained"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div
        className={clsx(classes.content, {
          [classes.isDraggingOver]: snapshot.isDraggingOver
        })}
      >
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <div className={classes.inner}>{children}</div>
        </PerfectScrollbar>
      </div>
    </Card>
  );
}

TaskList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
  title: PropTypes.string,
  total: PropTypes.number
};

export default TaskList;
