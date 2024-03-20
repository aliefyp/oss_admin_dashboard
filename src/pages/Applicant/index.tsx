import { Typography, InputAdornment, TextField, Button, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useServicesType } from "api/service";
import { useMunicipality } from "api/region";
import { useApplications } from "api/application";
import PageHeading from "components/PageHeading";
import GroupFilter from "components/GroupFilter";
import useGroupFilter from "usecase/useGroupFilter";
import useLastNYearList from "usecase/useLastNYearList";
import ApplicantTable from "./components/ApplicantTable";
import { DUMMY_STATUS } from "./constants";
import useApplicationFileDownload from "./usecase/useApplicationFileDownload";
import PageLoader from "components/PageLoader";

const Applicants: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const years = useLastNYearList(10);

  const { data: dataServicesType } = useServicesType();
  const { data: dataMunicipality } = useMunicipality({ countryCode: 'TL' });

  const { downloadFile, downloading } = useApplicationFileDownload();

  const {
    data: dataApplications,
    isFetching: loadingApplications,
    error: errorApplications,
  } = useApplications({
    pageNumber: 1,
    pageSize: 10,
  });

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
      { groupId: 'year', groupLabel: 'Year', items: listYear },
      { groupId: 'status', groupLabel: 'Status', items: DUMMY_STATUS },
    ],
  });

  const handleDownload = async (id: number) => {
    downloadFile(id);
  }

  const handlePreview = (id: number) => {
    navigate(`/applicant/${id}`)
  }

  return (
    <>
      {downloading && (
        <PageLoader />
      )}
      <PageHeading title={t('page_applicant.title')}>
        {/* <Button variant="text">+ Apply for Services</Button> */}
      </PageHeading>
      <div className="space-y-4">
        <div className="mb-6 space-y-3">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <TextField
                size="small"
                placeholder={t('page_applicant.filter.search_placeholder')}
                id="search-citizen"
                sx={{ width: '100%' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><FaSearch /></InputAdornment>
                }}
              />
            </div>
            <div className="col-span-8 justify-self-end">
              <GroupFilter
                filter={filter}
                filterOptions={filterOptions}
                handleFilterChange={handleFilterChange}
              />
            </div>
          </div>
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
        <div style={{ width: '100%' }}>
          <ApplicantTable
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