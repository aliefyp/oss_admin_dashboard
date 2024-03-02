import { Chip, Typography } from "@mui/material";
import PageHeading from "components/PageHeading";
import IssuedCardListFilter from "./components/IssuedCardListFilter";
import IssuedCardListTable from "./components/IssuedCardListTable";
import { useNavigate, useParams } from "react-router-dom";
import services from "constants/services";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const IssuedCardList: React.FC = () => {
  const { issued_card_id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const serviceData = services.find((service) => service.id === issued_card_id);
  
  useEffect(() => {
    if (!serviceData) {
      navigate(-1);
    }
  }, [navigate, serviceData])

  return (
    <>
      <PageHeading
        withBackButton
        title={`${t('page_issued_card_list.title')}: ${serviceData.name}`}
      />
      <div className="space-y-4">
        <div className="mb-6 space-y-3">
          <IssuedCardListFilter />
          <div className="flex items-center gap-3">
            <Typography variant="caption" className="text-gray-600 block">
              <span dangerouslySetInnerHTML={{ __html: t('page_issued_card_list.total_issued', { count: 2000 })}} />
            </Typography>
            <div className="flex items-center gap-2">
              <Typography variant="body2" className="!font-bold text-red-500">
                {t('page_issued_card_list.reset_filter')}
              </Typography>
              <Chip label="Service" size="small" variant="outlined" onDelete={() => {}} />
            </div>
          </div>
        </div>
        <div>
          <IssuedCardListTable />
        </div>
      </div>
    </>
  );
}

export default IssuedCardList;