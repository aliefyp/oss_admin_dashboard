import { Chip, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { HiDownload, HiOutlineDocumentSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'citizens', headerName: 'Citizens', flex: 2 },
    { field: 'services', headerName: 'Services', flex: 1 },
    { field: 'municipality', headerName: 'Municipality', flex: 1 },
    { field: 'submission_date', headerName: 'Submission Date', flex: 1 },
    { field: 'review', headerName: 'Review', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridValueGetterParams) => {
        let result = null;
        switch (params.row.status) {
          case 1:
            result = <Chip label="Approved" size="small" className="!text-purple-600 !bg-purple-200" />;
            break;
          case 2:
            result = <Chip label="Pending" size="small" className="!text-yellow-600 !bg-yellow-200" />;
            break;
          case 3:
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
          <IconButton>
            <HiDownload className='text-sm font-bold' />
          </IconButton>
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
          <IconButton onClick={() => navigate(`/applicant`)}>
            <HiOutlineDocumentSearch className='text-sm font-bold' />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      citizens: 'Jon Snow',
      services: 'Birth of Certificate',
      municipality: 'Bauncae',
      submission_date: '14-Apr-2024',
      review: 'Front-Desk Officer',
      status: 1,
      download: '',
      preview: '',
    },
    {
      id: 2,
      citizens: 'Jon Snow',
      services: 'Birth of Certificate',
      municipality: 'Bauncae',
      submission_date: '14-Apr-2024',
      review: 'Front-Desk Officer',
      status: 2,
      download: '',
      preview: '',
    },
    {
      id: 3,
      citizens: 'Jon Snow',
      services: 'Birth of Certificate',
      municipality: 'Bauncae',
      submission_date: '14-Apr-2024',
      review: 'Front-Desk Officer',
      status: 3,
      download: '',
      preview: '',
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        density="standard"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        showColumnVerticalBorder={false}
        sx={{
          [`& .MuiDataGrid-columnHeaders`]: {
            backgroundColor: '#dcdcdc',
          },
          [`& .MuiDataGrid-columnHeaderTitle`]: {
            fontWeight: '700',
          },
          [`& .MuiDataGrid-row:hover #download-button, & .MuiDataGrid-row:hover #preview-button`]: {
            display: 'block !important',
          },
        }}
      />
    </div>
  );
}

export default Table;
