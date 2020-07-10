import React, { Suspense, useState, useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    '@media all and (-ms-high-contrast:none)': {
      height: 0 // IE11 fix
    }
  },
  content: {
    paddingTop: 64,
    flexGrow: 1,
    maxWidth: '100%',
    overflowX: 'hidden',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 56
    }
  }
}));

function Dashboard({ route }) {
  const classes = useStyles();
  const session = useSelector(state => state.session);
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  useEffect(() => {}, [session.user]);

  return (
    <>
      <TopBar onOpenNavBarMobile={() => setOpenNavBarMobile(true)} />
      <NavBar
        onMobileClose={() => setOpenNavBarMobile(false)}
        openMobile={openNavBarMobile}
      />
      <div className={classes.container}>
        <div className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            {renderRoutes(route.routes)}
          </Suspense>
        </div>
      </div>
    </>
  );
}

Dashboard.propTypes = {
  route: PropTypes.object
};

export default Dashboard;
