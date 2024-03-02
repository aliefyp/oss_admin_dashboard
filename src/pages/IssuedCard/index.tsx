import PageHeading from "components/PageHeading";
import ServiceCard from "./components/ServiceCard";
import services from "constants/services";
import { useTranslation } from "react-i18next";

const IssuedCard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeading title={t('page_issued_card.title')} />
      <div className="grid grid-cols-4 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} count={5} />
        ))}
      </div>
    </div>
  );
}

export default IssuedCard;