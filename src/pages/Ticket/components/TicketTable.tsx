import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomTablePagination from 'components/CustomTablePagination';
import EmptyState from 'components/EmptyState';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Response as ApplicationResponse } from 'types/application/applications';

interface PaginationModel {
  page: number;
  pageSize: number;
}
interface Props {
  data: ApplicationResponse;
  loading: boolean;
  error: Error;
  paginationModel: PaginationModel;
  setPaginationModel: (paginationModel: PaginationModel) => void;
}

const TicketTableTable = ({
  data,
  loading,
  error,
  paginationModel,
  setPaginationModel,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [rowCount, setRowCountState] = useState<number>(data?.metadata?.totalCount || 0);

  const columns: GridColDef[] = [
    { field: 'id', headerName: t('page_ticket.table.row_id') },
    { field: 'category', headerName: t('page_ticket.table.row_category'), flex: 1 },
    { field: 'citizens', headerName: t('page_ticket.table.row_citizens'), flex: 1 },
    { field: 'submission_date', headerName: t('page_ticket.table.row_submission_date'), flex: 1 },
    { field: 'service', headerName: t('page_ticket.table.row_service'), flex: 1 },
  ];

  const rows = data?.data?.map((item) => ({
    id: item.id,
    category: '',
    citizens: item.fullName,
    services: t(`services.${item.serviceType}`),
    submission_date: dayjs(item.submissionAt).format('DD-MMM-YYYY HH:mm'),
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
    <DataGrid
      loading={loading}
      density="standard"
      rows={rows}
      columns={columns}
      showColumnVerticalBorder={false}
      hideFooterSelectedRowCount
      disableColumnMenu
      pagination
      paginationModel={paginationModel}
      rowCount={rowCount}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
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
  );
}

export default TicketTableTable;
