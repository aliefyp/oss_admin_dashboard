import { Button, Checkbox, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiDownload, HiOutlineDocumentSearch } from 'react-icons/hi';

const Table = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState({
    cninc: undefined,
    card: undefined,
    document: undefined,
  })

  const columns: GridColDef[] = [
    {
      field: 'required_document',
      headerName: t('page_applicant_detail.section_document.row_document'),
      sortable: false,
      flex: 1,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <Typography variant="body2" className="w-[200px]">
            {t(`page_applicant_detail.section_document.scanned_${params.row.required_document}`)}
          </Typography>
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
            {t('page_applicant_detail.section_document.cta_download')}
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
            {t('page_applicant_detail.section_document.cta_preview')}
          </Button>
        </div>
      ),
    },
    {
      field: 'verified',
      headerName: t('page_applicant_detail.section_document.row_verified'),
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
      headerName: t('page_applicant_detail.section_document.row_unverified'),
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
