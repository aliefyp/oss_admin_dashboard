import { useState } from "react";
import { Button, Chip, InputAdornment, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useServices } from "api/service";
import { useAppointments } from "api/appointment";
import { useMunicipality } from "api/region";
import GroupFilter from "components/GroupFilter";
import PageHeading from "components/PageHeading";
import useGroupFilter from "usecase/useGroupFilter";
import AppointmentTable from "./components/AppointmentTable";
import { useDebounce } from "use-debounce";
import RangePicker from "./components/RangePicker";
import dayjs from "dayjs";

const Appointment = () => {
  const { t } = useTranslation();

  const [date, setDate] = useState([null, null] as [Date | null, Date | null]);
  const [search, setSearch] = useState('');
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
    itemId: item.code,
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
      { groupId: 'service', groupLabel: 'Service', items: listService },
      { groupId: 'office', groupLabel: 'Office', items: listMunicipality },
    ],
  });

  const {
    data: dataAppointments,
    isFetching: loadingAppointments,
    error: errorAppointments,
  } = useAppointments({
    PageNumber: paginationModel.page + 1,
    PageSize: paginationModel.pageSize,
    ...(debouncedSearch ? { SearchValue: debouncedSearch } : {}),
    ...(filter.service !== '0' ? { ServiceId: Number(filter.service) } : {}),
    ...(filter.office !== '0' ? { OfficeLocationCode: String(filter.office) } : {}),
    ...(date[0] ? { ScheduleAtStart: dayjs(date[0]).format('YYYY-MM-DD') } : {}),
    ...(date[1] ? { ScheduleAtEnd: dayjs(date[1]).format('YYYY-MM-DD') } : {}),
  });

  const handleResetClick = () => {
    handleFilterClear();
    setSearch('');
    setDate([null, null])
  }

  const handleDateChange = (date: [Date | null, Date | null]) => {
    setDate(date);
  }

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
          <div className="flex items-center gap-2">
            <Typography variant="caption" className="text-gray-600 block">
              <span dangerouslySetInnerHTML={{ __html: t('page_appointment.total_appointments', { count: dataAppointments?.metadata?.totalCount }) }} />
            </Typography>
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
          />
        </div>
      </div>
    </>
  );
}

export default Appointment;