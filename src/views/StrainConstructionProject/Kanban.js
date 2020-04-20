import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const CustomLinearProgress = withStyles(theme => ({
  root: {
    height: 5,
    backgroundColor: lighten(theme.palette.success.main, 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: theme.palette.success.main
  }
}))(LinearProgress);

export default function Kanban() {
  const [progress, setProgress] = useState([80]);

  return (
    <div>
      <CustomLinearProgress
        variant="determinate"
        value={progress}
        color="primary"
      />
    </div>
  );
}
