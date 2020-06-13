import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    {
        id: 'favorite',
        label: 'Favorite',
        minWidth: 10,
        align: 'left'
    },
    { 
        id: 'planNumber', 
        label: 'Plan Nunber', 
        minWidth: 50,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'planName',
        label: 'Plan Name',
        minWidth: 170,
        align: 'left'    
    },
    {
        id: 'planCreationDate',
        label: 'Creation Date',
        minWidth: 70,
        align: 'left',
        format: (value) => value.toDateString(),
    },
    {
        id: 'planStatus',
        label: 'Status',
        minWidth: 70,
        align: 'left',
        format: (value) => value.toLocaleString('en-US')
    },
];

function createData(favorite, planNumber, planName, planCreationDate, planStatus) {
    return { favorite, planNumber, planName, planCreationDate, planStatus };
}

const rows = [
    createData(true, 38890, 'ACE2 library AT', '03/20/2020', 'Completed'),
    createData(false, 38891, 'Plan B', '03/20/2020', 'Completed'),
    createData(false, 38892, 'Plan C', '03/20/2020', 'Completed'),
    createData(true, 38893, 'Plan D', '03/20/2020', 'Completed'),
    createData(false, 38893, 'Plan E', '03/20/2020', 'Completed'),
    createData(false, 38893, 'Plan F', '03/20/2020', 'Completed'),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    }
}))(TableCell);

export default function PlanTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table sticky Header>
                    <TableHead >
                        <TableRow>
                            {columns.map((column) => (
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.planNumber}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
