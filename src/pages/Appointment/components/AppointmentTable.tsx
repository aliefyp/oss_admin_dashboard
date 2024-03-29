import { Chip } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import CustomTablePagination from 'components/CustomTablePagination';
import EmptyState from 'components/EmptyState';
import PageLoader from 'components/PageLoader';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Response as AppointmentResponse } from 'types/appointment/appointments';

interface PaginationModel {
  page: number;
  pageSize: number;
}
interface Props {
  data: AppointmentResponse;
  loading: boolean;
  error: Error;
  paginationModel: PaginationModel;
  setPaginationModel: (paginationModel: PaginationModel) => void;
}

const AppointmentTable = ({
  data,
  loading,
  error,
  paginationModel,
  setPaginationModel,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'id', headerName: t('page_appointment.table.row_id') },
    { field: 'citizens', headerName: t('page_appointment.table.row_citizens'), flex: 2 },
    { field: 'user_type', headerName: t('page_appointment.table.row_user_type'), flex: 1 },
    { field: 'services', headerName: t('page_appointment.table.row_service'), flex: 1 },
    { field: 'office', headerName: t('page_appointment.table.row_office'), flex: 1 },
    { field: 'appointment_date', headerName: t('page_appointment.table.row_appointment_date'), flex: 1 },
    {
      field: 'status',
      headerName: t('page_appointment.table.row_status'),
      flex: 1,
      renderCell: (params: GridValueGetterParams) => {
        let result = null;
        switch (params.row.status?.toLowerCase()) {
          case 'completed':
            result = <Chip label="Completed" size="small" className="!text-purple-600 !bg-purple-200 !rounded-md" />;
            break;
          case 'unstarted':
            result = <Chip label="Unstarted" size="small" className="!text-yellow-600 !bg-yellow-200 !rounded-md" />;
            break;
          case 'absent':
            result = <Chip label="Absent" size="small" className="!text-red-600 !bg-red-200 !rounded-md" />;
            break;
          default:
            break;
        }

        return result;
      }
    },
  ];

  const rows = data?.data?.map((item) => ({
    id: item.id,
    citizens: item.fullName,
    user_type: item.isRegistered ? 'Registered' : 'Not Registered',
    services: t(`sub_services.${item.service}`),
    appointment_date: dayjs(item.scheduledAt).format('DD-MMM-YYYY HH:mm'),
    office: item.office,
    status: item.status,
  })) || [];

  if (loading || !rows.length) {
    <PageLoader />
  }

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

  // if (!loading && !rows.length) {
  //   return (
  //     <EmptyState type="empty" title="No Data">
  //       You have no data
  //     </EmptyState>
  //   )
  // }

  return (
    <DataGrid
      density="standard"
      rows={rows}
      columns={columns}
      showColumnVerticalBorder={false}
      hideFooterSelectedRowCount
      disableColumnMenu
      pagination
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      slots={{
        pagination: CustomTablePagination,
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
      }}
    />
  );
}

export default AppointmentTable;
