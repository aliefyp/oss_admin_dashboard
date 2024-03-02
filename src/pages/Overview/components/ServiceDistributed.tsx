import { Typography } from "@mui/material";
import services from "constants/services";
import { useTranslation } from "react-i18next";

const ServiceDistributed = () => {
  const { t } = useTranslation();

  const serviceData = services.map((service) => ({ ...service, count: 5 }));

  return (
    <div className="border rounded-lg py-4 px-3">
      <Typography variant="h6" className="font-sm">
        {t('page_overview.section_service_distributed.title')}
      </Typography>
      <div className="flex flex-col mt-4">
        {serviceData.map(service => (
          <div key={service.id} className="flex gap-2 items-center w-full border-b py-2 last:border-none">
            <div className="w-[24px] h-[24px] rounded-md bg-orange-200 flex items-center justify-center">
              <img src={service.icon} alt={service.name} width={12} height={12} />
            </div>
            <Typography className="grow">{service.name}</Typography>
            <Typography className="!font-bold">{service.count}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceDistributed;