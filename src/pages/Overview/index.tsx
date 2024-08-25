import { Button, Chip, Typography } from "@mui/material";
import { useDashboard } from "api/dashboard";
import { useOptionsGenderType } from "api/options";
import { useMunicipality } from "api/region";
import { useServicesType } from "api/service";
import GroupFilter from "components/GroupFilter";
import PageHeading from "components/PageHeading";
import dayjs from "dayjs";
import RangePicker from "pages/Appointment/components/RangePicker";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { UserData } from "types/auth/user";
import useGroupFilter from "usecase/useGroupFilter";
import ByAge from "./components/ByAge";
import ByGender from "./components/ByGender";
import RegisteredCitizens from "./components/RegisteredCitizens";
import ServiceDistributed from "./components/ServiceDistributed";
import TypeRegistered from "./components/TypeRegistered";

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const auth = useAuthUser<UserData>();

  const searchParams = new URLSearchParams(location.search);
  const defaultStartDate = searchParams.get('ScheduleAtStart') ? dayjs(searchParams.get('ScheduleAtStart')).toDate() : dayjs().subtract(1, 'week').toDate();
  const defaultEndDate = searchParams.get('ScheduleAtEnd') ? dayjs(searchParams.get('ScheduleAtEnd')).toDate() : dayjs().toDate();

  const { data: dataGenderType } = useOptionsGenderType();
  const { data: dataServicesType } = useServicesType();
  const { data: dataMunicipality } = useMunicipality({ countryCode: 'TL' });

  const [date, setDate] = useState([defaultStartDate, defaultEndDate] as [Date | null, Date | null]);

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
    itemId: item.id,
    itemLabel: item.name,
  })) || [];

  const listGender = dataGenderType?.data?.map((item) => ({
    itemId: item,
    itemLabel: t(`gender.${item.toLowerCase()}`),
  })) || [];

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
      { groupId: 'StateId', groupLabel: t('filter_label.municipality'), items: listMunicipality, disabled: !!auth.regions?.length },
      { groupId: 'Gender', groupLabel: t('filter_label.gender'), items: listGender },
    ],
  });

  const handleResetClick = () => {
    handleFilterClear();
    setDate([null, null]);
  }

  const handleDateChange = (date: [Date | null, Date | null]) => {
    setDate(date);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams({
      ...(filter.ServiceTypeId !== '0' ? { ServiceTypeId: String(filter.ServiceTypeId) } : {}),
      ...(filter.StateId !== '0' ? { StateId: String(filter.StateId) } : {}),
      ...(filter.Gender !== '0' ? { Gender: String(filter.Gender) } : {}),
      ...(date[0] ? { StartDate: dayjs(date[0]).format('YYYY-MM-DD') } : {}),
      ...(date[1] ? { EndDate: dayjs(date[1]).format('YYYY-MM-DD') } : {}),
    });

    navigate(location.pathname + '?' + urlParams.toString(), { replace: true });
  }, [filter, navigate, location.pathname, date])

  // const total = dataDashboard?.data?.totalApplicationByServiceTypes?.reduce((acc, item) => acc + item.total, 0) || 0;
  const hasDate = date[0] !== null || date[1] !== null;

  return (
    <>
      <PageHeading title={t("page_overview.title")}>
        <Typography variant="caption" className="text-gray-600">
          {t('page_overview.latest_update')} <span className="text-gray-800">{dayjs().format("dddd, DD MMMM YYYY - HH:mm")}</span>
        </Typography>
      </PageHeading>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 mb-4 space-y-3">
          <div className="flex items-center flex-wrap gap-2">
            <GroupFilter
              filter={filter}
              filterOptions={filterOptions}
              handleFilterChange={handleFilterChange}
            />
            <RangePicker value={date} onChange={handleDateChange} />
          </div>


          <div className="flex items-center gap-2 flex-wrap">
            {auth.serviceTypes?.map(service => (
              <Chip
                size="small"
                variant="outlined"
                label={t(`services.${service.name}`)}
              />
            ))}
            {auth.regions?.map(region => (
              <Chip
                size="small"
                variant="outlined"
                label={region.name}
              />
            ))}
            {(hasFilter || hasDate) && (
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