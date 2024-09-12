import { Chip, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import CustomTablePagination from 'components/CustomTablePagination';
import EmptyState from 'components/EmptyState';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiDownload, HiOutlineDocumentSearch } from 'react-icons/hi';
import { MdHistory } from 'react-icons/md';
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
  onDownload: (id: number) => void;
  onPreview: (id: number) => void;
  onLogView: (id: number) => void;
}

const ApplicantTable = ({
  data,
  loading,
  error,
  paginationModel,
  setPaginationModel,
  onDownload,
  onPreview,
  onLogView
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [rowCount, setRowCountState] = useState<number>(data?.metadata?.totalCount || 0);

  const columns: GridColDef[] = [
    { field: 'id', headerName: t('page_applicant.table.row_id'), width: 40 },
    { field: 'citizens', headerName: t('page_applicant.table.row_citizens'), flex: 1 },
    { field: 'services', headerName: t('page_applicant.table.row_service'), flex: 1 },
    { field: 'municipality', headerName: t('page_applicant.table.row_municipality'), flex: 1 },
    { field: 'submission_date', headerName: t('page_applicant.table.row_submission_date'), flex: 1 },
    { field: 'review', headerName: t('page_applicant.table.row_review'), flex: 1 },
    {
      field: 'status',
      headerName: t('page_applicant.table.row_status'),
      flex: 1,
      renderCell: (params: GridValueGetterParams) => {
        const status = params.row.status.toLowerCase();

        switch (status) {
          case 'submitted':
            return <Chip label={t(`application_status.submitted`)} size="small" className={`!text-blue-600 !bg-blue-200 !rounded-md min-w-[120px]`} />
          case 'resubmitted':
            return <Chip label={t(`application_status.resubmitted`)} size="small" className={`!text-blue-600 !bg-blue-200 !rounded-md min-w-[120px]`} />
          case 'waitingapproval':
            return <Chip label={t(`application_status.waitingapproval`)} size="small" className={`!text-yellow-600 !bg-yellow-200 !rounded-md min-w-[120px]`} />
          case 'rejected':
            return <Chip label={t(`application_status.rejected`)} size="small" className={`!text-red-600 !bg-red-200 !rounded-md min-w-[120px]`} />
          case 'completed':
            return <Chip label={t(`application_status.completed`)} size="small" className={`!text-gray-600 !bg-gray-200 !rounded-md min-w-[120px]`} />
          case 'delivered':
            return <Chip label={t(`application_status.delivered`)} size="small" className={`!text-green-600 !bg-green-200 !rounded-md min-w-[120px]`} />
          case 'sendfordelivery':
            return <Chip label={t(`application_status.sendfordelivery`)} size="small" className={`!text-green-600 !bg-green-200 !rounded-md min-w-[120px]`} />
          case 'receivedbyowner':
            return <Chip label={t(`application_status.receivedbyowner`)} size="small" className={`!text-green-600 !bg-green-200 !rounded-md min-w-[120px]`} />
          default:
            return null;
        }
      }
    },
    { field: 'notes', headerName: t('page_applicant.table.row_notes'), flex: 1 },
    {
      field: 'log',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 40,
      renderCell: (params: GridValueGetterParams) => (
        <div id="log-button" className='hidden'>
          <Tooltip title="Detail Status">
            <IconButton onClick={() => onLogView(params.row.id)}>
              <MdHistory className='text-sm font-bold' />
            </IconButton>
          </Tooltip>
        </div>
      ),
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
            <IconButton onClick={() => onDownload(params.row.id)}>
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
            <IconButton onClick={() => onPreview(params.row.id)}>
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
    municipality: item.state,
    submission_date: dayjs(item.submissionAt).format('DD-MMM-YYYY HH:mm'),
    review: t(`role.${item.reviewStep}`),
    status: item.status,
    log: '',
    download: '',
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
        [`& .MuiDataGrid-row:hover #download-button,
          & .MuiDataGrid-row:hover #preview-button,
          & .MuiDataGrid-row:hover #log-button`
        ]: {
          display: 'block !important',
        },
        [`& .MuiDataGrid-footerContainer`]: {
          border: 'none',
        },
        [`& .MuiDataGrid-virtualScroller`]: {
          minHeight: '200px',
        },
      }}
    />
  );
}

export default ApplicantTable;
