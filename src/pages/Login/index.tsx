import { useState } from 'react';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    console.log({ email, password });
  }

  return (
    <div className='space-y-4'>
      <Typography variant="h4" noWrap component="div" className='text-center'>
        {t('login.title')}
      </Typography>
      <Typography paragraph className='text-center text-gray-500'>
        {t('login.subtitle')}
      </Typography>
      <form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <FormControl sx={{ my: 2, width: '100%' }} variant="outlined" required>
          <InputLabel htmlFor="email" variant='outlined'>{t('login.label_email')}</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
          />
        </FormControl>
        <FormControl sx={{ my: 2, width: '100%' }} variant="outlined" required>
          <InputLabel htmlFor="password" variant='outlined'>{t('login.label_password')}</InputLabel>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
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
  )
}

export default Login;
