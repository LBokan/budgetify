import React from 'react';
import { ListItemText, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

export const LogsInfoMenu = ({ anchorEl, open, handleClose, logsData }) => {
  return (
    <Menu
      id="logs-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'logs-button'
      }}
    >
      {!!logsData?.issues.length &&
        logsData.issues.map((log) => (
          <MenuItem key={log.name} onClick={handleClose}>
            <ListItemText>{`${log.name} (${log.count})`}</ListItemText>
          </MenuItem>
        ))}
    </Menu>
  );
};

LogsInfoMenu.propTypes = {
  anchorEl: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  logsData: PropTypes.object.isRequired
};
