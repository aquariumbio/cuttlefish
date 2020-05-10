import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid
} from '@material-ui/core';
import TaskCard from '../../components/TaskCard/index';
import mockData from '../StrainConstructionProject/mockKanbanData';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#FAFAFA"
  },
  content: {
    padding: theme.spacing(1)
  }
}));

let filterData

function TasksDueSoon({ customer, className, ...rest }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  filterData = mockData.tasks.filter((task) => task.status === "In Progress");
  const tasks = filterData.map(task => <TaskCard task={task} />);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Grid container spacing={11}>
        <Grid item xs={10}>
          <CardHeader title="Tasks Due Soon" />
        </Grid>
        {/* <Grid item xs>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleFilter(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Grid> */}
      </Grid>
      <Divider />
      <CardContent className={classes.content}>
        {tasks}
      </CardContent>
    </Card>
  );
}

export default TasksDueSoon;
