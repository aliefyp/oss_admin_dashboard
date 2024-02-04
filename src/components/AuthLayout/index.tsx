import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Footer from './Footer';

const AuthLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const showBackButton = pathname !== '/login';

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 grow">
        <img className='w-full h-full object-cover hidden lg:block' src='http://placehold.it/1000x1000' alt='Login' />
        <div className='flex flex-col'>
          <AppBar
            position="static"
            color="primary"
            className="!bg-gray-800"
          >
            <Toolbar>
              <a href="/">
                <img src="/logo_main.png" alt="Balkaun Uniku" />
              </a>
            </Toolbar>
          </AppBar>
          {showBackButton && (
            <div className='p-4 flex gap-2 items-center hover:underline'>
              <ArrowBackOutlinedIcon />
              <Typography variant="h6" noWrap component="div">
                {t('auth.back')}
              </Typography>
            </div>
          )}
          <div className='grow flex justify-center items-center h-full p-3'>
            <Outlet />
          </div>
        </div>
      </div>
      <div className='col-span-12'>
        <Footer />
      </div>
    </div>
  )
}

export default AuthLayout;
