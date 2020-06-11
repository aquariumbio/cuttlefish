import React, {
  useRef,
  useState,
  memo
} from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
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

function ListMoreButton(props) {
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  return (
    <>
      <Tooltip title="More Options">
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
          <ListItem onClick={handleShowEdit}>
            <ListItemIcon >
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Rename List" />
          </ListItem>
          <Modal open={showEdit} onHide={handleCloseEdit} animation={false}>
            <EditTaskDialog show={showEdit} setShow={setShowEdit} />
          </Modal>
        </MenuItem>
        <MenuItem>
          <ListItem>
            <ListItemIcon>
              <FileCopyOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Duplicate List" />
          </ListItem>
        </MenuItem>
        <MenuItem>
          <ListItem onClick={handleShowDelete}>
            <ListItemIcon >
              <DeleteOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Delete List" />
          </ListItem>
          <Modal open={showDelete} onHide={handleCloseDelete} animation={false}>
            <DeleteTaskDialog show={showDelete} setShow={setShowDelete} />
          </Modal>
        </MenuItem>
      </Menu>
    </>
  );
}

ListMoreButton.propTypes = {
  className: PropTypes.string
};

export default memo(ListMoreButton);
