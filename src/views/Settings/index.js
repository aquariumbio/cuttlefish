import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, Card } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#FFFFFF",
        userSelect: 'none',
        whiteSpace: 'normal',
        height: '100%',
        display: 'inline-flex',
        flexDirection: 'column',
        verticalAlign: 'top',
        width: '100%',
        margin: theme.spacing(0, 1),
        [theme.breakpoints.down('xs')]: {
            width: 300
        }
    },
    header: {
        margin: theme.spacing(3),
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        width: 180,
        margin: theme.spacing(3),
        marginTop: 0
    }
}));

function Settings(props) {
    const classes = useStyles();
    const session = useSelector(state => state.session);

    return (
        <Page title={"Settings"}>
                <Typography
                    variant="h3"
                >
                    Owner: {session.currentProject.owner}
                </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        endIcon={<ArrowForwardIosIcon />}
                    >
                    </Button>
        </Page>
    );
}

export default Settings;
