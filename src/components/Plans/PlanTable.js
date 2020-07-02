import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Page from 'src/components/Page';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const columns = [
  {
    id: 'favorite',
    label: 'Favorite',
    minWidth: 10,
    align: 'left'
  },
  {
    id: 'id',
    label: 'ID',
    minWidth: 50,
    align: 'left',
    format: value => value.toFixed(0)
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

// function createData(
//   favorite,
//   planNumber,
//   planName,
//   planCreationDate,
//   planStatus
// ) {
//   return { favorite, planNumber, planName, planCreationDate, planStatus };
// }

// const rows = [
//   createData(true, 38890, 'ACE2 library AT', '03/20/2020', 'Completed'),
//   createData(false, 38891, 'Plan B', '03/20/2020', 'Completed'),
//   createData(false, 38892, 'Plan C', '03/20/2020', 'Completed'),
//   createData(true, 38893, 'Plan D', '03/20/2020', 'Completed'),
//   createData(false, 38893, 'Plan E', '03/20/2020', 'Completed'),
//   createData(false, 38893, 'Plan F', '03/20/2020', 'Completed')
// ];

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
}))(TableCell);

export default function PlanTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Page className={classes.root} title="Plans">
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table sticky Header>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map(column => {
                        const value = row[column.id];
                        console.log(value);
                        if (column.id === 'favorite') {
                          if (value) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <StarIcon
                                  style={{
                                    color: '#065683',
                                    cursor: 'pointer'
                                  }}
                                />
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <StarBorderIcon
                                  style={{
                                    color: '#065683',
                                    cursor: 'pointer'
                                  }}
                                />
                              </TableCell>
                            );
                          }
                        } else if (column.id === 'created_at' || column.id === 'updated_at' ) {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {moment(value).format('D MMM YYYY')}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[6, 36]}
          component="div"
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Page>
  );
}
