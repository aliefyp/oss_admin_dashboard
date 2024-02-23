import { IconButton, Typography } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import type { Props } from './types';

const PageHeading = ({ children, title, withBackButton = false, onBack }: Props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    navigate(-1);
  }

  return (
    <div className="flex items-center gap-3 justify-between mb-6 min-h-[40px]">
      {withBackButton && (
        <IconButton onClick={handleBack} className="hover:-translate-x-1 duration-100 ease-out">
          <FaArrowLeft className='text-lg text-black' />
        </IconButton>
      )}
      <Typography variant="h5" component="h1" className="grow">{title}</Typography>
      {children}
    </div>
  )
}

export default PageHeading;