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
            { title: 'Z-D', started: true, completed: false },
            { title: 'q1', started: true, completed: false },
            { title: 'q2', started: true, completed: false },
            { title: 'seq', started: true, completed: false }
          ]
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
