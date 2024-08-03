import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomTablePagination from 'components/CustomTablePagination';
import EmptyState from 'components/EmptyState';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Response as TicketsResponse } from 'types/zendesk/tickets';

interface PaginationModel {
  page: number;
  pageSize: number;
}
interface Props {
  data: TicketsResponse;
  loading: boolean;
  error: Error;
  paginationModel: PaginationModel;
  setPaginationModel: (paginationModel: PaginationModel) => void;
}

const TicketTable = ({
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
    { field: 'subject', headerName: t('page_ticket.table.row_subject'), flex: 1 },
    { field: 'description', headerName: t('page_ticket.table.row_description'), flex: 2 },
    { field: 'status', headerName: t('page_ticket.table.row_status') },
    { field: 'tags', headerName: t('page_ticket.table.row_tags'), flex: 2 },
    { field: 'createdAt', headerName: t('page_ticket.table.row_created'), flex: 1 },
  ];

  const rows = data?.data?.map((item) => ({
    id: item.id,
    subject: item.subject,
    description: item.description,
    status: item.status,
    tags: item.tags.join(', '),
    createdAt: dayjs(item.createdAt).format('DD-MMM-YYYY HH:mm'),
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
      autoHeight
      loading={loading}
      density="standard"
      rows={rows}
      columns={columns}
      rowSelection={false}
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
      getRowHeight={() => 'auto'}
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
        },
        [`& .MuiDataGrid-cell`]: {
          padding: '8px',
          whiteSpace: 'normal !important',
          wordWrap: 'break-word !important',
          maxHeight: 'none !important',
        }
      }}
    />
  );
}

export default TicketTable;
