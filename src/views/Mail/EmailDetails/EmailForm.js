import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Paper,
  Button,
  IconButton,
  Tooltip
} from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  textArea: {
    ...theme.typography.body1,
    border: 'none',
    outline: 'none',
    resize: 'none',
    width: '100%'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  sendButton: {
    marginRight: theme.spacing(2)
  },
  fileInput: {
    display: 'none'
  }
}));

function EmailForm({ className, ...rest }) {
  const classes = useStyles();
  const fileInputRef = useRef(null);
  const [value, setValue] = useState('');
  const sender = {
    avatar: '/images/avatars/avatar_11.png'
  };

  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  };

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        src={sender.avatar}
      />
      <Paper
        className={classes.paper}
        elevation={1}
      >
        <TextareaAutosize
          className={classes.textArea}
          onChange={handleChange}
          placeholder="Leave a message"
          rows={6}
          value={value}
        />
        <div className={classes.actions}>
          <Button
            className={classes.sendButton}
            color="primary"
            variant="contained"
          >
            Send
          </Button>
          <Tooltip title="Attach image">
            <IconButton onClick={handleAttach}>
              <AddPhotoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Attach file">
            <IconButton onClick={handleAttach}>
              <AttachFileIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
      />
    </div>
  );
}

EmailForm.propTypes = {
  className: PropTypes.string
};

export default EmailForm;
