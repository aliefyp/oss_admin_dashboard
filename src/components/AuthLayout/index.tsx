import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import LanguageSelector from 'components/LanguageSelector';
import Footer from './Footer';
import { AUTH_BANNER, MAIN_LOGO } from "constants/assets";

interface Props {
  language: string;
  onLanguageChange: (language: string) => void;
}

const AuthLayout = ({ language, onLanguageChange }: Props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = location.pathname !== '/login';

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="grow items-stretch grid grid-cols-1 lg:grid-cols-2 overflow-auto">
        <img
          src={AUTH_BANNER}
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
                <img width={80} src={MAIN_LOGO} alt="Balkaun Uniku" className="rounded-lg" />
              </a>
              <LanguageSelector language={language} onLanguageChange={onLanguageChange} />
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
