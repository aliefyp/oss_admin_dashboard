import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Typography } from '@mui/material';

const DUMMY_NOTIFICATIONS = [
  'Test Notif A',
  'Test Notif B',
]

const Notification = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="language-selector"
        aria-controls={open ? 'language-selector' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!text-white"
      >
        <img src="/icon_notification.svg" alt="Notification" />
      </IconButton>
      <Menu
        id="language-selector"
        aria-labelledby="language-selector"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {DUMMY_NOTIFICATIONS.map((notif) => (
          <MenuItem key={notif} onClick={() => {}}>
            <Typography>{notif}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Notification;
