import React, { useState, forwardRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Typography,
    Dialog,
    TextField,
    Button,
    Divider,
    Grid,
    Chip,
    IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    field: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    cancelButton: {
        marginLeft: 'auto'
    },
    createButton: {
        color: theme.palette.common.white,
        backgroundColor: '#065683',
        '&:hover': {
            backgroundColor: '#065683'
        }
    },
    closeIcon: {
        marginLeft: theme.spacing(25)
    },
    chipList: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none'
      },
      chip: {
        backgroundColor: '#bfbfbf'
      }
}));

const CustomTypography = withStyles(theme => ({
    h3: {
        color: '#05486E',
        marginTop: theme.spacing(1)
    }
}))(Typography);

const engineers = [
    {
        value: 'Enter engineer',
        label: 'Enter engineer',
    },
    {
        value: 'Phuong',
        label: 'Phuong',
    },
    {
        value: 'Thomas',
        label: 'Thomas',
    },
    {
        value: 'Melody',
        label: 'Melody',
    }
];

const AddTaskDialog = forwardRef((props) => {
    const {
        show,
        setShow,
    } = props;
    const classes = useStyles();
    const [engineer, setEngineer] = React.useState(engineers[0]);

    const defaultEvent = {
        title: 'Enter your task name',
        desc: 'Enter your task description',
        start: moment().toDate(),
        end: moment().toDate(),
        tag: 'Enter tag'
    };

    const [chipData, setChipData] = useState([
        { key: 0, label: 'Example Tag', type: 'red' }
    ]);  
    const [tag, setTag] = useState('');

    const [start, setStart] = useState(defaultEvent.start);
    const [end, setEnd] = useState(defaultEvent.end);

    const handleClose = () => {
        setShow(false)
    }

    const handleStartDate = event => {
        setStart(event.target.value);
    };
    
    const handleEndDate = event => {
        setEnd(event.target.value);
    };

    const handleTagInput = event => {
        setTag(event.target.value);
    };

    const handleAddChip = () => {
        setChipData(chips => [
        ...chips,
        { key: chips.length + 1, label: tag, role: '' }
        ]);
    };

    const handleChipDelete = chipToDelete => () => {
        setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
    };

    const handleEngineerChange = (event) => {
        setEngineer(event.target.value);
    };


    return (
        <Dialog
            open={show}
            onClose={handleClose}
        >
            <DialogTitle>
                <Grid
                    container
                    spacing={10}
                >
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <CustomTypography
                            align="left"
                            gutterBottom
                            variant="h3"
                        >
                            Create Task Card
                            </CustomTypography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <IconButton className={classes.closeIcon} onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <TextField
                    className={classes.field}
                    style={{ width: '100%' }}
                    label="Task Name"
                    name="Task Name"
                    placeHolder={defaultEvent.title}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    className={classes.field}
                    style={{ width: '100%' }}
                    select
                    SelectProps={{
                        native: true,
                    }}
                    label="Task Engineer"
                    name="Task Engineer"
                    onChange={handleEngineerChange}
                    value={engineer}
                    variant="outlined">
                    {engineers.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <TextField
                    className={classes.field}
                    defaultValue={moment(defaultEvent.start).format('YYYY-MM-DDThh:mm:ss')}
                    style={{ width: '35%', marginRight: 10 }}
                    margin="normal"
                    label="Start date"
                    name="start"
                    onChange={handleStartDate}
                    type="datetime-local"
                    variant="outlined"
                />
                <TextField
                    className={classes.field}
                    defaultValue={moment(defaultEvent.end).format('YYYY-MM-DDThh:mm:ss')}
                    style={{ width: '35%', marginRight: 10 }}
                    margin="normal"
                    label="End date"
                    name="end"
                    onChange={handleEndDate}
                    type="datetime-local"
                    variant="outlined"
                />
                <TextField
                    className={classes.field}
                    label="Task Duration (days)"
                    name="dur"
                    style={{ width: '25%', float: 'right' }}
                    margin="normal"
                    defaultValue={moment(end).diff(moment(start), 'days')}
                    multiline
                    variant="filled"
                />
                <TextField
                    className={classes.field}
                    style={{ width: '70%', marginRight: 25 }}
                    label="Add Tags"
                    name="Add Tags"
                    placeholder={defaultEvent.tag}
                    onChange={handleTagInput}
                    variant="outlined"
                    fullWidth
                />
                <Button
                    className={classes.field}
                    style={{ width: '20%' }}
                    margin="normal"
                    variant="contained"
                    onClick={handleAddChip}
                >
                    + Add
                </Button>
                <ul className={classes.chipList}>
                {chipData.map(data => {
                return (
                    <li key={data.key} className={classes.field}>
                    <Chip
                        label={data.label}
                        onDelete={handleChipDelete(data)}
                        className={classes.chip}
                    />
                    </li>
                );
                })}
            </ul>
            </DialogContent>
            < Divider />
            <DialogActions>
                <Button
                    className={classes.cancelButton}
                    onClick={handleClose}
                    variant="contained">
                    Cancel
                    </Button>
                <Button
                    className={classes.createButton}
                    onClick={handleClose}
                    variant="contained">
                    Create
                    </Button>
            </DialogActions>
        </Dialog>
    );
});

export default AddTaskDialog

