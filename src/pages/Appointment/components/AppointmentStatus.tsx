import { ArrowDropDownOutlined } from "@mui/icons-material";
import { Button, Chip, CircularProgress, Menu, MenuItem, Typography } from "@mui/material";
import { useUpdateAppoinment } from "api/appointment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useToaster from "usecase/useToaster";

const STATUS = ['Completed', 'UnStarted', 'Absent'];

const AppointmentStatus = ({ appointmentId, status }) => {
  let current = null;
  const { t } = useTranslation();
  const toaster = useToaster();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [currentStatus, setCurrentStatus] = useState(status);

  const updateStatus = useUpdateAppoinment({ appointmentId })

  switch (currentStatus.toLowerCase()) {
    case 'completed':
      current = <Chip label="Completed" size="small" className="!text-purple-600 !bg-purple-200 !rounded-md min-w-[100px]" />;
      break;
    case 'unstarted':
      current = <Chip label="UnStarted" size="small" className="!text-yellow-600 !bg-yellow-200 !rounded-md min-w-[100px]" />;
      break;
    case 'absent':
      current = <Chip label="Absent" size="small" className="!text-red-600 !bg-red-200 !rounded-md min-w-[100px]" />;
      break;
    default:
      break;
  }

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusClick = (status: string) => {
    handleClose();

    updateStatus.mutateAsync({ status }).then(res => {
      if (res.data || res.success) {
        setCurrentStatus(status);
      } else {
        throw new Error('Failed to update status');
      }
    }).catch(err => {
      console.error(err);
      toaster.open(err.message)
    });
  }

  const open = Boolean(anchorEl);
  const id = open ? 'start-popover' : undefined;

  return (
    <>
      <Button
        component="div"
        variant="text"
        size="small"
        endIcon={updateStatus.isLoading ? <CircularProgress size={12} /> : <ArrowDropDownOutlined />}
        onClick={handleOpen}
      >
        {current}
      </Button>
      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {STATUS.filter(s => s !== currentStatus).map((s) => (
          <MenuItem key={s} onClick={() => handleStatusClick(s)}>
            <Typography variant="body1">{t(`page_appointment.status.${s.toLowerCase()}`)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default AppointmentStatus;