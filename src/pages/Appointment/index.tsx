import { Button, Chip, InputAdornment, TextField, Typography } from "@mui/material";
import { useAppointments } from "api/appointment";
import { useMunicipality } from "api/region";
import { useServices } from "api/service";
import GroupFilter from "components/GroupFilter";
import PageHeading from "components/PageHeading";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { UserData } from "types/auth/user";
import { useDebounce } from "use-debounce";
import useGroupFilter from "usecase/useGroupFilter";
import AppointmentTable from "./components/AppointmentTable";
import RangePicker from "./components/RangePicker";

const Appointment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuthUser<UserData>();

  const searchParams = new URLSearchParams(location.search);
  const defaultSearch = searchParams.get('SearchValue') || '';
  const defaultStartDate = searchParams.get('ScheduleAtStart') ? dayjs(searchParams.get('ScheduleAtStart')).toDate() : null;
  const defaultEndDate = searchParams.get('ScheduleAtEnd') ? dayjs(searchParams.get('ScheduleAtEnd')).toDate() : null;

  const [date, setDate] = useState([defaultStartDate, defaultEndDate] as [Date | null, Date | null]);
  const [search, setSearch] = useState<string>(defaultSearch);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [debouncedSearch] = useDebounce(search, 500);

  const { data: dataServices } = useServices();
  const { data: dataMunicipality } = useMunicipality({
    countryCode: 'TL'
  });

  const listService = dataServices?.data?.map((item) => ({
    itemId: item.code,
    itemLabel: t(`sub_services.${item.name}`),
  })) || [];

  const listMunicipality = dataMunicipality?.data?.map((item) => ({
    itemId: item.id,
    itemLabel: item.name,
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
      { groupId: 'ServiceId', groupLabel: t('filter_label.service'), items: listService, disabled: !!auth.serviceTypes?.length },
      { groupId: 'StateId', groupLabel: t('filter_label.office'), items: listMunicipality, disabled: !!auth.regions?.length },
    ],
  });

  const {
    data: dataAppointments,
    isFetching: loadingAppointments,
    error: errorAppointments,
    refetch: refetchAppointments,
  } = useAppointments();

  const handleResetClick = () => {
    handleFilterClear();
    setSearch('');
    setDate([null, null])
  }

  const handleDateChange = (date: [Date | null, Date | null]) => {
    setDate(date);
  }

  const handlePreview = (id: number) => {
    navigate(`/appointment/${id}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams({
      PageNumber: String(paginationModel.page + 1),
      PageSize: String(paginationModel.pageSize),
      ...(debouncedSearch ? { SearchValue: debouncedSearch } : {}),
      ...(filter.ServiceId !== '0' ? { ServiceId: String(filter.ServiceId) } : {}),
      ...(filter.StateId !== '0' ? { StateId: String(filter.StateId) } : {}),
      ...(date[0] ? { ScheduleAtStart: dayjs(date[0]).format('YYYY-MM-DD') } : {}),
      ...(date[1] ? { ScheduleAtEnd: dayjs(date[1]).format('YYYY-MM-DD') } : {}),
    });

    navigate(location.pathname + '?' + urlParams.toString(), { replace: true });
  }, [paginationModel, debouncedSearch, filter, date, navigate, location.pathname])

  const hasSearch = debouncedSearch.length > 0;
  const hasDate = date[0] !== null || date[1] !== null;

  return (
    <>
      <PageHeading title={t('page_appointment.title')} />
      <div className="space-y-4">
        <div className="mb-6 space-y-3">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <TextField
                size="small"
                placeholder={t('page_appointment.filter.search_placeholder')}
                id="search-citizen"
                sx={{ width: '100%' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><FaSearch /></InputAdornment>
                }}
              />
            </div>
            <div className="col-span-8 justify-self-end">
              <div className="flex items-center flex-wrap gap-2 justify-end">
                <GroupFilter
                  className="justify-end"
                  filter={filter}
                  filterOptions={filterOptions}
                  handleFilterChange={handleFilterChange}
                />
                <RangePicker value={date} onChange={handleDateChange} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Typography variant="caption" className="text-gray-600 block">
              <span dangerouslySetInnerHTML={{ __html: t('page_appointment.total_appointments', { count: dataAppointments?.metadata?.totalCount }) }} />
            </Typography>
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
            {(hasFilter || hasSearch || hasDate) && (
              <div className="flex items-center gap-2">
                <Button variant="text" size="small" color="error" onClick={handleResetClick}>
                  {t('page_appointment.reset_filter')}
                </Button>
                {hasSearch && (
                  <Chip
                    size="small"
                    variant="outlined"
                    label="Search"
                    onDelete={() => setSearch('')}
                  />
                )}
                {hasFilter && filterKeys.map((key) => {
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
                {hasDate && (
                  <Chip
                    size="small"
                    variant="outlined"
                    label="Date"
                    onDelete={() => setDate([null, null])}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <AppointmentTable
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            data={dataAppointments}
            loading={loadingAppointments}
            error={errorAppointments}
            refetch={refetchAppointments}
            onPreview={handlePreview}
          />
        </div>
      </div>
    </>
  );
}

export default Appointment;