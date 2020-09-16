import React from 'react';
import { useSelector } from 'react-redux';
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
import firebase from '../../firebase/firebase';

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
  const session = useSelector(state => state.session);
  const page = React.useState(0);
  const rowsPerPage = React.useState(6);
  const data = []
  const [favData, setFavData] = React.useState([])
  const tableColumns = [
    {
      name: 'Favorite',
      options: {
        sort: false,
        setCellHeaderProps: value => ({ style: { color: "white", backgroundColor: "#065683" } }),
      },
    },
    {
      name: 'Plan ID',
      options: {
        sort: false,
        setCellHeaderProps: value => ({ style: { color: "white", backgroundColor: "#065683" } }),
      },
    },
    {
      name: 'Plan Name',
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
      name: 'Updated Date',
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

  const handleFavorite = async (id) => {
    var favList
    var docRef = firebase.db.collection('users').doc(session.user.aqLogin);
    await docRef
      .get()
      .then(function (doc) {
        favList = doc.data().favoritePlans;
        if (!favList.includes(id)) {
          favList.push(id);
        } else {
          var index = favList.indexOf(id);
          favList.splice(index, 1);
        }
      })
      .catch(function (error) {
        alert(error);
      });

    firebase.db.collection('users')
      .doc(session.user.aqLogin)
      .update('favoritePlans', favList);
  };

  async function getFavData() {
    var data
    var docRef = firebase.db.collection('users').doc(session.user.aqLogin);
    await docRef
      .get()
      .then(function (doc) {
        data = doc.data().favoritePlans;
        setFavData(data)
      })
    return data
  }

  getFavData()

  function createData() {
    if (props.data == null) {
      data.push(<LinearProgress className={classes.progress} color="primary" />)
    } else {
      props.data
        .forEach(row => {
          let rowData = []
          const value = JSON.parse(row.data)['id']

          // Favorite Row
          let favoriteRow;
          if (favData.includes(value)) {
            favoriteRow = <StarIcon style={{ color: '#065683', cursor: 'pointer' }} onClick={function () { handleFavorite(value) }} />
          } else {
            favoriteRow = <StarBorderIcon style={{ color: '#065683', cursor: 'pointer' }} onClick={function () { handleFavorite(value) }} />
          }
          rowData.push(favoriteRow)

          // Plan ID Row
          const idRow =
            <Button
              href={'http://52.27.43.242/launcher?plan_id=' + value}
              className={classes.linkButton}
              target="_blank"
            >
              {`${value.toFixed(0)}   `} <LinkIcon />
            </Button >
          rowData.push(idRow)

          // Plan Name, Created Date, and Updated Date rows
          rowData.push(JSON.parse(row.data)['name'])
          rowData.push(moment(JSON.parse(row.data)['created_at']).format('MM/DD/YYYY'))
          rowData.push(moment(JSON.parse(row.data)['updated_at']).format('MM/DD/YYYY'))
          data.push(rowData)
        })
    }
  }

  createData()

  if (data.length === 1) {
    planTable = data
  } else {
    planTable = <MUIDataTable
      columns={tableColumns}
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
