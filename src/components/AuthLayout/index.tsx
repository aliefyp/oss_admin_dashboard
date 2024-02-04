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
      <div className="grid grid-cols-1 lg:grid-cols-2 grow">
        <img className='w-full h-full object-cover hidden lg:block' src='http://placehold.it/1000x1000' alt='Login' />
        <div className='flex flex-col'>
          <AppBar
            position="static"
            color="primary"
            className="!bg-gray-800"
          >
            <Toolbar>
              <div className="grow">
                <a href="/" className="block">
                  <img src="/logo_main.png" alt="Balkaun Uniku" />
                </a>
              </div>
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
      <div className='col-span-12'>
        <Footer />
      </div>
    </div>
  )
}

export default AuthLayout;
