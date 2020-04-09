import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardHeader,
  CardActions,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  iconAfter: {
    marginLeft: theme.spacing(1)
  }
}));

const card = {
  title: 'Task Name'
};

const items = [
  {
    id: 1,
    title: 'Subtask Name'
  },
  {
    id: 2,
    title: 'Subtask Name'
  },
  {
    id: 3,
    title: 'Subtask Name'
  }
];

function TaskCard({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <IconButton size="small">
            <MoreIcon />
          </IconButton>
        }
        title={card.title}
      />
      <Divider />
      <List disablePadding>
        {items.map(item => (
          <ListItem button divider key={item.id}>
            <ListItemIcon>
              <Checkbox disableRipple edge="start" tabIndex={-1} />
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <CardActions className={classes.actions}>
        <Button color="primary">View More</Button>
      </CardActions>
    </Card>
  );
}

TaskCard.propTypes = {
  className: PropTypes.string
};

export default TaskCard;
