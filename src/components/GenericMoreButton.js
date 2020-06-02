import React, {
  useRef,
  useState,
  memo
} from 'react';
import PropTypes from 'prop-types';
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Modal
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditTaskDialog from '../components/KanbanBoard/EditTaskDialog';
import DeleteTaskDialog from '../components/KanbanBoard/DeleteTaskDialog'

function GenericMoreButton(props) {
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  return (
    <>
      <Tooltip title="More options">
        <IconButton
          {...props}
          onClick={handleMenuOpen}
          ref={moreRef}
          size="small"
        >
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        elevation={1}
        onClose={handleMenuClose}
        open={openMenu}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem>
          <ListItemIcon onClick={handleShowEdit}>
            <EditOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Task" />
          <Modal open={showEdit} onHide={handleCloseEdit} animation={false}>
            <EditTaskDialog show={showEdit} setShow={setShowEdit} />
          </Modal>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FileCopyOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Duplicate Task" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon >
            <DeleteOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Delete Task" />
        </MenuItem>
      </Menu>
    </>
  );
}

GenericMoreButton.propTypes = {
  className: PropTypes.string
};

export default memo(GenericMoreButton);
