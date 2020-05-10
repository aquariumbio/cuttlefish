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
import mockProjects from '../ProjectManagementList/projects_data'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#FAFAFA"
  },
  content: {
    padding: theme.spacing(1)
  }
}));

const options = ['All', 'Protein Design', 'Strain Construction'];

let filterData;

function OngoingProjects({ customer, className, ...rest }) {
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

  const handleFilter = (event, index) => {
    setAnchorEl(null);
    setSelectedIndex(index)
  };

  if (selectedIndex === 0) {
    filterData = mockProjects
  } else {
    filterData = mockProjects.filter((proj) => proj.type === options[selectedIndex])
  }

  const projects = filterData.map(proj => <ProjectCard project={proj} />);

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
        </Grid>
      </Grid>
      <Divider />
      <CardContent className={classes.content}>
        {projects}
      </CardContent>
    </Card>
  );
}

export default OngoingProjects;
