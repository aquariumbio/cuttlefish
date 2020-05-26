import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Typography,
    Dialog,
    TextField,
    Button,
    Divider,
    Grid,
    IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%'
    },
    field: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
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
        marginLeft: theme.spacing(15)
    }
}));

const CustomTypography = withStyles(theme => ({
    h3: {
        color: '#05486E'
    }
}))(Typography);

const AddTaskDialog = forwardRef((props) => {
    const {
        show,
        setShow
    } = props;
    const classes = useStyles();

    const handleClose = () => {
        setShow(false)
    }

    return (
        <div>
            <Dialog
                className={classes.root}
                open={show}
                onClose={handleClose}
            >
                <DialogTitle id="form-dialog-title">
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
                                Create Card
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
                        label="Task Name"
                        name="Task Name"
                        defaultValue="Enter your task name"
                        variant="outlined"
                        fullWidth
                    />
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
        </div>
    );
});

export default AddTaskDialog

