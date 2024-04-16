import { useEffect, useState } from "react";
import { Typography, InputAdornment, TextField, Button, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useServicesType } from "api/service";
import { useMunicipality } from "api/region";
import { useApplications } from "api/application";
import { useOptionsApprovalStatus } from "api/options";
import PageHeading from "components/PageHeading";
import GroupFilter from "components/GroupFilter";
import PageLoader from "components/PageLoader";
import useGroupFilter from "usecase/useGroupFilter";
import useLastNYearList from "usecase/useLastNYearList";
import ApplicantTable from "./components/ApplicantTable";
import useApplicationFileDownload from "./usecase/useApplicationFileDownload";
import useRoleAccess from "usecase/useRoleAccess";

const Applicants: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const years = useLastNYearList(5);
  const { showServiceType, showOfficeLocation, hasAccessServiceTypeFilter, hasAccessMunicipalityFilter } = useRoleAccess();

  const searchParams = new URLSearchParams(location.search);
  const defaultSearch = searchParams.get('SearchValue') || '';

  const [search, setSearch] = useState<string>(defaultSearch);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [debouncedSearch] = useDebounce(search, 500);

  const { downloadFile, downloading } = useApplicationFileDownload();
  const { data: dataStatus } = useOptionsApprovalStatus();
  const { data: dataServicesType } = useServicesType();
  const { data: dataMunicipality } = useMunicipality({
    countryCode: 'TL'
  });

  const {
    data: dataApplications,
    isFetching: loadingApplications,
    error: errorApplications,
  } = useApplications();

  const listService = dataServicesType?.data?.map((item) => ({
    itemId: item.code,
    itemLabel: t(`services.${item.name}`),
  })) || [];

  const listMunicipality = dataMunicipality?.data?.map((item) => ({
    itemId: item.code,
    itemLabel: item.name,
  })) || [];

  const listYear = years.map((item) => ({
    itemId: item,
    itemLabel: item,
  }));

  const listStatus = dataStatus?.data?.map((item) => ({
    itemId: item,
    itemLabel: t(`approval_status.${item.toLowerCase()}`),
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
      { groupId: 'ServiceId', groupLabel: t('filter_label.service'), items: listService, disabled: !hasAccessServiceTypeFilter },
      { groupId: 'MunicipalityCode', groupLabel: t('filter_label.municipality'), items: listMunicipality, disabled: !hasAccessMunicipalityFilter },
      { groupId: 'SortYearBy', groupLabel: t('filter_label.year'), items: listYear },
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
  }

  useEffect(() => {
    const urlParams = new URLSearchParams({
      PageNumber: String(paginationModel.page + 1),
      PageSize: String(paginationModel.pageSize),
      ...(debouncedSearch ? { SearchValue: debouncedSearch } : {}),
      ...(filter.ServiceId !== '0' ? { ServiceId: String(filter.ServiceId) } : {}),
      ...(filter.MunicipalityCode !== '0' ? { MunicipalityCode: String(filter.MunicipalityCode) } : {}),
      ...(filter.SortYearBy !== '0' ? { SortYearBy: String(filter.SortYearBy) } : {}),
      ...(filter.Status !== '0' ? { Status: String(filter.Status) } : {}),
    });

    navigate(location.pathname + '?' + urlParams.toString(), { replace: true });
  }, [paginationModel, debouncedSearch, filter, navigate, location.pathname])

  const hasSearch = debouncedSearch.length > 0;

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
              <GroupFilter
                className="justify-end"
                filter={filter}
                filterOptions={filterOptions}
                handleFilterChange={handleFilterChange}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Typography variant="caption" className="text-gray-600 block">
              <span dangerouslySetInnerHTML={{ __html: t('page_overview.total_registered', { count: dataApplications?.metadata?.totalCount }) }} />
            </Typography>
            {showServiceType && (
              <Chip
                size="small"
                variant="outlined"
                label="Passport Card"
              />
            )}
            {showOfficeLocation && (
              <Chip
                size="small"
                variant="outlined"
                label="Dili"
              />
            )}
            {(hasFilter || hasSearch) && (
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
          />
        </div>
      </div>
    </>
  );
}

export default Applicants;