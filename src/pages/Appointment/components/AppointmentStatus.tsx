import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  status: string;
}

const AppointmentStatus = ({ status }: Props) => {
  const { t } = useTranslation();

  let current = null;

  switch (status.toLowerCase()) {
    case 'waitingapproval':
      current = <Chip label={t('appointment_status.waitingapproval')} size="small" className="!text-yellow-600 !bg-yellow-200 !rounded-md min-w-[120px]" />;
      break;
    case 'confirm':
      current = <Chip label={t('appointment_status.confirm')} size="small" className="!text-blue-600 !bg-blue-200 !rounded-md min-w-[120px]" />;
      break;
    case 'reject':
      current = <Chip label={t('appointment_status.reject')} size="small" className="!text-orange-600 !bg-orange-200 !rounded-md min-w-[120px]" />;
      break;
    case 'completed':
      current = <Chip label={t('appointment_status.completed')} size="small" className="!text-green-600 !bg-green-200 !rounded-md min-w-[120px]" />;
      break;
    case 'absent':
      current = <Chip label={t('appointment_status.absent')} size="small" className="!text-red-600 !bg-red-200 !rounded-md min-w-[120px]" />;
      break;
    default:
      break;
  }

  return (
    <>
      {current}
    </>
  )
}

export default AppointmentStatus;