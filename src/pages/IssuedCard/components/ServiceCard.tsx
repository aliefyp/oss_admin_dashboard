import { HiArrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material"
import { useIssuedCardsTotal } from "api/issued-cards";

interface ServiceCardProps {
  id: number;
  icon: string;
  name: string;
}

const ServiceCard = ({ id, icon, name }: ServiceCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const total = useIssuedCardsTotal(Number(id));
  const count = total?.data?.data;

  return (
    <div
      className="group border rounded-xl p-4 cursor-pointer hover:border-gray-500 duration-200 ease-out"
      onClick={() => navigate(`/issued-card/${id}`)}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="w-[64px] h-[64px] flex items-center justify-center bg-orange-200 rounded-xl">
          {icon ? (
            <img src={icon} alt={name} width={32} height={32} />
          ) : (
            <div className="w-[32px] h-[32px] bg-orange-300 rounded-xl" />
          )}
        </div>
        <HiArrowRight className="text-2xl mr-2 group-hover:translate-x-3 ease-out duration-100" />
      </div>
      <Typography variant="h6">{name}</Typography>
      <Typography className="text-red-500">
        {t('page_issued_card.card_count', { count })}
      </Typography>
    </div>
  );
}

export default ServiceCard;
