import { Chip } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import CustomTablePagination from 'components/CustomTablePagination';
import EmptyState from 'components/EmptyState';
import PageLoader from 'components/PageLoader';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Response as AppoinmentResponse } from 'types/appoinment/appoinments';

interface PaginationModel {
  page: number;
  pageSize: number;
}
interface Props {
  data: AppoinmentResponse;
  loading: boolean;
  error: Error;
  paginationModel: PaginationModel;
  setPaginationModel: (paginationModel: PaginationModel) => void;
}

const AppoinmentTable = ({
  data,
  loading,
  error,
  paginationModel,
  setPaginationModel,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'id', headerName: t('page_appoinment.table.row_id') },
    { field: 'citizens', headerName: t('page_appoinment.table.row_citizens'), flex: 2 },
    { field: 'user_type', headerName: t('page_appoinment.table.row_user_type'), flex: 1 },
    { field: 'services', headerName: t('page_appoinment.table.row_service'), flex: 1 },
    { field: 'office', headerName: t('page_appoinment.table.row_office'), flex: 1 },
    { field: 'appoinment_date', headerName: t('page_appoinment.table.row_appoinment_date'), flex: 1 },
    {
      field: 'status',
      headerName: t('page_appoinment.table.row_status'),
      flex: 1,
      renderCell: (params: GridValueGetterParams) => {
        let result = null;
        switch (params.row.status?.toLowerCase()) {
          case 'approved':
            result = <Chip label="Approved" size="small" className="!text-purple-600 !bg-purple-200" />;
            break;
          case 'pending':
            result = <Chip label="Pending" size="small" className="!text-yellow-600 !bg-yellow-200" />;
            break;
          case 'rejected':
            result = <Chip label="Rejected" size="small" className="!text-red-600 !bg-red-200" />;
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
    user_type: 'Registered',
    services: t(`services.${item.service}`),
    appoinment_date: dayjs(item.scheduledAt).format('DD-MMM-YYYY HH:mm'),
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

  if (!loading && !rows.length) {
    return (
      <EmptyState type="empty" title="No Data">
        You have no data
      </EmptyState>
    )
  }

  return (
    <DataGrid
      density="standard"
      rows={rows}
      columns={columns}
      showColumnVerticalBorder={false}
      hideFooterSelectedRowCount
      disableColumnMenu
      pagination
      // initialState={{
      //   pagination: {
      //     paginationModel,
      //   },
      // }}
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

export default AppoinmentTable;
