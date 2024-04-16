import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  status: string;
}

const AppointmentStatus = ({ status }: Props) => {
  const { t } = useTranslation();

  let current = null;

  switch (status.toLowerCase()) {
    case 'completed':
      current = <Chip label={t('appointment_status.completed')} size="small" className="!text-purple-600 !bg-purple-200 !rounded-md min-w-[100px]" />;
      break;
    case 'unstarted':
      current = <Chip label={t('appointment_status.unstarted')} size="small" className="!text-yellow-600 !bg-yellow-200 !rounded-md min-w-[100px]" />;
      break;
    case 'absent':
      current = <Chip label={t('appointment_status.absent')} size="small" className="!text-red-600 !bg-red-200 !rounded-md min-w-[100px]" />;
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