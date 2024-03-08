import { useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

interface ResetPasswordForm {
  password: string;
  confirm_password: string;
}

const ResetPassword = () => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [valid, setValid] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false
  });

  const { register, watch, formState: { errors }, handleSubmit } = useForm<ResetPasswordForm>({
    defaultValues: {
      password: '',
      confirm_password: '',
    }
  })

  const typedPassword = watch('password');

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show)
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const isDisabled = !valid.uppercase || !valid.lowercase || !valid.number || !valid.specialCharacter;

  const submitForm = (val: ResetPasswordForm) => {
    const { password, confirm_password } = val;
    console.log({ password, confirm_password });
  }

  useEffect(() => {
    setValid({
      uppercase: /[A-Z]/.test(typedPassword),
      lowercase: /[a-z]/.test(typedPassword),
      number: /[0-9]/.test(typedPassword),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(typedPassword)
    })
  }, [typedPassword])

  return (
    <div className='space-y-4'>
      <Typography variant="h2" noWrap component="div" className='text-center'>
        {t('reset_password.title')}
      </Typography>
      <form autoComplete='off' noValidate onSubmit={handleSubmit(submitForm)}>
        <FormControl sx={{ my: 2, width: '100%' }} variant="outlined" required>
          <InputLabel htmlFor="password" variant='outlined'>{t('reset_password.label_password')}</InputLabel>
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
                message: t('reset_password.error_password_required'),
              },
              minLength: {
                value: 6,
                message: t('reset_password.error_password_min')
              }
            })}
          />
          {errors.password && (
            <FormHelperText error={Boolean(errors.password)}  id="password-helper-text">
              {errors.password.message || ''}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl sx={{ my: 2, width: '100%' }} variant="outlined" required>
          <InputLabel htmlFor="confirm_password" variant='outlined'>{t('reset_password.label_confirm_password')}</InputLabel>
          <Input
            id="confirm_password"
            name="confirm_password"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete='false'
            aria-describedby='confirm-password-helper-text'
            error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            {...register('confirm_password', {
              required: {
                value: true,
                message: t('reset_password.error_confirm_password_required'),
              },
              minLength: {
                value: 6,
                message: t('reset_password.error_confirm_password_min')
              }
            })}
          />
          {errors.confirm_password && (
            <FormHelperText error={Boolean(errors.confirm_password)}  id="confirm-password-helper-text">
              {errors.confirm_password.message || ''}
            </FormHelperText>
          )}
        </FormControl>
        <div className='grid grid-cols-2 gap-4 py-6'>
          <div className="col-span-2">
            <Typography className="text-gray-500">{t('reset_password.validation.title')}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className={valid.uppercase ? "text-blue-950" : "text-gray-400"} />
            <Typography className="text-gray-500">{t('reset_password.validation.uppercase')}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className={valid.number ? "text-blue-950" : "text-gray-400"} />
            <Typography className="text-gray-500">{t('reset_password.validation.number')}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className={valid.lowercase ? "text-blue-950" : "text-gray-400"} />
            <Typography className="text-gray-500">{t('reset_password.validation.lowercase')}</Typography>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className={valid.specialCharacter ? "text-blue-950" : "text-gray-400"} />
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
