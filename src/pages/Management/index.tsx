import { useEffect, useState } from "react";
import { Typography, InputAdornment, TextField, Button, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useServicesType } from "api/service";
import { useMunicipality } from "api/region";
import { useOfficers } from "api/officer";
import PageHeading from "components/PageHeading";
import GroupFilter from "components/GroupFilter";
import useGroupFilter from "usecase/useGroupFilter";
import ManagementTable from "./components/ManagementTable";
import { HiOutlinePlus } from "react-icons/hi";

const Management: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const searchParams = new URLSearchParams(location.search);
  const defaultSearch = searchParams.get('SearchValue') || '';

  const [search, setSearch] = useState<string>(defaultSearch);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [debouncedSearch] = useDebounce(search, 500);

  // const { data: dataStatus } = useOptionsApprovalStatus();
  const { data: dataServicesType } = useServicesType();
  const { data: dataMunicipality } = useMunicipality({
    countryCode: 'TL'
  });

  const {
    data: dataOfficers,
    isFetching: loadingOfficers,
    error: errorOfficers,
  } = useOfficers();

  const listService = dataServicesType?.data?.map((item) => ({
    itemId: item.code,
    itemLabel: t(`services.${item.name}`),
  })) || [];

  const listMunicipality = dataMunicipality?.data?.map((item) => ({
    itemId: item.code,
    itemLabel: item.name,
  })) || [];

  console.log(listService, listMunicipality)

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
      { groupId: 'Role', groupLabel: t('filter_label.role'), items: [] },
      { groupId: 'Organization', groupLabel: t('filter_label.organization'), items: [] },
    ],
  });

  const handleEdit = async (id: number) => {
    navigate(`/management/form/${id}`);
  }

  const handleDelete = (id: number) => {
    console.log('delete', id);
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
      ...(filter.Role !== '0' ? { Role: String(filter.Role) } : {}),
      ...(filter.Organization !== '0' ? { Organization: String(filter.Organization) } : {}),
    });

    navigate(location.pathname + '?' + urlParams.toString(), { replace: true });
  }, [paginationModel, debouncedSearch, filter, navigate, location.pathname])

  const hasSearch = debouncedSearch.length > 0;

  return (
    <>
      <PageHeading title={t('page_management.title')}>
        <Button variant="text" startIcon={<HiOutlinePlus />} onClick={() => navigate('/management/form')}>
          {t('page_management.add_new_account')}
        </Button>
      </PageHeading>
      <div className="space-y-4">
        <div className="mb-6 space-y-3">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <TextField
                size="small"
                placeholder={t('page_management.filter.search_placeholder')}
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
              <span dangerouslySetInnerHTML={{ __html: t('page_management.total_user', { count: dataOfficers?.metadata?.totalCount }) }} />
            </Typography>
            {(hasFilter || hasSearch) && (
              <div className="flex items-center gap-2">
                <Button variant="text" size="small" color="error" onClick={handleResetClick}>
                  {t('page_management.reset_filter')}
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
          <ManagementTable
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            data={dataOfficers}
            loading={loadingOfficers}
            error={errorOfficers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}

export default Management;