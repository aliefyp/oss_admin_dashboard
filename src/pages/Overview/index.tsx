import { Button, Chip, Typography } from "@mui/material";
import useGroupFilter from "usecase/useGroupFilter";
import GroupFilter from "components/GroupFilter";
import RegisteredCitizens from "./components/RegisteredCitizens";
import TypeRegistered from "./components/TypeRegistered";
import ByGender from "./components/ByGender";
import ByAge from "./components/ByAge";
import ServiceDistributed from "./components/ServiceDistributed";
import PageHeading from "components/PageHeading";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useServicesType } from "api/service";
import { useMunicipality } from "api/region";
import useLastNYearList from "usecase/useLastNYearList";
import { GENDER_LIST } from "constants/index";

const Overview: React.FC = () => {
  const { t } = useTranslation();
  const { data: dataServicesType } = useServicesType();
  const { data: dataMunicipality } = useMunicipality({ countryCode: 'TL' });
  const years = useLastNYearList(10);

  const listService = dataServicesType?.data?.map((item) => ({
    itemId: item.code,
    itemLabel: t(`services.${item.name}`),
  })) || [];

  const listMunicipality = dataMunicipality?.data?.map((item) => ({
    itemId: item.code,
    itemLabel: item.name,
  })) || [];

  const listGender = GENDER_LIST.map((item) => ({
    itemId: item.code,
    itemLabel: t(`gender.${item.name}`),
  }));

  const listYear = years.map((item) => ({
    itemId: item,
    itemLabel: item,
  }));

  const {
    filter,
    filterKeys,
    filterOptions,
    hasFilter,
    handleFilterChange,
    handleFilterClear,
    handleFilterRemove
  } = useGroupFilter({
    defaultValue: "0",
    groups: [
      { groupId: 'service', groupLabel: 'Service', items: listService },
      { groupId: 'municipality', groupLabel: 'Municipality', items: listMunicipality },
      { groupId: 'gender', groupLabel: 'Gender', items: listGender },
      { groupId: 'year', groupLabel: 'Year', items: listYear },
    ],
  });

  return (
    <>
      <PageHeading title={t("page_overview.title")}>
        <Typography variant="caption" className="text-gray-600">
          {t('page_overview.latest_update')} <span className="text-gray-800">{dayjs().format("dddd, DD MMMM YYYY - HH:mm")}</span>
        </Typography>
      </PageHeading>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 mb-4 space-y-3">
          <GroupFilter
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