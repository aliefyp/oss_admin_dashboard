import { Button, Chip, InputAdornment, TextField, Typography } from "@mui/material";
import { useServicesType } from "api/service";
import GroupFilter from "components/GroupFilter";
import PageHeading from "components/PageHeading";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import useGroupFilter from "usecase/useGroupFilter";
import AppoinmentTable from "./components/AppoinmentTable";
import { useState } from "react";
import { useApplications } from "api/application";

const Appoinment = () => {
  const { t } = useTranslation();

  const { data: dataServicesType } = useServicesType();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  // TODO: change with appoinment api
  const {
    data: dataApplications,
    isFetching: loadingApplications,
    error: errorApplications,
  } = useApplications({
    pageNumber: paginationModel.page,
    pageSize: paginationModel.pageSize,
  });

  const listService = dataServicesType?.data?.map((item) => ({
    itemId: item.code,
    itemLabel: t(`services.${item.name}`),
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
      { groupId: 'office', groupLabel: 'Office', items: [] },
      { groupId: 'date', groupLabel: 'Date', items: [] },
    ],
  });

  return (
    <>
      <PageHeading title={t('page_appoinment.title')} />
      <div className="space-y-4">
        <div className="mb-6 space-y-3">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <TextField
                size="small"
                placeholder={t('page_appoinment.filter.search_placeholder')}
                id="search-citizen"
                sx={{ width: '100%' }}
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
              <span dangerouslySetInnerHTML={{ __html: t('page_appoinment.total_appoinments', { count: 2000 }) }} />
            </Typography>
            {hasFilter && (
              <div className="flex items-center gap-2">
                <Button variant="text" size="small" color="error" onClick={handleFilterClear}>
                  {t('page_appoinment.reset_filter')}
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
          <AppoinmentTable
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            data={dataApplications}
            loading={loadingApplications}
            error={errorApplications}
          />
        </div>
      </div>
    </>
  );
}

export default Appoinment;