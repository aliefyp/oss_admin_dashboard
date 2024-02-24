import Typography from '@mui/material/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

const Footer = () => {
  // TODO: Change the content of the footer

  return (
    <div className="bg-gray-800 p-4 text-white min-h-[52px]">
      <div className='w-full max-w-screen-lg mx-auto flex flex-wrap gap-2 justify-between'>

        <Typography component="div" fontSize="small">
          {`© ${new Date().getFullYear()} Balkaun Uniku. All rights reserved.`}
        </Typography>

        <div className='flex space-x-4'>
          <a href="/" className="flex items-center space-x-2">
            <PhoneOutlinedIcon fontSize="small" />
            <Typography component="div" fontSize="small">
              +670-333-4343
            </Typography>
          </a>
          <a href="/" className="flex items-center space-x-2">
            <MailOutlineIcon fontSize="small" />
            <Typography component="div" fontSize="small">
              info@yoursite.com
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