import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid
} from '@material-ui/core';
import Page from 'src/components/Page';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
  },
  content: {
    padding: 0
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {}
}));

export default function Notebook({ className, ...rest }) {
  const classes = useStyles();
  const [fileType, setFileType] = useState('');

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = ['Sort', 'Options', 'Here'];

  return (
    <Page className={classes.root} title={"Notebook"}>
      <Grid className={classes.container} container spacing={1}>
        <Grid item xs={3}>
          <Card {...rest} className={clsx(classes.root, className)}>
            <Grid container className={classes.topBar}>
              <Grid item>
                <CardHeader title={'Notebook'} />
              </Grid>
              <Grid item>
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
            <CardContent className={classes.content}></CardContent>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Card {...rest} className={clsx(classes.root, className)}>
            <Grid item xs={10}>
              <CardHeader title={fileType} />
            </Grid>
            <Divider />
            <CardContent className={classes.content}></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
}
