import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Page from 'src/components/Page';
import {
  LinearProgress,
  Button
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import LinkIcon from '@material-ui/icons/Link';
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  },
  progress: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(5)
    }
  },
  linkButton: {
    padding: 0,
    margin: 0
  },
  searchBar: {
    paddingBottom: theme.spacing(3)
  }
}));

let planTable;

export default function PlanTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [favStatus, setFavStatus] = React.useState(false);
  const data = []
  const tableColumns = [
    {
      name: 'Strain Name',
      options: {
        setCellHeaderProps: value => ({ style: { color: "white", backgroundColor: "#065683" } }),
      },
    },
    {
      name: 'Progress',
      options: {
        setCellHeaderProps: value => ({ style: { color: "white", backgroundColor: "#065683" } }),
      },
    },
    {
      name: 'Created Date',
      options: {
        setCellHeaderProps: value => ({ style: { color: "white", backgroundColor: "#065683" } }),
      },
    },
    {
      name: 'Status',
      options: {
        setCellHeaderProps: value => ({ style: { color: "white", backgroundColor: "#065683" } }),
      },
    },
  ];
  const options = {
    sort: true,
    filter: false,
    selectableRows: 'none',
    selectableRowsHeader: false,
    search: true,
    searchOpen: true,
    searchPlaceholder: 'Search plan name',
    count: data.length,
    page: page,
    rowsPerPageOptions: [6, 12, 18, 24, 30, 36],
    rowsPerPage: rowsPerPage
  };

  useEffect(() => { }, [props.data]);

  const handleFavorite = (event) => {
    setFavStatus(!favStatus);
  };

  function createData() {
    if (props.data == null) {
      data.push(<LinearProgress className={classes.progress} color="primary" />)
    } else {

      // backend rendering

    }
  }

  createData()

  // if (data.length === 1) {
  //   planTable = data
  // } else {
    planTable = <MUIDataTable
      columns={tableColumns}
      data={data}
      options={options}
    />
  // }

  return (
    <Page className={classes.root} title="Strains">
      {planTable}
    </Page>
  );
}
