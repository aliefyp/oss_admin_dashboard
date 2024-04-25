import { Button, Chip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import dayjs from "dayjs";
import { useServicesType } from "api/service";
import { useMunicipality } from "api/region";
import { useOptionsGenderType } from "api/options";
import { useDashboard } from "api/dashboard";
import useLastNYearList from "usecase/useLastNYearList";
import useGroupFilter from "usecase/useGroupFilter";
import { UserData } from "types/auth/user";
import GroupFilter from "components/GroupFilter";
import PageHeading from "components/PageHeading";
import RegisteredCitizens from "./components/RegisteredCitizens";
import TypeRegistered from "./components/TypeRegistered";
import ByGender from "./components/ByGender";
import ByAge from "./components/ByAge";
import ServiceDistributed from "./components/ServiceDistributed";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const auth = useAuthUser<UserData>();

  const { data: dataGenderType } = useOptionsGenderType();
  const { data: dataServicesType } = useServicesType();
  const { data: dataMunicipality } = useMunicipality({ countryCode: 'TL' });
  const years = useLastNYearList(5);

  const { data: dataDashboard, isFetching } = useDashboard();

  const registeredCitizen = {
    daily: dataDashboard?.data?.dailyRegisteredCitizens || [],
    weekly: dataDashboard?.data?.weeklyRegisteredCitizens || [],
    monthly: dataDashboard?.data?.monthlyRegisteredCitizens || [],
  };

  const listService = dataServicesType?.data?.map((item) => ({
    itemId: item.code,
    itemLabel: t(`services.${item.name}`),
  })) || [];

  const listMunicipality = dataMunicipality?.data?.map((item) => ({
    itemId: item.code,
    itemLabel: item.name,
  })) || [];

  const listGender = dataGenderType?.data?.map((item) => ({
    itemId: item,
    itemLabel: t(`gender.${item.toLowerCase()}`),
  })) || [];

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
      { groupId: 'ServiceTypeId', groupLabel: t('filter_label.service'), items: listService, disabled: !!auth.serviceTypes?.length },
      { groupId: 'StateId', groupLabel: t('filter_label.municipality'), items: listMunicipality, disabled: !!auth.region },
      { groupId: 'GenderType', groupLabel: t('filter_label.gender'), items: listGender },
      { groupId: 'Year', groupLabel: t('filter_label.year'), items: listYear },
    ],
  });

  const handleResetClick = () => {
    handleFilterClear();
  }

  useEffect(() => {
    const urlParams = new URLSearchParams({
      ...(filter.ServiceTypeId !== '0' ? { ServiceTypeId: String(filter.ServiceTypeId) } : {}),
      ...(filter.StateId !== '0' ? { StateId: String(filter.StateId) } : {}),
      ...(filter.GenderType !== '0' ? { GenderType: String(filter.GenderType) } : {}),
      ...(filter.Year !== '0' ? { Year: String(filter.Year) } : {}),
    });

    navigate(location.pathname + '?' + urlParams.toString(), { replace: true });
  }, [filter, navigate, location.pathname])

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
              <span dangerouslySetInnerHTML={{ __html: t('page_overview.total_registered', { count: 2000 }) }} />
            </Typography>
            {auth.serviceTypes?.map(service => (
              <Chip
                size="small"
                variant="outlined"
                label={t(`services.${service.name}`)}
              />
            ))}
            {auth.region && (
              <Chip
                size="small"
                variant="outlined"
                label={auth.region}
              />
            )}
            {hasFilter && (
              <div className="flex items-center gap-2">
                <Button variant="text" size="small" color="error" onClick={handleResetClick}>
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
          <RegisteredCitizens data={registeredCitizen} loading={isFetching} />
          <div className="grid grid-cols-2 gap-4">
            <ByGender data={dataDashboard?.data?.registeredCitizenByGenders} loading={isFetching} />
            <ByAge data={dataDashboard?.data?.registeredCitizenByAges} loading={isFetching} />
          </div>
        </div>
        <div className="col-span-4 space-y-4">
          <TypeRegistered data={dataDashboard?.data?.totalApplicationByStatus} loading={isFetching} />
          <ServiceDistributed data={dataDashboard?.data?.totalApplicationByServiceTypes} loading={isFetching} />
        </div>
      </div>
    </>
  );
}

export default Overview;