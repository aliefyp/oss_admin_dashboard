import { Button, Chip, InputAdornment, TextField, Typography } from "@mui/material";
import { useIssuedCards } from "api/issued-cards";
import { useOptionApplicationDeliveryTime, useOptionsApplicationStatus } from "api/options";
import { useMunicipality } from "api/region";
import { useServicesType } from "api/service";
import GroupFilter from "components/GroupFilter";
import PageHeading from "components/PageHeading";
import dayjs from "dayjs";
import RangePicker from "pages/Appointment/components/RangePicker";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserData } from "types/auth/user";
import { useDebounce } from "use-debounce";
import useGroupFilter from "usecase/useGroupFilter";
import IssuedCardListTable from "./components/IssuedCardListTable";

const AVAILABLE_STATUS = ['submitted', 'sendForDelivery', 'receivedByOwner']

const IssuedCardList: React.FC = () => {
  const location = useLocation();
  const { issued_card_id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuthUser<UserData>();

  const searchParams = new URLSearchParams(location.search);
  const defaultSearch = searchParams.get('SearchValue') || '';
  const defaultStartDate = searchParams.get('StartDate') ? dayjs(searchParams.get('StartDate')).toDate() : null;
  const defaultEndDate = searchParams.get('EndDate') ? dayjs(searchParams.get('EndDate')).toDate() : null;

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
  const { data: dataStatus } = useOptionsApplicationStatus();
  const { data: dataIssuedCards, isFetching, error, refetch } = useIssuedCards(Number(issued_card_id));
  const pageTitle = dataServicesType?.data?.find((item) => item.code === issued_card_id)?.name;

  const [date, setDate] = useState([defaultStartDate, defaultEndDate] as [Date | null, Date | null]);

  const listMunicipality = dataMunicipality?.data?.map((item) => ({
    itemId: item.id,
    itemLabel: item.name
  })) || [];

  const listDeliveryTime = dataDeliveryTime?.data?.map((item) => ({
    itemId: item,
    itemLabel: t(`deliver.${item}`),
  })) || [];

  const listStatus = dataStatus?.data
    ?.filter((item) => AVAILABLE_STATUS.includes(item))
    ?.map((item) => ({
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
      { groupId: 'Status', groupLabel: t('filter_label.status'), items: listStatus },
      { groupId: 'StateId', groupLabel: t('filter_label.municipality'), items: listMunicipality, disabled: !!auth.regions?.length },
      { groupId: 'DeliveryTime', groupLabel: t('filter_label.deliver'), items: listDeliveryTime },
    ],
  });

  const handleResetClick = () => {
    handleFilterClear();
    setSearch('');
    setDate([null, null]);
  }

  const handleDateChange = (date: [Date | null, Date | null]) => {
    setDate(date);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams({
      PageNumber: String(paginationModel.page + 1),
      PageSize: String(paginationModel.pageSize),
      ...(debouncedSearch ? { SearchValue: debouncedSearch } : {}),
      ...(filter.StateId !== '0' ? { StateId: String(filter.StateId) } : {}),
      ...(filter.DeliveryTime !== '0' ? { DeliveryTime: String(filter.DeliveryTime) } : {}),
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
              <div className="flex items-center justify-end flex-wrap gap-2">
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
            {(hasFilter || hasSearch || hasDate) && (
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
          <IssuedCardListTable
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            data={dataIssuedCards}
            loading={isFetching}
            error={error}
            refetch={refetch}
          />
        </div>
      </div>
    </>
  );
}

export default IssuedCardList;