import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, IconButton, ListItemIcon, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HiLogout } from 'react-icons/hi';

const UserNav = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const actions = [
    { label: 'Logout', onClick: () => navigate('/logout') },
  ]

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
        <Avatar
          alt="Username"
          variant="rounded"
          sx={{ width: 32, height: 32 }}
        >
          U
        </Avatar>
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
        {actions.map((action) => (
          <MenuItem key={action.label} onClick={action.onClick}>
            <ListItemIcon>
              <HiLogout />
            </ListItemIcon>
            <Typography>{action.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default UserNav;
