import { Typography, InputAdornment, TextField, Button, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import useGroupFilter from "usecase/useGroupFilter";
import PageHeading from "components/PageHeading";
import GroupFilter from "components/GroupFilter";
import ApplicantTable from "./components/ApplicantTable";
import { DUMMY_MUNICIPALITY, DUMMY_SERVICES, DUMMY_YEAR, DUMMY_STATUS } from "./constants";

const Applicants: React.FC = () => {
  const { t } = useTranslation();

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
      { groupId: 'service', groupLabel: 'Service', items: DUMMY_SERVICES },
      { groupId: 'municipality', groupLabel: 'Municipality', items: DUMMY_MUNICIPALITY },
      { groupId: 'year', groupLabel: 'Year', items: DUMMY_YEAR },
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
          <ApplicantTable />
        </div>
      </div>
    </>
  );
}

export default Applicants;