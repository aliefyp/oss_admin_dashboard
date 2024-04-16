import * as React from 'react';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ListItemIcon, Typography } from '@mui/material';
import { HiCheck } from 'react-icons/hi';

const LaguageSelector = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { i18n } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
    window.location.reload();
  }

  const locales = [
    { code: 'te', name: 'Tetum' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Portugese' },
  ]

  return (
    <div>
      <Button
        id="language-selector"
        variant="text"
        aria-controls={open ? 'language-selector' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!text-white"
        endIcon={<KeyboardArrowDownIcon />}
      >
        {i18n.resolvedLanguage?.toUpperCase()}
      </Button>
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
        {locales.map((loc) => (
          <MenuItem key={loc.code} onClick={() => handleChangeLanguage(loc.code)}>
            <ListItemIcon>
              {i18n.resolvedLanguage === loc.code && <HiCheck className='text-green-500 font-bold' />}
            </ListItemIcon>
            <Typography>{loc.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default LaguageSelector;
