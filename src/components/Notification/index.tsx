import * as React from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const navigate = useNavigate();

  return (
    <div>
      <IconButton
        onClick={() => navigate('/notification')}
        className="!text-white"
      >
        <img src="/icon_notification.svg" alt="Notification" />
      </IconButton>
    </div>
  );
}

export default Notification;
