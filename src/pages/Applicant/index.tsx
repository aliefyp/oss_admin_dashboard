import { Typography, InputAdornment, TextField, Button, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import useGroupFilter from "usecase/useGroupFilter";
import PageHeading from "components/PageHeading";
import GroupFilter from "components/GroupFilter";
import { useServicesType } from "api/service";
import { useMunicipality } from "api/region";
import useLastNYearList from "usecase/useLastNYearList";
import ApplicantTable from "./components/ApplicantTable";
import { DUMMY_STATUS } from "./constants";
import { useApplications } from "api/application";

const Applicants: React.FC = () => {
  const { t } = useTranslation();
  const { data: dataServicesType } = useServicesType();
  const { data: dataMunicipality } = useMunicipality({ countryCode: 'TL' });
  const years = useLastNYearList(10);

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

  return (
    <>
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
            <div className="col-span-8">
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
        <div>
          <ApplicantTable
            data={dataApplications}
            loading={loadingApplications}
            error={errorApplications}
          />
        </div>
      </div>
    </>
  );
}

export default Applicants;