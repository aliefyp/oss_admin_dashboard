import { useRef, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const interval = useRef(null);

  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    console.log({ email });

    setCodeSent(true);
    interval.current = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000)
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
    <div className='space-y-4'>
      <Typography variant="h2" noWrap component="div" className='text-center'>
        {t('forgot_password.title')}
      </Typography>
      <Typography paragraph className='text-center text-gray-500'>
        {t('forgot_password.subtitle')}
      </Typography>
      <form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <FormControl sx={{ my: 2, width: '100%' }} variant="outlined" required>
          <InputLabel htmlFor="email" variant='outlined'>{t('forgot_password.label_email')}</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
          />
        </FormControl>
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
  )
}

export default ForgotPassword;
