import { CircularProgress, Typography } from "@mui/material";
import EmptyState from "components/EmptyState";
import { SERVICE_ICONS } from "constants/services";
import { useTranslation } from "react-i18next";
import { Response } from "types/dashboard/dashboard";

interface Props {
  data: Response['data']['totalApplicationByServiceTypes'];
  loading: boolean;
}

const ServiceDistributed = ({ data, loading }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="border rounded-lg py-4 px-3">
      <Typography variant="h6" className="font-sm">
        {t('page_overview.section_service_distributed.title')}
      </Typography>
      {loading && (
        <div className="flex w-[100%] h-[300px] justify-center items-center">
          <CircularProgress />
        </div>
      )}
      {data?.length === 0 && !loading && (
        <EmptyState title="No data">
          No data available
        </EmptyState>
      )}
      {data && (
        <div className="flex flex-col mt-4">
          {data.map(service => (
            <div key={service.serviceType} className="flex gap-2 items-center w-full border-b py-2 last:border-none">
              <div className="w-[24px] h-[24px] rounded-md bg-orange-200 flex items-center justify-center">
                <img src={SERVICE_ICONS[service.serviceType]} alt={service.serviceType} width={12} height={12} />
              </div>
              <Typography className="grow">{t(`services.${service.serviceType}`)}</Typography>
              <Typography className="!font-bold">{service.total}</Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServiceDistributed;