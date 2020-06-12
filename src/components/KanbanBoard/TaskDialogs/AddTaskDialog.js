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
    const [values, setValues] = useState("Example Tag");
    const [engineer, setEngineer] = React.useState(engineers[0]);

    const handleClose = () => {
        setShow(false)
    }

    const chips = [];
    const chipsArray = [];

    const handleAddChip = (name) => {
        console.log('chip added');
        chipsArray.push(name);
        chips.push(
            <Chip
                label={name}
                onDelete={(name, index) => handleDeleteChip(name, index)}
            />
        );
    };

    const handleDeleteChip = (chip, index) => {
        console.log('chip deleted');
        chipsArray.splice(index, 1);
        showChipArray();
    };

    const showChipArray = () => {
        chipsArray.forEach(function (index, chip) {
            chips.push(
                <Chip
                    label={chip}
                    onDelete={(chip, index) => handleDeleteChip(chip, index)}
                />
            );
            console.log('pushed chip ' + index);
        })
    }

    const handleEngineerChange = (event) => {
        setEngineer(event.target.value);
    };

    const handleFieldChange = (e) => {
        e.persist();
        setValues((prevValues) => ({
          ...prevValues,
          [e.target.name]:
            e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }));
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
                    defaultValue="Enter your task name"
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
                    defaultValue={moment(values.start).format('YYYY-MM-DDThh:mm:ss')}
                    style={{ width: '35%', marginRight: 10 }}
                    margin="normal"
                    label="Start date"
                    name="start"
                    onChange={handleFieldChange}
                    type="datetime-local"
                    variant="outlined"
                />
                <TextField
                    className={classes.field}
                    defaultValue={moment(values.end).format('YYYY-MM-DDThh:mm:ss')}
                    disabled={values.allDay}
                    style={{ width: '35%', marginRight: 10 }}
                    margin="normal"
                    label="End date"
                    name="end"
                    onChange={handleFieldChange}
                    type="datetime-local"
                    variant="outlined"
                />
                <TextField
                    className={classes.field}
                    label="Task Duration (days)"
                    name="dur"
                    style={{ width: '25%', float: 'right' }}
                    margin="normal"
                    onChange={handleFieldChange}
                    value={moment(values.end).diff(moment(values.start), 'days')}
                    multiline
                    variant="filled"
                />
                <TextField
                    className={classes.field}
                    style={{ width: '70%', marginRight: 25 }}
                    label="Add Tags"
                    name="Add Tags"
                    defaultValue="Enter tag"
                    variant="outlined"
                    fullWidth
                />
                <Button
                    className={classes.field}
                    style={{ width: '20%' }}
                    margin="normal"
                    variant="contained"
                    onClick={handleAddChip(values)}
                >
                    + Add
                </Button>
                <div style={{ marginBottom: 20 }}>{chips}</div>
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

