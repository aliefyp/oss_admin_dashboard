import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import LanguageSelector from 'components/LanguageSelector';
import Footer from './Footer';

const AuthLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const showBackButton = pathname !== '/login';

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="grow items-stretch grid grid-cols-1 lg:grid-cols-2">
        <img
          src='/hero_login.jpeg'
          alt='Login'
          className='object-cover hidden lg:block w-full'
          style={{ height: 'calc(100vh - 52px)' }}
        />
        <div className='flex flex-col'>
          <AppBar
            position="static"
            color="primary"
            sx={{
              backgroundColor: "#2E2D2D",
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <a href="/" className="block">
                <img src="/logo_main.png" alt="Balkaun Uniku" />
              </a>
              <LanguageSelector />
            </Toolbar>
          </AppBar>
          {showBackButton && (
            <div className='px-4 pt-6 pb-0 flex gap-2 items-center hover:underline cursor-pointer' onClick={() => navigate(-1)}>
              <ArrowBackOutlinedIcon fontSize="medium" />
              <Typography variant="body1" noWrap component="div" className="!font-bold">
                {t('auth.back')}
              </Typography>
            </div>
          )}
          <div className='grow flex justify-center items-center h-full p-3 max-w-[400px] mx-auto'>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AuthLayout;
