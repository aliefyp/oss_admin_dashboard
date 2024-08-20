import { ArrowDropDownOutlined } from "@mui/icons-material";
import { Button, Chip, CircularProgress, Menu, MenuItem, Typography } from "@mui/material";
import { useUpdateDeliveryStatus } from "api/issued-cards";
import { ISSUED_CARD_STATUS_COLOR } from "constants/appointment";
import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useTranslation } from "react-i18next";
import { UserData } from "types/auth/user";
import useRoleGroup from "usecase/useRoleGroup";
import useToaster from "usecase/useToaster";

interface Props {
  applicationId: number;
  status: string;
  refetch: () => void;
}

// TOOD: remove hardcoded status
const IssuedCardStatus = ({ applicationId, status = 'waiting', refetch }: Props) => {
  const { t } = useTranslation();
  const toaster = useToaster();
  const auth = useAuthUser<UserData>()
  const { isBoGroup } = useRoleGroup(auth?.roleGroup || '');
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);

  const updateDeliverStatus = useUpdateDeliveryStatus({ applicationId });

  const STATUS_OPTIONS = [
    { key: 'pickup', value: true, label: 'Received by Owner' },
    { key: 'delivery', value: false, label: 'Send for Delivery' },
  ];

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeliverStatus = async (isPickup: boolean) => {
    try {
      handleClose();
      setLoading(true);

      const res = await updateDeliverStatus({ isPickup });
      if (!res) throw new Error('Failed to update status');

      refetch();
    } catch (err) {
      console.error(err);
      toaster.open(err.message)
    } finally {
      setLoading(false);
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'start-popover' : undefined;
  const color = ISSUED_CARD_STATUS_COLOR[status];

  const label = <Chip label={t(`page_issued_card_list.status.${status}`)} size="small" className={`!text-${color}-600 !bg-${color}-200 !rounded-md min-w-[120px]`} />

  return (
    <div onClick={e => e.stopPropagation()}>
      {(status === 'waiting' && isBoGroup) ? (
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
            {STATUS_OPTIONS.map((s) => (
              <MenuItem key={s.key} onClick={() => handleDeliverStatus(s.value)}>
                <Typography variant="body1">{t(`page_issued_card_list.status.${s.key}`)}</Typography>
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

export default IssuedCardStatus;