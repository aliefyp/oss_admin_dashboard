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
  FormHelperText
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLogin } from 'api/auth';
import { useNavigate, useLocation } from 'react-router';
import PageLoader from 'components/PageLoader';
import { useForm } from 'react-hook-form';
import useToaster from 'usecase/useToaster';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation();
  const login = useLogin();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const location = useLocation();
  const toaster = useToaster();
  const from = new URLSearchParams(location.search).get('from') || '/';

  const [showPassword, setShowPassword] = useState(false);

  const { register, formState: { errors }, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const submitForm = useCallback((val: LoginForm) => {
    const { email, password } = val;
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
        console.error(error);
        toaster.open(error.message);
      })
  }, [from, login, navigate, signIn, toaster]);

  return (
    <>
      {login.isLoading && (
        <PageLoader />
      )}
      <div className='space-y-4'>
        <Typography variant="h2" noWrap component="div" className='text-center'>
          {t('login.title')}
        </Typography>
        <Typography paragraph className='text-center text-gray-500'>
          {t('login.subtitle')}
        </Typography>
        <form autoComplete='off' noValidate onSubmit={handleSubmit(submitForm)} className="space-y-4">
          <FormControl sx={{ my: 2, width: '100%' }} variant="outlined" required>
            <InputLabel htmlFor="email" variant='outlined'>{t('login.label_email')}</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete='false'
              aria-describedby='email-helper-text'
              error={!!errors.email}
              {...register('email', {
                required: {
                  value: true,
                  message: t('login.error_email_required'),
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: t('login.error_email_invalid')
                }
              })}
            />
            {errors.email && (
              <FormHelperText error={Boolean(errors.email)} id="email-helper-text">
                {errors.email.message || ''}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ my: 2, width: '100%' }} variant="outlined" required>
            <InputLabel htmlFor="password" variant='outlined'>{t('login.label_password')}</InputLabel>
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete='false'
              aria-describedby='password-helper-text'
              error={!!errors.password}
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
              {...register('password', {
                required: {
                  value: true,
                  message: t('login.error_password_required'),
                },
                minLength: {
                  value: 8,
                  message: t('login.error_password_min', { count: 8 })
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message: t('login.error_password_invalid')
                }
              })}
            />
            {errors.password && (
              <FormHelperText error={Boolean(errors.password)} id="password-helper-text">
                {errors.password.message || ''}
              </FormHelperText>
            )}
          </FormControl>
          <div className="space-y-4 mt-4">
            <Button type="submit" size="large" variant="contained" className="w-full">
              <span className="py-2">
                {t('login.cta_submit')}
              </span>
            </Button>
            <Link href="/forgot-password" className='text-center block'>
              {t('login.cta_forgot')}
            </Link>

          </div>
        </form>
      </div>
    </>
  )
}

export default Login;
