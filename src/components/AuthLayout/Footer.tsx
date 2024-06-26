import Typography from '@mui/material/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { PHONE, EMAIL } from 'constants/contacts';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#2E2D2D] p-4 text-white min-h-[52px]">
      <div className='w-full max-w-screen-lg mx-auto flex flex-wrap gap-2 justify-between'>

        <Typography component="div" fontSize="small">
          {`© ${new Date().getFullYear()} Balkaun Uniku. ${t('footer.rights')}.`}
        </Typography>

        <div className='flex space-x-4'>
          <a href={`tel:${PHONE}`} className="flex items-center space-x-2">
            <PhoneOutlinedIcon fontSize="small" />
            <Typography component="div" fontSize="small">
              {PHONE}
            </Typography>
          </a>
          <a href={`mailto:${EMAIL}`} className="flex items-center space-x-2">
            <MailOutlineIcon fontSize="small" />
            <Typography component="div" fontSize="small">
              {EMAIL}
            </Typography>
          </a>
          <a href="/" className="flex items-center space-x-2">
            <Typography component="div" fontSize="small">
              FAQ
            </Typography>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;