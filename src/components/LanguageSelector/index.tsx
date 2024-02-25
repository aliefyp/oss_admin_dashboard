import * as React from 'react';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
  }

  const locales = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Portugese' },
  ]

  return (
    <div>
      <Button
        id="demo-positioned-button"
        variant="text"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!text-white"
        endIcon={<KeyboardArrowDownIcon />}
      >
        {i18n.resolvedLanguage?.toUpperCase()}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
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
          <MenuItem key={loc.code} onClick={() => handleChangeLanguage(loc.code)}>{loc.name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default LaguageSelector;
