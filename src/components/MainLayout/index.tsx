import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import LanguageSelector from 'components/LanguageSelector';
import { Avatar, IconButton, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { EXTRAS_MENU, MAIN_MENU } from 'constants/sidebar';
import React from 'react';

const drawerWidth = 240;

export default function MainLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (url: string) => {
    if (pathname !== url) {
      navigate(url);
    }
  }

  return (
    <Box sx={{
      display: 'flex', minHeight: '100vh',
      [`& .MuiPaper-root`]: {
        borderBottom: "none"
      },
    }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#2E2D2D",
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img src="/logo_main.png" alt="Balkaun Uniku" />
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <IconButton>
              <img src="/icon_notification.svg" alt="Notification" />
            </IconButton>
            <IconButton>
              <Avatar
                alt="Username"
                variant="rounded"
                sx={{ width: 32, height: 32 }}
              >
                U
              </Avatar>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#2E2D2D",
            color: "#FFFFFF"
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            overflow: 'auto',
            paddingTop: '32px',
          }}
        >
          {[MAIN_MENU, EXTRAS_MENU].map((menu, index) => (
            <React.Fragment key={index}>
              <Typography variant="h6" component="div" sx={{ px: 2, pt: 1 }}>
                {menu.title}
              </Typography>
              <List dense sx={{ [`& .MuiTypography-root`]: { fontSize: '16px' } }}>
                {menu.items.map((item, index) => (
                  <ListItem
                    key={item.text}
                    sx={{
                      [`& .Mui-selected,
                      & .Mui-selected:hover,
                      & .Mui-selected:focus,
                      & .Mui-selected:active`]: {
                        backgroundColor: '#646464',
                      },
                      [`& .MuiButtonBase-root:hover`]: {
                        backgroundColor: '#424242',
                      }
                    }}
                  >
                    <ListItemButton
                      selected={pathname === item.url}
                      onClick={() => handleMenuClick(item.url)}
                    >
                      <ListItemIcon>
                        <item.icon className="text-white text-lg" />
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          ))}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* TODO: change Outlet with AuthOutlet */}
        <Outlet />
        {/* <AuthOutlet fallbackPath='/login' /> */}
      </Box>
    </Box>
  );
}
