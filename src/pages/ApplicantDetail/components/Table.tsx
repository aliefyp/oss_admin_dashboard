import { Button, Checkbox, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { HiDownload, HiOutlineDocumentSearch } from 'react-icons/hi';
import { Response } from 'types/application/application-detail';

interface Props {
  files: Response['data']['files'];
  filesStatus: Record<number, string | undefined>;
  disableAction: boolean;
  onDownloadFile: (file: any) => void;
  onPreviewFile: (file: any) => void;
  onFileStatusChange: (id: number, status: string) => void;
}

const Table = ({ files, filesStatus, disableAction, onPreviewFile, onDownloadFile, onFileStatusChange }: Props) => {
  const { t } = useTranslation();

  const handleVerify = (id) => {
    onFileStatusChange(id, 'approved');
  }

  const handleUnVerify = (id) => {
    onFileStatusChange(id, 'rejected');
  }

  const columns: GridColDef[] = [
    {
      field: 'document',
      headerName: '',
      flex: 2,
      sortable: false,
      renderCell: (params: GridValueGetterParams) => (
        <Typography variant="caption" className="!text-gray-500">{params.row.file.fileName}</Typography>
      )
    },
    {
      field: 'download',
      headerName: '',
      sortable: false,
      flex: 1,
      renderCell: (params: GridValueGetterParams) => (
        <div id="download-button" className='hidden'>
          <Button size="small" variant="text" className='space-x-2 hidden' onClick={() => onDownloadFile(params.row.file)}>
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
          <Button size="small" variant="text" className='space-x-2' onClick={() => onPreviewFile(params.row.file)}>
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
          disabled={disableAction}
          checked={params.row.verified}
          onClick={() => handleVerify(params.row.id)}
        />
      )
    },
    {
      field: 'unverified',
      headerName: t('page_applicant_detail.section_document.row_unverified'),
      sortable: false,
      renderCell: (params: GridValueGetterParams) => (
        <Checkbox
          disabled={disableAction}
          checked={params.row.unverified}
          onClick={() => handleUnVerify(params.row.id)}
        />
      )
    },
  ];

  const rows = files?.map((file, index) => ({
    id: file.id,
    file,
    download: '',
    preview: '',
    verified: filesStatus[file.id]?.toLowerCase() === 'approved',
    unverified: filesStatus[file.id]?.toLowerCase() === 'rejected',
  }));

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
