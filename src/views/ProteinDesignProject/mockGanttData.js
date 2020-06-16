import moment from 'moment';

export default {
  libraries: [
    {
      id: 1,
      title: 'COVID-19 RBD',
      owner: 'Longxing',
      tasks: [
        {
          id: 1,
          title: 'Amplify and Transform',
          subtasks: [],
          started: true,
          completed: false
        },
        {
          id: 2,
          title: 'Expression Sort',
          subtasks: []
        },
        {
          id: 3,
          title: 'Binding',
          subtasks: []
        },
        {
          id: 4,
          title: 'New Gen Sequence',
          subtasks: [
            {
              title: 'Z-D',
              started: true,
              completed: true,
              startDate: moment(),
              endDate: moment().add(1, 'day')
            },
            {
              title: 'q1',
              started: true,
              completed: false,
              startDate: moment().add(1, 'day'),
              endDate: moment().add(2, 'day')
            },
            {
              title: 'q2',
              started: false,
              completed: false,
              startDate: moment().add(2, 'day'),
              endDate: moment().add(3, 'day')
            },
            {
              title: 'seq',
              started: false,
              completed: false,
              startDate: moment().add(3, 'day'),
              endDate: moment().add(4, 'day')
            }
          ],
          startDate: moment(),
          endDate: moment().add(4, 'day'),
          started: true,
          completed: false
        }
      ]
    },
    {
      id: 2,
      title: 'Library #2',
      owner: 'Person B',
      tasks: []
    }
  ]
};
