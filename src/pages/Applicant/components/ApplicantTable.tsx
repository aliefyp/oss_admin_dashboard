import { Chip, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import CustomTablePagination from 'components/CustomTablePagination';
import EmptyState from 'components/EmptyState';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { HiDownload, HiOutlineDocumentSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Response as ApplicationResponse } from 'types/application/applications';

interface Props {
  data: ApplicationResponse;
  loading: boolean;
  error: Error;
}

const ApplicantTable = ({ data, loading, error }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'id', headerName: t('page_applicant.table.row_id') },
    { field: 'citizens', headerName: t('page_applicant.table.row_citizens'), flex: 2 },
    { field: 'services', headerName: t('page_applicant.table.row_service'), flex: 1 },
    { field: 'municipality', headerName: t('page_applicant.table.row_municipality'), flex: 1 },
    { field: 'submission_date', headerName: t('page_applicant.table.row_submission_date'), flex: 1 },
    { field: 'review', headerName: t('page_applicant.table.row_review'), flex: 1 },
    {
      field: 'status',
      headerName: t('page_applicant.table.row_status'),
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
    {
      field: 'preview',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 40,
      renderCell: (params: GridValueGetterParams) => (
        <div id="preview-button" className='hidden'>
          <Tooltip title="Preview">
            <IconButton onClick={() => navigate(`/applicant/123`)}>
              <HiOutlineDocumentSearch className='text-sm font-bold' />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows = data?.data?.map((item) => ({
    id: item.id,
    citizens: item.fullName,
    services: t(`services.${item.serviceType}`),
    municipality: item.municipality,
    submission_date: dayjs(item.submissionAt).format('DD-MMM-YYYY HH:mm'),
    review: t(`role.${item.reviewStep}`),
    status: item.status,
    download: '',
    preview: '',
  })) || [];

  if (error) {
    return (
      <EmptyState
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
      <EmptyState title="Ooops...">
        You have no data
      </EmptyState>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        density="standard"
        rows={rows}
        columns={columns}
        showColumnVerticalBorder={false}
        hideFooterSelectedRowCount
        disableColumnMenu
        pagination
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
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
    </div>
  );
}

export default ApplicantTable;
