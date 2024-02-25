import { useCallback, useState } from 'react';
import { useTranslation } from "react-i18next";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import {
  Button,
  Input,
  FormControl,
  IconButton,
  InputLabel,
  InputAdornment,
  Link,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLogin } from 'api/auth/login';
import { useNavigate, useLocation } from 'react-router';
import PageLoader from 'components/PageLoader';

const Login = () => {
  const { t } = useTranslation();
  const login = useLogin();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const location = useLocation();
  const from = new URLSearchParams(location.search).get('from') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = useCallback(() => {
    login.mutateAsync({ email, password })
      .then((res) => {
        if (res.errorMessage) {
          throw new Error(res.errorMessage)
        }

        if (signIn({
          auth: {
            token: res.data.accessToken,
            type: 'Bearer',
          },
          refresh: res.data.refreshToken,
          userState: {
            email: res.data.email,
            userId: res.data.userId,
            roleId: res.data.roleId,
          }
        })) {
          navigate(from, { replace: true });
        } else {
          throw new Error(res.errorMessage)
        }
      })
      .catch((error) => {
        setShowAlert(true);
        setAlertMessage(error.message);
      })
  }, [email, from, password, login, navigate, signIn]);

  return (
    <>
      {login.isLoading && (
        <PageLoader />
      )}
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          variant='filled'
          onClose={() => setShowAlert(false)}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <div className='space-y-4'>
        <Typography variant="h2" noWrap component="div" className='text-center'>
          {t('login.title')}
        </Typography>
        <Typography paragraph className='text-center text-gray-500'>
          {t('login.subtitle')}
        </Typography>
        <FormControl sx={{ my: 2, width: '100%' }} variant="outlined" required>
          <InputLabel htmlFor="email" variant='outlined'>{t('login.label_email')}</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ my: 2, width: '100%' }} variant="outlined" required>
          <InputLabel htmlFor="password" variant='outlined'>{t('login.label_password')}</InputLabel>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="space-y-4 mt-4">
          <Button type="button" size="large" variant="contained" className="w-full" onClick={handleSubmit}>
            <span className="py-2">
              {t('login.cta_submit')}
            </span>
          </Button>
          <Link href="/forgot-password" className='text-center block'>
            {t('login.cta_forgot')}
          </Link>

        </div>

      </div>
    </>
  )
}

export default Login;
