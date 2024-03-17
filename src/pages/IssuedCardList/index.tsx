import { Button, Chip, InputAdornment, TextField, Typography } from "@mui/material";
import PageHeading from "components/PageHeading";
import IssuedCardListTable from "./components/IssuedCardListTable";
import { useNavigate, useParams } from "react-router-dom";
import services from "constants/services";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useGroupFilter from "usecase/useGroupFilter";
import GroupFilter from "components/GroupFilter";
import { FaSearch } from "react-icons/fa";
import { useServicesType } from "api/service";
import useLastNYearList from "usecase/useLastNYearList";
import { DUMMY_DELIVER } from "./constants";

const IssuedCardList: React.FC = () => {
  const { issued_card_id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: dataServicesType } = useServicesType();
  const years = useLastNYearList(10);

  const serviceData = services.find((service) => service.id === issued_card_id);

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
      { groupId: 'deliver', groupLabel: 'Deliver', items: DUMMY_DELIVER},
      { groupId: 'year', groupLabel: 'Year', items: years },
    ],
  });
  
  useEffect(() => {
    if (!serviceData) {
      navigate(-1);
    }
  }, [navigate, serviceData])

  return (
    <>
      <PageHeading
        withBackButton
        title={`${t('page_issued_card_list.title')}: ${serviceData.name}`}
      />
      <div className="space-y-4">
        <div className="mb-6 space-y-3">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <TextField
                size="small"
                placeholder={t('page_issued_card_list.filter.search_placeholder')}
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
        <div>
          <IssuedCardListTable />
        </div>
      </div>
    </>
  );
}

export default IssuedCardList;