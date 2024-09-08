import { Button, Chip, InputAdornment, TextField, Typography } from "@mui/material";
import { useApplications } from "api/application";
import { useOptionsApplicationStatus } from "api/options";
import { useMunicipality } from "api/region";
import { useServicesType } from "api/service";
import GroupFilter from "components/GroupFilter";
import PageHeading from "components/PageHeading";
import PageLoader from "components/PageLoader";
import dayjs from "dayjs";
import RangePicker from "pages/Appointment/components/RangePicker";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { UserData } from "types/auth/user";
import { useDebounce } from "use-debounce";
import useGroupFilter from "usecase/useGroupFilter";
import ApplicantTable from "./components/ApplicantTable";
import ModalApplicationLog from "./components/ModalApplicationLog";
import useApplicationFileDownload from "./usecase/useApplicationFileDownload";
import useLogViewer from "./usecase/useLogViewer";

const Applicants: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const auth = useAuthUser<UserData>();

  const searchParams = new URLSearchParams(location.search);
  const defaultSearch = searchParams.get('SearchValue') || '';
  const defaultStartDate = searchParams.get('StartDate') ? dayjs(searchParams.get('StartDate')).toDate() : null;
  const defaultEndDate = searchParams.get('EndDate') ? dayjs(searchParams.get('EndDate')).toDate() : null;

  const [date, setDate] = useState([defaultStartDate, defaultEndDate] as [Date | null, Date | null]);
  const [search, setSearch] = useState<string>(defaultSearch);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [debouncedSearch] = useDebounce(search, 500);

  const { downloadFile, downloading } = useApplicationFileDownload();
  const { data: dataStatus } = useOptionsApplicationStatus();
  const { data: dataServicesType } = useServicesType();
  const { data: dataMunicipality } = useMunicipality({
    countryCode: 'TL'
  });

  const {
    data: dataApplications,
    isFetching: loadingApplications,
    error: errorApplications,
  } = useApplications();

  const {
    open: openLogView,
    data: logData,
    handleOpen: handleLogViewOpen,
    handleClose: handleLogViewClose,
  } = useLogViewer();

  const listService = dataServicesType?.data?.map((item) => ({
    itemId: item.code,
    itemLabel: t(`services.${item.name}`),
  })) || [];

  const listMunicipality = dataMunicipality?.data?.map((item) => ({
    itemId: item.id,
    itemLabel: item.name,
  })) || [];

  const listStatus = dataStatus?.data?.map((item) => ({
    itemId: item,
    itemLabel: t(`application_status.${item.toLowerCase()}`),
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
      { groupId: 'Status', groupLabel: t('filter_label.status'), items: listStatus },
    ],
  });

  const handleDownload = async (id: number) => {
    downloadFile(id);
  }

  const handlePreview = (id: number) => {
    navigate(`/applicant/${id}`)
  }

  const handleResetClick = () => {
    handleFilterClear();
    setSearch('');
    setDate([null, null])
  }

  const handleDateChange = (date: [Date | null, Date | null]) => {
    setDate(date);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams({
      PageNumber: String(paginationModel.page + 1),
      PageSize: String(paginationModel.pageSize),
      ...(debouncedSearch ? { SearchValue: debouncedSearch } : {}),
      ...(filter.ServiceTypeId !== '0' ? { ServiceTypeId: String(filter.ServiceTypeId) } : {}),
      ...(filter.StateId !== '0' ? { StateId: String(filter.StateId) } : {}),
      ...(filter.Status !== '0' ? { Status: String(filter.Status) } : {}),
      ...(date[0] ? { StartDate: dayjs(date[0]).format('YYYY-MM-DD') } : {}),
      ...(date[1] ? { EndDate: dayjs(date[1]).format('YYYY-MM-DD') } : {}),
    });

    navigate(location.pathname + '?' + urlParams.toString(), { replace: true });
  }, [paginationModel, debouncedSearch, filter, navigate, location.pathname, date])

  const hasSearch = debouncedSearch.length > 0;
  const hasDate = date[0] !== null || date[1] !== null;

  return (
    <>
      {downloading && (
        <PageLoader />
      )}
      <PageHeading title={t('page_applicant.title')} />
      <div className="space-y-4">
        <div className="mb-6 space-y-3">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <TextField
                size="small"
                placeholder={t('page_applicant.filter.search_placeholder')}
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
              <span dangerouslySetInnerHTML={{ __html: t('page_overview.total_registered', { count: dataApplications?.metadata?.totalCount }) }} />
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
                  {t('page_overview.reset_filter')}
                </Button>
                {hasSearch && (
                  <Chip
                    size="small"
                    variant="outlined"
                    label="Search"
                    onDelete={() => setSearch('')}
                  />
                )}
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
          <ApplicantTable
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            data={dataApplications}
            loading={loadingApplications}
            error={errorApplications}
            onDownload={handleDownload}
            onPreview={handlePreview}
            onLogView={handleLogViewOpen}
          />
        </div>
      </div>

      <ModalApplicationLog data={logData} open={openLogView} onClose={handleLogViewClose} />
    </>
  );
}

export default Applicants;