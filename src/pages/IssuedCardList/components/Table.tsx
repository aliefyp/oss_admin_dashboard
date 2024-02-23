import { Button, Checkbox, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { HiDownload, HiOutlineDocumentSearch } from 'react-icons/hi';

const Table = () => {
  const [status, setStatus] = useState({
    cninc: undefined,
    card: undefined,
    document: undefined,
  })

  const columns: GridColDef[] = [
    {
      field: 'required_document',
      headerName: 'Required Document',
      sortable: false,
      flex: 1,
      renderCell: (params: GridValueGetterParams) => {
        let text = null;
        switch (params.row.required_document) {
          case 'cninc':
            text = 'CNINC';
            break;
          case 'card':
            text = 'Card';
            break;
          case 'document':
            text = 'Document';
            break;
          default:
            break;
        }
        return (
          <Typography variant="body2" className="w-[200px]">{`Scanned Copy of ${text}`}</Typography>
        )
      },
    },
    {
      field: 'document',
      headerName: '',
      flex: 2,
      sortable: false,
      renderCell: (_: GridValueGetterParams) => (
        <Typography variant="caption" className="!text-gray-500">Example.png</Typography>
      )
    },
    {
      field: 'download',
      headerName: '',
      sortable: false,
      flex: 1,
      renderCell: (params: GridValueGetterParams) => (
        <div id="download-button" className='hidden'>
          <Button size="small" variant="text" className='space-x-2 hidden'>
            <HiDownload />
            Download
          </Button>
        </div>
      ),
    },
    {
      field: 'preview',
      headerName: '',
      sortable: false,
      flex: 1,
      renderCell: (params: GridValueGetterParams) => (
        <div id="preview-button" className='hidden'>
          <Button size="small" variant="text" className='space-x-2'>
            <HiOutlineDocumentSearch />
            Preview
          </Button>
        </div>
      ),
    },
    {
      field: 'verified',
      headerName: 'Verified',
      sortable: false,
      renderCell: (params: GridValueGetterParams) => (
        <Checkbox
          checked={params.row.verified}
          onClick={() => setStatus({
            ...status,
            [params.row.required_document]: status[params.row.required_document] === 'verified' ? undefined : 'verified'
          })
          }
        />
      )
    },
    {
      field: 'unverified',
      headerName: 'Unverified',
      sortable: false,
      renderCell: (params: GridValueGetterParams) => (
        <Checkbox
          checked={params.row.unverified}
          onClick={() => setStatus({
            ...status,
            [params.row.required_document]: status[params.row.required_document] === 'unverified' ? undefined : 'unverified'
          })
          }
        />
      )
    },
  ];
  const rows = [
    {
      id: 1,
      required_document: 'cninc',
      download: '',
      preview: '',
      verified: status.cninc === 'verified',
      unverified: status.cninc === 'unverified',
    },
    {
      id: 2,
      required_document: 'card',
      download: '',
      preview: '',
      verified: status.card === 'verified',
      unverified: status.card === 'unverified',
    },
    {
      id: 3,
      required_document: 'document',
      download: '',
      preview: '',
      verified: status.document === 'verified',
      unverified: status.document === 'unverified',
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        density="compact"
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        showColumnVerticalBorder={false}
        disableColumnFilter
        disableColumnMenu
        hideFooter
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
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
