import { useRef, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import useToaster from 'usecase/useToaster';
import PageLoader from 'components/PageLoader';
import { useForgetPassword } from 'api/auth';

interface ForgotPasswordForm {
  email: string;
}

const ForgotPassword = () => {
  const { t } = useTranslation();
  const interval = useRef(null);
  const toaster = useToaster();

  const forgotPassword = useForgetPassword()

  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const { register, formState: { errors }, handleSubmit } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: '',
    }
  })

  const submitForm = (val: ForgotPasswordForm) => {
    forgotPassword.mutateAsync(val)
      .then(res => {
        if (res.errorMessage) {
          throw new Error(res.errorMessage)
        }

        toaster.open('Please check your email', {
          isError: false
        });

        setCountdown(30);
        setCodeSent(true);
        interval.current = setInterval(() => {
          setCountdown(prev => prev - 1);
        }, 1000)
      })
      .catch(err => {
        console.error(err);
        toaster.open(err.message);
      })
  }

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(interval.current);
      setCodeSent(false)
    }
  }, [countdown])

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    }
  }, [])


  return (
    <>
      {forgotPassword.isLoading && (
        <PageLoader />
      )}
      <div className='space-y-4'>
        <Typography variant="h2" noWrap component="div" className='text-center'>
          {t('forgot_password.title')}
        </Typography>
        <Typography paragraph className='text-center text-gray-500'>
          {t('forgot_password.subtitle')}
        </Typography>
        <form autoComplete='off' noValidate onSubmit={handleSubmit(submitForm)}>
          <TextField
            fullWidth
            variant="standard"
            sx={{ mb: 2 }}
            label={t('forgot_password.label_email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              required: t('forgot_password.error_email_required'),
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: t('forgot_password.error_email_invalid')
              }
            })}
          />
          {codeSent ? (
            <Typography className='text-center text-gray-500 mt-6'>
              {t('forgot_password.resend_code', { time: countdown })}
            </Typography>
          ) : (
            <div className="space-y-4 mt-4">
              <Button type="submit" size="large" variant="contained" className="w-full">
                <span className="py-2">
                  {t('forgot_password.cta_submit')}
                </span>
              </Button>
            </div>
          )}
        </form>

      </div>
    </>
  )
}

export default ForgotPassword;
