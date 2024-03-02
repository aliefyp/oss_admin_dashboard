import { Typography } from "@mui/material";
import RegisteredCitizens from "./components/RegisteredCitizens";
import TypeRegistered from "./components/TypeRegistered";
import ByGender from "./components/ByGender";
import ByAge from "./components/ByAge";
import ServiceDistributed from "./components/ServiceDistributed";
import Filter from "./components/Filter";
import PageHeading from "components/PageHeading";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

const Overview: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeading title={t("page_overview.title")}>
        <Typography variant="caption" className="text-gray-600">
          {t('page_overview.latest_update')} <span className="text-gray-800">{dayjs().format("dddd, DD MMMM YYYY - HH:mm")}</span>
        </Typography>
      </PageHeading>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 mb-4 space-y-3">
          <Filter />
          <Typography variant="caption" className="text-gray-600 block">
            <span dangerouslySetInnerHTML={{ __html: t('page_overview.total_registered', { count: 2000 })}} />
          </Typography>
        </div>
        <div className="col-span-8 space-y-4">
          <RegisteredCitizens />
          <div className="grid grid-cols-2 gap-4">
            <ByGender />
            <ByAge />
          </div>
        </div>
        <div className="col-span-4 space-y-4">
          <TypeRegistered />
          <ServiceDistributed />
        </div>
      </div>
    </>
  );
}

export default Overview;