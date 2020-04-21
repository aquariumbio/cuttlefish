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
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ProjectCard from '../../components/ProjectCard/index';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  }
}));

const options = ['All', 'Protein Design', 'Strain Construction'];

function OngoingProjects({ customer, className, ...rest }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const mockProjects = [
    {
      title: 'Project A',
      owner: 'Thomas Penner',
      date: '4/18/20',
      type: 'Type A',
      status: 'pending'
    },
    {
      title: 'Project B',
      owner: 'Thomas Penner',
      date: '4/19/20',
      type: 'Type B',
      status: 'pending'
    }
  ];

  const projects = mockProjects.map(proj => <ProjectCard project={proj} />);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Grid container spacing={11}>
        <Grid item xs={10}>
          <CardHeader title="Ongoing Projects" />
        </Grid>
        <Grid item xs>
          <IconButton onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {options.map(option => (
              <MenuItem
                key={option}
                selected={option === 'All'}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
      <Divider />
      {projects}
      <CardContent className={classes.content}></CardContent>
    </Card>
  );
}

export default OngoingProjects;
