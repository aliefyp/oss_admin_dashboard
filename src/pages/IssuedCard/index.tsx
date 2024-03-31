import PageHeading from "components/PageHeading";
import ServiceCard from "./components/ServiceCard";
import { SERVICE_ICONS } from "constants/services";
import { useTranslation } from "react-i18next";
import { useServicesType } from "api/service";
import NotFound from "pages/NotFound";
import PageLoader from "components/PageLoader";

const IssuedCard = () => {
  const { t } = useTranslation();

  const { data: serviceTypes, isFetching, error } = useServicesType();

  const servicesList = serviceTypes?.data?.map((service) => ({
    id: Number(service.code),
    name: t(`services.${service.name}`),
    icon: SERVICE_ICONS[service.name],
  })) || [];

  if (error) {
    return (
      <NotFound />
    )
  }

  return (
    <div>
      <PageHeading title={t('page_issued_card.title')} />
      {isFetching && <PageLoader />}
      {serviceTypes && (
        <div className="grid grid-cols-4 gap-4">
          {servicesList?.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      )}
    </div>
  );
}

export default IssuedCard;