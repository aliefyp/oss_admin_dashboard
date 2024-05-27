import { IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import CustomTablePagination from 'components/CustomTablePagination';
import EmptyState from 'components/EmptyState';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Response as OfficersResponse } from 'types/officer/officers';

interface PaginationModel {
  page: number;
  pageSize: number;
}
interface Props {
  data: OfficersResponse;
  loading: boolean;
  error: Error;
  paginationModel: PaginationModel;
  setPaginationModel: (paginationModel: PaginationModel) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ManagementTable = ({
  data,
  loading,
  error,
  paginationModel,
  setPaginationModel,
  onEdit,
  onDelete
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [rowCount, setRowCountState] = useState<number>(data?.metadata?.totalCount || 0);

  const columns: GridColDef[] = [
    { field: 'id', headerName: t('page_management.table.row_id') },
    { field: 'name', headerName: t('page_management.table.row_name'), flex: 1 },
    { field: 'email', headerName: t('page_management.table.row_email'), flex: 1 },
    { field: 'phone_number', headerName: t('page_management.table.row_phone_number'), flex: 1 },
    { field: 'organization', headerName: t('page_management.table.row_organization'), flex: 1 },
    { field: 'role', headerName: t('page_management.table.row_role'), flex: 1 },
    {
      field: 'edit',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 40,
      renderCell: (params: GridValueGetterParams) => (
        <div id="download-button" className='hidden'>
          <Tooltip title="Edit">
            <IconButton onClick={() => onEdit(params.row.id)}>
              <HiPencil className='text-sm font-bold' />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 40,
      renderCell: (params: GridValueGetterParams) => (
        <div id="preview-button" className='hidden'>
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(params.row.id)}>
              <HiTrash className='text-sm font-bold' />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows = data?.data?.map((item) => ({
    id: item.id,
    name: item.fullName,
    email: item.email,
    phone_number: item.phoneNumber,
    organization: item.organizationName ? t(`organization.${item.organizationName}`) : '',
    role: item.roleGroup ? t(`role_group.${item.roleGroup}`) : '',
    edit: '',
    delete: '',
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

export default ManagementTable;
