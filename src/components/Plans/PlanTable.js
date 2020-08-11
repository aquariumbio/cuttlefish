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

const columns = [
  {
    id: 'favorite',
    label: 'Favorite',
    minWidth: 10,
    align: 'left'
  },
  {
    id: 'id',
    label: 'Plan ID',
    minWidth: 50,
    align: 'left',
    format: value => (
      <a href={'http://52.27.43.242/launcher?plan_id=' + value} target="_blank">
        {value.toFixed(0)}
      </a>
    )
  },
  {
    id: 'name',
    label: 'Plan Name',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'created_at',
    label: 'Created Date',
    minWidth: 70,
    align: 'left',
    format: value => moment(value).format('D MMM YYYY')
  },
  {
    id: 'updated_at',
    label: 'Updated Date',
    minWidth: 70,
    align: 'left',
    format: value => moment(value).format('D MMM YYYY')
  }
];

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
  const options = {
    sort: true,
    filter: false,
    selectableRows: 'none',
    selectableRowsHeader: false,
    count: data.length,
    page: page,
    rowsPerPageOptions: [6, 12, 18, 24, 30, 36],
    rowsPerPage: rowsPerPage
  };

  useEffect(() => { }, [props.data]);

  const handleFavorite = () => {	
    setFavStatus(!favStatus);	
  };

  function createData() {
    if (props.data == null) {
      data.push(<LinearProgress className={classes.progress} color="primary" />)
    } else {
      props.data
        .map(row => {
          let rowData = []

          const favoriteRow = 
            <StarIcon 
              style={{ color: '#065683', cursor: 'pointer' }} 
              onClick={handleFavorite} />
          rowData.push(favoriteRow)

          const value = JSON.parse(row.data)['id']
          const idRow =
            <Button
              href={'http://52.27.43.242/launcher?plan_id=' + value}
              className={classes.linkButton}
              target="_blank"
            >
              {`${value.toFixed(0)}   `} <LinkIcon />
            </Button >
          rowData.push(idRow)

          rowData.push(JSON.parse(row.data)['name'])
          rowData.push(moment(JSON.parse(row.data)['created_at']).format('D MMM YYYY'))
          rowData.push(moment(JSON.parse(row.data)['updated_at']).format('D MMM YYYY'))
          data.push(rowData)
        })
    }
  }

  createData()

  if (data.length === 1) {
    planTable = data
  } else {
    planTable = <MUIDataTable
      columns={columns.map(column => (column.label))}
      data={data}
      options={options}
    />
  }

  return (
    <Page className={classes.root} title="Plans">
      {planTable}
    </Page>
  );
}
