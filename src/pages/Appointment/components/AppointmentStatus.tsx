import { ArrowDropDownOutlined } from "@mui/icons-material";
import { Button, Chip, CircularProgress, Menu, MenuItem, Typography } from "@mui/material";
import { useUpdateAppoinment } from "api/appointment";
import { APPOINTMENT_STATUS_COLOR } from "constants/appointment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useToaster from "usecase/useToaster";

interface Props {
  appointmentId: number;
  status: string;
}

const STATUS = ['completed', 'absent'];

const AppointmentStatus = ({ appointmentId, status }: Props) => {
  const { t } = useTranslation();
  const toaster = useToaster();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  const updateStatus = useUpdateAppoinment({ appointmentId })

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusClick = async (newStatus: string) => {
    try {
      handleClose();
      setLoading(true);

      const res = await updateStatus({ status: newStatus });
      if (!res) throw new Error('Failed to update status');

      setCurrentStatus(newStatus);
    } catch (err) {
      console.error(err);
      toaster.open(err.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status !== currentStatus) setCurrentStatus(status);
  }, [currentStatus, status])

  const open = Boolean(anchorEl);
  const id = open ? 'start-popover' : undefined;
  const color = APPOINTMENT_STATUS_COLOR[currentStatus];

  const label = <Chip label={t(`appointment_status.${currentStatus}`)} size="small" className={`!text-${color}-600 !bg-${color}-200 !rounded-md min-w-[120px]`} />

  return (
    <div onClick={e => e.stopPropagation()}>
      {currentStatus === 'confirm' ? (
        <>
          <Button
            component="div"
            variant="text"
            size="small"
            endIcon={loading ? <CircularProgress size={12} /> : <ArrowDropDownOutlined />}
            onClick={handleOpen}
          >
            {label}
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
      ) : (
        <div className="p-1">
          {label}
        </div>
      )}
    </div>
  )
}

export default AppointmentStatus;