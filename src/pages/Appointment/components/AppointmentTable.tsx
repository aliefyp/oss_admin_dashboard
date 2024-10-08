import { IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import CustomTablePagination from 'components/CustomTablePagination';
import EmptyState from 'components/EmptyState';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Response as AppointmentResponse } from 'types/appointment/appointments';
import AppointmentStatus from './AppointmentStatus';

interface PaginationModel {
  page: number;
  pageSize: number;
}
interface Props {
  data: AppointmentResponse;
  loading: boolean;
  error: Error;
  refetch: () => void;
  paginationModel: PaginationModel;
  setPaginationModel: (paginationModel: PaginationModel) => void;
  onPreview: (id: number) => void;
}

const AppointmentTable = ({
  data,
  loading,
  error,
  refetch,
  paginationModel,
  setPaginationModel,
  onPreview,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [rowCount, setRowCountState] = useState<number>(data?.metadata?.totalCount || 0);

  const columns: GridColDef[] = [
    { field: 'id', headerName: t('page_appointment.table.row_id'), width: 40 },
    { field: 'citizens', headerName: t('page_appointment.table.row_citizens'), flex: 1 },
    { field: 'user_type', headerName: t('page_appointment.table.row_user_type'), flex: 1 },
    { field: 'services', headerName: t('page_appointment.table.row_service'), flex: 1 },
    { field: 'office', headerName: t('page_appointment.table.row_office'), flex: 1 },
    { field: 'appointment_date', headerName: t('page_appointment.table.row_appointment_date'), flex: 1 },
    {
      field: 'status',
      headerName: t('page_appointment.table.row_status'),
      flex: 1,
      minWidth: 180,
      renderCell: (params: GridValueGetterParams) => {
        return <AppointmentStatus appointmentId={params.row.id} status={params.row.status.toLowerCase()} refetch={refetch} />
      },
    },
    { field: 'notes', headerName: t('page_appointment.table.row_appointment_notes'), flex: 1 },
    {
      field: 'preview',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 40,
      renderCell: (params: GridValueGetterParams) => (
        <div id="preview-button" className='hidden' onClick={e => e.stopPropagation()}>
          <Tooltip title="Preview">
            <IconButton onClick={() => onPreview(params.row.id)}>
              <HiOutlineDocumentSearch className='text-sm font-bold' />
            </IconButton>
          </Tooltip>
        </div>
      ),
    }
  ];

  const rows = data?.data?.map((item) => ({
    id: item.id,
    citizens: item.fullName,
    user_type: item.isRegistered ? 'Registered' : 'Not Registered',
    services: t(`sub_services.${item.service}`),
    appointment_date: dayjs(item.scheduledAt).format('DD-MMM-YYYY HH:mm'),
    office: item.officeLocation,
    status: item.status,
    preview: '',
    notes: item.notes,
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
      onRowClick={(params) => onPreview(params.row.id)}
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
        },
        '.MuiDataGrid-cell:focus': {
          outline: 'none'
        },
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer'
        },
      }}
    />
  );
}

export default AppointmentTable;
