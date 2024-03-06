import { Button, Chip, Typography } from "@mui/material";
import useGroupFilter from "usecase/useGroupFilter";
import RegisteredCitizens from "./components/RegisteredCitizens";
import TypeRegistered from "./components/TypeRegistered";
import ByGender from "./components/ByGender";
import ByAge from "./components/ByAge";
import ServiceDistributed from "./components/ServiceDistributed";
import Filter from "./components/Filter";
import PageHeading from "components/PageHeading";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { DUMMY_SERVICES, DUMMY_REGION, DUMMY_GENDER, DUMMY_YEAR } from "./constants";

const Overview: React.FC = () => {
  const { t } = useTranslation();

  const { filter, filterOptions, handleFilterChange, handleFilterClear, handleFilterRemove } = useGroupFilter({
    groups: [
      { groupId: 'service', groupLabel: 'Service', items: DUMMY_SERVICES },
      { groupId: 'region', groupLabel: 'Region', items: DUMMY_REGION },
      { groupId: 'gender', groupLabel: 'Gender', items: DUMMY_GENDER },
      { groupId: 'year', groupLabel: 'Year', items: DUMMY_YEAR },
    ],
    defaultValue: "0",
  })

  const filterKeys = Object.keys(filter).filter(key => filter[key] !== "0");
  const hasFilter = filterKeys.length > 0;

  return (
    <>
      <PageHeading title={t("page_overview.title")}>
        <Typography variant="caption" className="text-gray-600">
          {t('page_overview.latest_update')} <span className="text-gray-800">{dayjs().format("dddd, DD MMMM YYYY - HH:mm")}</span>
        </Typography>
      </PageHeading>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 mb-4 space-y-3">
          <Filter
            filter={filter}
            filterOptions={filterOptions}
            handleFilterChange={handleFilterChange}
          />
          <div className="flex items-center gap-2">
            <Typography variant="caption" className="text-gray-600 block">
              <span dangerouslySetInnerHTML={{ __html: t('page_overview.total_registered', { count: 2000 })}} />
            </Typography>
            {hasFilter && (
              <div className="flex items-center gap-2">
                <Button variant="text" size="small" color="error" onClick={handleFilterClear}>
                  {t('page_overview.reset_filter')}
                </Button>
                {filterKeys.map((key) => {
                  const filterObj = filterOptions.find((option) => option.groupId === key);
                  return (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={filterObj.groupLabel}
                      onDelete={() => handleFilterRemove(filterObj.groupId)}
                    />
                  )
                })}
              </div>
            )}
          </div>
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