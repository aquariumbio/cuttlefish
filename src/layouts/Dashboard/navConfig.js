/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import CheckIcon from '@material-ui/icons/Check';

export default [
  {
    subheader: 'Project Dasboard',
    items: [
      {
        title: 'Overview',
        href: '/overview',
        icon: HomeIcon
      },
      {
        title: 'Management',
        href: '/',
        icon: BarChartIcon,
        items: [
          {
            title: 'Projects',
            href: '/projects'
          },
          {
            title: 'Tasks',
            href: '/tasks'
          }
        ]
      },

      {
        title: 'Calendar',
        href: '/calendar',
        icon: CalendarTodayIcon
        // label: () => <Label color={colors.green[500]}>New</Label>
      },
      {
        title: 'Todo List',
        href: '/todo',
        icon: CheckIcon
      },
      {
        title: 'Inbox',
        href: '/inbox',
        icon: MailIcon
        // label: () => (
        //   <Label color={colors.red[500]} shape="rounded">
        //     2
        //   </Label>
        // )
      }
    ]
  }
];
