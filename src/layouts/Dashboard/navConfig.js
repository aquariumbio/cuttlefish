/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
// import { colors } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
// import Label from 'src/components/Label';

export default [
  {
    subheader: 'Project Dasboard',
    items: [
      {
        title: 'Overview',
        href: '/',
        icon: HomeIcon
      },
      {
        title: 'Management',
        href: '/',
        icon: BarChartIcon,
        items: [
          {
            title: 'Projects',
            href: '/'
          },
          {
            title: 'Tasks',
            href: '/'
          }
        ]
      },
      {
        title: 'Inbox',
        href: '/',
        icon: MailIcon
        // label: () => (
        //   <Label color={colors.red[500]} shape="rounded">
        //     2
        //   </Label>
        // )
      },
      {
        title: 'Calendar',
        href: '/',
        icon: CalendarTodayIcon
        // label: () => <Label color={colors.green[500]}>New</Label>
      }
    ]
  }
];
