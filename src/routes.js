/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';
import Overview from './views/Overview';

export default [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/overview" />
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('src/views/Login'))
      },
      {
        path: '/auth/register',
        exact: true,
        component: lazy(() => import('src/views/Register'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('src/views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('src/views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('src/views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/calendar',
        exact: true,
        component: lazy(() => import('src/views/Calendar'))
      },
      {
        path: '/changelog',
        exact: true,
        component: lazy(() => import('src/views/Changelog'))
      },
      {
        path: '/overview',
        exact: true,
        component: Overview
      },
      {
        path: '/todo',
        exact: true,
        component: lazy(() => import('src/views/TodoList'))
      },
      {
        path: '/inbox',
        exact: true,
        component: lazy(() => import('src/views/Mail'))
      },
      {
        path: '/projects',
        exact: true,
        component: lazy(() => import('src/views/ProjectManagementList'))
      },
      {
        path: '/project/:id',
        exact: true,
        component: lazy(() => import('src/views/Project'))
      },
      {
        path: '/tasks',
        exact: true,
        component: lazy(() => import('src/views/TaskManagementList'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];
