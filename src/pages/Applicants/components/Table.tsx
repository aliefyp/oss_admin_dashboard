import { Chip } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'citizens', headerName: 'Citizens', width: 200 },
  { field: 'services', headerName: 'Services', width: 160 },
  { field: 'municipality', headerName: 'Municipality', width: 130 },
  { field: 'submission_date', headerName: 'Submission Date', width: 130 },
  { field: 'review', headerName: 'Review', width: 160 },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
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
  },
  {
    id: 2,
    citizens: 'Jon Snow',
    services: 'Birth of Certificate',
    municipality: 'Bauncae',
    submission_date: '14-Apr-2024',
    review: 'Front-Desk Officer',
    status: 2,
  },
  {
    id: 3,
    citizens: 'Jon Snow',
    services: 'Birth of Certificate',
    municipality: 'Bauncae',
    submission_date: '14-Apr-2024',
    review: 'Front-Desk Officer',
    status: 3,
  },
];

const Table = () => {
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        density="compact"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        showColumnVerticalBorder={false}
        sx={{
          [`& .MuiDataGrid-columnHeaders`]: {
            backgroundColor: '#dcdcdc',
          },
          [`& .MuiDataGrid-columnHeaderTitle`]: {
            fontWeight: '700',
          },
        }}
      />
    </div>
  );
}

export default Table;
