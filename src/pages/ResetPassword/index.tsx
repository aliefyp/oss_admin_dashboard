import { useState } from 'react';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ResetPassword = () => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setValidation({
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    })
  }

  const isDisabled = !validation.uppercase || !validation.lowercase || !validation.number || !validation.specialCharacter;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    console.log({ email, password });
  }

  return (
    <div className='space-y-4'>
      <Typography variant="h2" noWrap component="div" className='text-center'>
        {t('reset_password.title')}
      </Typography>
      <form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <FormControl sx={{ my: 2, width: '100%' }} variant="outlined" required>
          <InputLabel htmlFor="password" variant='outlined'>{t('reset_password.label_password')}</InputLabel>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            onChange={handlePasswordChange}
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
        <FormControl sx={{ my: 2, width: '100%' }} variant="outlined" required>
          <InputLabel htmlFor="confirm_password" variant='outlined'>{t('reset_password.label_confirm_password')}</InputLabel>
          <Input
            id="confirm_password"
            name="confirm_password"
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
        <div className='grid grid-cols-2 gap-4 py-6'>
          <div className="col-span-2">
            <Typography className="text-gray-500">{t('reset_password.validation.title')}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className={validation.uppercase ? "text-blue-950" : "text-gray-400"} />
            <Typography className="text-gray-500">{t('reset_password.validation.uppercase')}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className={validation.number ? "text-blue-950" : "text-gray-400"} />
            <Typography className="text-gray-500">{t('reset_password.validation.number')}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className={validation.lowercase ? "text-blue-950" : "text-gray-400"} />
            <Typography className="text-gray-500">{t('reset_password.validation.lowercase')}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className={validation.specialCharacter ? "text-blue-950" : "text-gray-400"} />
            <Typography className="text-gray-500">{t('reset_password.validation.special_character')}</Typography>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          <Button
            disabled={isDisabled}
            type="submit"
            size="large"
            variant="contained"
            className="w-full">
            <span className="py-2">
              {t('reset_password.cta_submit')}
            </span>
          </Button>

        </div>
      </form>

    </div>
  )
}

export default ResetPassword;
