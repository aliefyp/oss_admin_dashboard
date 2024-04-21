import { IconButton, Tooltip } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { Response as IssuedCardResponse } from 'types/issued-card/issued-cards';
import CustomTablePagination from 'components/CustomTablePagination';
import { useTranslation } from 'react-i18next';
import { HiDownload } from 'react-icons/hi';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import EmptyState from 'components/EmptyState';
import { useNavigate } from 'react-router-dom';

interface PaginationModel {
  page: number;
  pageSize: number;
}
interface Props {
  data: IssuedCardResponse;
  loading: boolean;
  error: Error;
  paginationModel: PaginationModel;
  setPaginationModel: (paginationModel: PaginationModel) => void;
}

const IssuedCardListTable = ({ data, loading, error, paginationModel, setPaginationModel }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [rowCount, setRowCountState] = useState<number>(data?.metadata?.totalCount || 0);

  const columns: GridColDef[] = [
    { field: 'id', headerName: t('page_issued_card_list.table.row_id'), flex: 1 },
    { field: 'citizens', headerName: t('page_issued_card_list.table.row_citizens'), flex: 2 },
    { field: 'municipality', headerName: t('page_issued_card_list.table.row_municipality'), flex: 1 },
    { field: 'deliver', headerName: t('page_issued_card_list.table.row_deliver'), flex: 1 },
    { field: 'issued_date', headerName: t('page_issued_card_list.table.row_submission_date'), flex: 1 },
    {
      field: 'download',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 40,
      renderCell: (params: GridValueGetterParams) => (
        <div id="download-button" className='hidden'>
          <Tooltip title="Download">
            <IconButton>
              <HiDownload className='text-sm font-bold' />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows = data?.data.map((item) => ({
    id: item.id,
    citizens: item.fullName,
    municipality: item.state,
    deliver: t(`deliver.${item.deliveryTime}`),
    issued_date: dayjs(item.issuedAt).format('DD-MMM-YYYY HH:mm'),
  })) || [];

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.metadata?.totalCount !== undefined ? data?.metadata?.totalCount : prevRowCountState,
    );
  }, [data?.metadata?.totalCount, setRowCountState]);

  if (!loading && error) {
    return (
      <EmptyState
        type="error"
        title="Ooops..."
        actionText="Return to home"
        onClick={() => navigate('/')}
      >
        {error?.message || 'Something went wrong'}
      </EmptyState>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        loading={loading}
        density="standard"
        rows={rows}
        columns={columns}
        showColumnVerticalBorder={false}
        hideFooterSelectedRowCount
        disableColumnMenu
        pagination
        paginationMode="server"
        paginationModel={paginationModel}
        rowCount={rowCount}
        slots={{
          pagination: CustomTablePagination,
          noRowsOverlay: () => (
            <EmptyState type="empty" title="Oops...">
              No results found
            </EmptyState>
          ),
        }}
        sx={{
          border: 'none',
          [`& .MuiDataGrid-columnHeaders`]: {
            backgroundColor: '#dcdcdc',
            borderRadius: '8px',
          },
          [`& .MuiDataGrid-columnHeaderTitle`]: {
            fontWeight: '700',
          },
          [`& .MuiDataGrid-row:hover #download-button, & .MuiDataGrid-row:hover #preview-button`]: {
            display: 'block !important',
          },
          [`& .MuiDataGrid-footerContainer`]: {
            border: 'none',
          },
          [`& .MuiDataGrid-virtualScroller`]: {
            minHeight: '200px',
          }
        }}
      />
    </div>
  );
}

export default IssuedCardListTable;
