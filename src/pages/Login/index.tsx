import { useCallback, useState } from 'react';
import { useTranslation } from "react-i18next";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  Typography,
  TextField
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
        console.log(res)
        if (res.errorMessage) {
          throw new Error(res.errorMessage)
        }

        const roleId = res.data.roleId;
        const isEligible = roleId !== 0;

        if (!isEligible) {
          throw new Error(t('login.error_not_eligible'))
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
            roleName: res.data.roleName,
            roleGroup: res.data.roleGroup,
            regions: res.data.regions,
            serviceTypes: res.data.serviceTypes || [],
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
  }, [from, login, navigate, signIn, toaster, t]);

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
          <TextField
            fullWidth
            required
            variant="standard"
            label={t('login.label_email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ my: 2 }}
            {...register('email', {
              required: t('login.error_email_required'),
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: t('login.error_email_invalid')
              }
            })}
          />
          <TextField
            fullWidth
            required
            variant="standard"
            label={t('login.label_password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ my: 2 }}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
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
              )
            }}
            {...register('password', {
              required: t('login.error_password_required'),
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
