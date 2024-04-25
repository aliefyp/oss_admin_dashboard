import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import { Button, Chip, InputAdornment, TextField, Typography } from "@mui/material";
import { useServicesType } from "api/service";
import { useIssuedCards } from "api/issued-cards";
import { useOptionApplicationDeliveryTime } from "api/options";
import PageHeading from "components/PageHeading";
import GroupFilter from "components/GroupFilter";
import useGroupFilter from "usecase/useGroupFilter";
import useLastNYearList from "usecase/useLastNYearList";
import IssuedCardListTable from "./components/IssuedCardListTable";
import { useMunicipality } from "api/region";
import { UserData } from "types/auth/user";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const IssuedCardList: React.FC = () => {
  const location = useLocation();
  const { issued_card_id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const years = useLastNYearList(5);
  const auth = useAuthUser<UserData>();

  const searchParams = new URLSearchParams(location.search);
  const defaultSearch = searchParams.get('SearchValue') || '';

  const [search, setSearch] = useState<string>(defaultSearch);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [debouncedSearch] = useDebounce(search, 500);

  const { data: dataDeliveryTime } = useOptionApplicationDeliveryTime();
  const { data: dataMunicipality } = useMunicipality({
    countryCode: 'TL'
  });
  const { data: dataServicesType } = useServicesType();
  const { data: dataIssuedCards, isFetching, error } = useIssuedCards(Number(issued_card_id));
  const pageTitle = dataServicesType?.data?.find((item) => item.code === issued_card_id)?.name;

  const listMunicipality = dataMunicipality?.data?.map((item) => ({
    itemId: item.id,
    itemLabel: item.name
  })) || [];

  const listYear = years.map((year) => ({
    itemId: year,
    itemLabel: year,
  }));

  const listDeliveryTime = dataDeliveryTime?.data?.map((item) => ({
    itemId: item,
    itemLabel: t(`deliver.${item}`),
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
      { groupId: 'StateId', groupLabel: t('filter_label.municipality'), items: listMunicipality, disabled: !!auth.regions?.length },
      { groupId: 'DeliveryTime', groupLabel: t('filter_label.deliver'), items: listDeliveryTime },
      { groupId: 'Year', groupLabel: t('filter_label.year'), items: listYear },
    ],
  });

  const handleResetClick = () => {
    handleFilterClear();
    setSearch('');
  }

  useEffect(() => {
    const urlParams = new URLSearchParams({
      PageNumber: String(paginationModel.page + 1),
      PageSize: String(paginationModel.pageSize),
      ...(debouncedSearch ? { SearchValue: debouncedSearch } : {}),
      ...(filter.StateId !== '0' ? { StateId: String(filter.StateId) } : {}),
      ...(filter.DeliveryTime !== '0' ? { DeliveryTime: String(filter.DeliveryTime) } : {}),
      ...(filter.Year !== '0' ? { Year: String(filter.Year) } : {}),
    });

    navigate(location.pathname + '?' + urlParams.toString(), { replace: true });
  }, [paginationModel, debouncedSearch, filter, navigate, location.pathname])

  const hasSearch = debouncedSearch.length > 0;

  return (
    <>
      <PageHeading
        withBackButton
        title={`${t('page_issued_card_list.title')}: ${t(`services.${pageTitle}`)}`}
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
              <span dangerouslySetInnerHTML={{ __html: t('page_issued_card_list.total_issued', { count: dataIssuedCards?.metadata?.totalCount }) }} />
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
            {(hasFilter || hasSearch) && (
              <div className="flex items-center gap-2">
                <Button variant="text" size="small" color="error" onClick={handleResetClick}>
                  {t('page_issued_card_list.reset_filter')}
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
              </div>
            )}
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <IssuedCardListTable
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            data={dataIssuedCards}
            loading={isFetching}
            error={error}
          />
        </div>
      </div>
    </>
  );
}

export default IssuedCardList;