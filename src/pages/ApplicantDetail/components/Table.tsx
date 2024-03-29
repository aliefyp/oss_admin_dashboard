import { Button, Checkbox, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { HiDownload, HiOutlineDocumentSearch } from 'react-icons/hi';
import { Response } from 'types/application/application-detail';

interface Props {
  files: Response['data']['files'];
  filesStatus: Record<number, string | undefined>;
  onDownloadFile: (file: any) => void;
  onPreviewFile: (file: any) => void;
  onFileStatusChange: (id: number, status: string) => void;
}

const Table = ({ files, filesStatus, onPreviewFile, onDownloadFile, onFileStatusChange }: Props) => {
  const { t } = useTranslation();

  const handleVerify = (id) => {
    onFileStatusChange(id, 'Approved');
  }

  const handleUnVerify = (id) => {
    onFileStatusChange(id, 'Rejected');
  }

  const columns: GridColDef[] = [
    // {
    //   field: 'required_document',
    //   headerName: t('page_applicant_detail.section_document.row_document'),
    //   sortable: false,
    //   flex: 1,
    //   renderCell: (params: GridValueGetterParams) => {
    //     return (
    //       <Typography variant="body2" className="w-[200px]">
    //         {t(`page_applicant_detail.section_document.scanned_${params.row.required_document}`)}
    //       </Typography>
    //     )
    //   },
    // },
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
          checked={params.row.unverified}
          onClick={() => handleUnVerify(params.row.id)}
        />
      )
    },
  ];

  const rows = files?.map((file, index) => ({
    id: file.id,
    file,
    // required_document: 'cninc',
    download: '',
    preview: '',
    verified: filesStatus[file.id] === 'Approved',
    unverified: filesStatus[file.id] === 'Rejected',
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
