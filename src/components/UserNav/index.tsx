import { useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, IconButton, ListItemIcon, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HiLogout } from 'react-icons/hi';
import { Response } from 'types/auth/login';
import { useTranslation } from 'react-i18next';
import { ROLE_STRING } from 'constants/role';

const UserNav = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const auth = useAuthUser() as Response['data'];

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
        <Avatar
          alt="Username"
          variant="rounded"
          sx={{ width: 32, height: 32 }}
        >
          {auth?.email[0]?.toUpperCase()}
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
        <div className='flex flex-col border-b px-4 pb-2 mb-2 min-w-[200px]'>
          <Typography variant="h6">
            {auth?.email}
          </Typography>
          <Typography variant="caption" className='text-gray-600'>
            {ROLE_STRING[auth?.roleId]}
          </Typography>
        </div>
        <MenuItem onClick={() => navigate('/logout')}>
          <ListItemIcon>
            <HiLogout />
          </ListItemIcon>
          <Typography>{t('header.logout')}</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserNav;
