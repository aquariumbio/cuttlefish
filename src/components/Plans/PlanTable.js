import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Page from 'src/components/Page';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  LinearProgress,
  Button
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import LinkIcon from '@material-ui/icons/Link';

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
  }
}));

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
  const [favStatus, setFavStatus] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFavorite = () => {
    setFavStatus(!favStatus);
  };

  useEffect(() => {}, [props.data]);

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
              {props.data == null ? (
                <LinearProgress className={classes.progress} color="primary" />
              ) : (
                props.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={JSON.parse(row.data).id}
                      >
                        {columns.map(column => {
                          const value = JSON.parse(row.data)[column.id];
                          if (column.id === 'favorite') {
                            if (favStatus) {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <StarIcon
                                    style={{
                                      color: '#065683',
                                      cursor: 'pointer'
                                    }}
                                    onClick={handleFavorite}
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
                                    onClick={handleFavorite}
                                  />
                                </TableCell>
                              );
                            }
                          } else if (
                            column.id === 'created_at' ||
                            column.id === 'updated_at'
                          ) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {moment(value).format('D MMM YYYY')}
                              </TableCell>
                            );
                          } else if (column.id == 'id') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Button
                                  href={
                                    'http://52.27.43.242/launcher?plan_id=' +
                                    value
                                  }
                                  className={classes.linkButton}
                                  target="_blank"
                                >
                                  {`${value.toFixed(0)}   `} <LinkIcon />
                                </Button>
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
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {props.data == null ? null : (
          <TablePagination
            rowsPerPageOptions={[6, 36]}
            component="div"
            count={props.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Page>
  );
}
