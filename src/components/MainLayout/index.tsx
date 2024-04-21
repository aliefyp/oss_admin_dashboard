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
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import LanguageSelector from 'components/LanguageSelector';
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import Notification from 'components/Notification';
import UserNav from 'components/UserNav';
import useSidebarMenu from 'usecase/useSidebarMenu';

const drawerWidth = 240;

interface Props {
  language: string;
  onLanguageChange: (language: string) => void;
}

export default function MainLayout({ language, onLanguageChange }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const from = pathname !== '/'
    ? `?${new URLSearchParams({ from: `${pathname}` }).toString()}`
    : '';

  const sidebarMenu = useSidebarMenu();

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
          <a href="/">
            <img width={80} src="/logo_main.jpeg" alt="Balkaun Uniku" className='rounded-lg' />
          </a>
          <div className="flex items-center gap-2">
            <LanguageSelector language={language} onLanguageChange={onLanguageChange} />
            <Notification />
            <UserNav />
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
          {sidebarMenu.map((menu, index) => (
            <React.Fragment key={index}>
              <Typography variant="h6" component="div" sx={{ px: 2, pt: 1 }}>
                {menu.title}
              </Typography>
              <List dense sx={{ [`& .MuiTypography-root`]: { fontSize: '16px' } }}>
                {menu.items.map((item, index) => (
                  <ListItem
                    key={item.text}
                    sx={{
                      [`.Mui-selected,
                      .Mui-selected:hover,
                      .Mui-selected:focus,
                      .Mui-selected:active`]: {
                        backgroundColor: '#646464 !important',
                      },
                      [`& .MuiButtonBase-root:active,
                      & .MuiButtonBase-root:focus`]: {
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} className=" max-w-screen-2xl min-w-[600px]">
        <Toolbar />
        <AuthOutlet fallbackPath={`/login${from}`} />
      </Box>
    </Box>
  );
}
