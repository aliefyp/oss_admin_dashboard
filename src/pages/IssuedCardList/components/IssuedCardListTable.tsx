import { IconButton, Tooltip } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import CustomTablePagination from 'components/CustomTablePagination';
import { useTranslation } from 'react-i18next';
import { HiDownload } from 'react-icons/hi';

const IssuedCardListTable = () => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'id', headerName: t('page_issued_card_list.table.row_id'), flex: 1},
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

  const rows = [
    {
      id: 1,
      citizens: 'Jon Snow',
      municipality: 'Bauncae',
      deliver: 'Normal',
      issued_date: '14-Apr-2024',
      download: '',
    },
    {
      id: 2,
      citizens: 'Jon Snow',
      municipality: 'Bauncae',
      deliver: 'Urgent',
      issued_date: '14-Apr-2024',
      download: '',
    },
    {
      id: 3,
      citizens: 'Jon Snow',
      municipality: 'Bauncae',
      deliver: 'Normal',
      issued_date: '14-Apr-2024',
      download: '',
    },
    {
      id: 4,
      citizens: 'Jon Snow',
      municipality: 'Bauncae',
      deliver: 'Normal',
      issued_date: '14-Apr-2024',
      download: '',
    },
    {
      id: 5,
      citizens: 'Jon Snow',
      municipality: 'Bauncae',
      deliver: 'Normal',
      issued_date: '14-Apr-2024',
      download: '',
    },
    {
      id: 6,
      citizens: 'Jon Snow',
      municipality: 'Bauncae',
      deliver: 'Normal',
      issued_date: '14-Apr-2024',
      download: '',
    },
    {
      id: 7,
      citizens: 'Jon Snow',
      municipality: 'Bauncae',
      deliver: 'Normal',
      issued_date: '14-Apr-2024',
      download: '',
    },
    {
      id: 8,
      citizens: 'Jon Snow',
      municipality: 'Bauncae',
      deliver: 'Normal',
      issued_date: '14-Apr-2024',
      download: '',
    },
    {
      id: 9,
      citizens: 'Jon Snow',
      municipality: 'Bauncae',
      deliver: 'Normal',
      issued_date: '14-Apr-2024',
      download: '',
    },
    {
      id: 10,
      citizens: 'Jon Snow',
      municipality: 'Bauncae',
      deliver: 'Normal',
      issued_date: '14-Apr-2024',
      download: '',
    },
    {
      id: 11,
      citizens: 'Jon Snow',
      municipality: 'Bauncae',
      deliver: 'Normal',
      issued_date: '14-Apr-2024',
      download: '',
    },
  ];

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

export default IssuedCardListTable;
