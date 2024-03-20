import { Button, Checkbox, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiDownload } from 'react-icons/hi';
import { Response } from 'types/application/application-detail';

interface Props {
  files: Response['data']['files'];
  onDownloadFile: (file: any) => void;
  onApproveFile: (id: number, callback: () => void) => void;
  onRejectFile: (id: number, callback: () => void) => void;
}

const Table = ({ files, onDownloadFile, onApproveFile, onRejectFile }: Props) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState({});

  useEffect(() => {
    const st = {}
    files?.forEach((file) => {
      st[file.id] = file.status
    })
    setStatus(st);
  }, [files])

  const handleVerify = (id) => {
    onApproveFile(id, () => {
      setStatus({
        ...status,
        [id]: status[id] === 'Approved' ? undefined : 'Approved'
      })
    })
  }

  const handleUnVerify = (id) => {
    onRejectFile(id, () => {
      setStatus({
        ...status,
        [id]: status[id] === 'Rejected' ? undefined : 'Rejected'
      })
    })
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
    // {
    //   field: 'preview',
    //   headerName: '',
    //   sortable: false,
    //   flex: 1,
    //   renderCell: (params: GridValueGetterParams) => (
    //     <div id="preview-button" className='hidden'>
    //       <Button size="small" variant="text" className='space-x-2'>
    //         <HiOutlineDocumentSearch />
    //         {t('page_applicant_detail.section_document.cta_preview')}
    //       </Button>
    //     </div>
    //   ),
    // },
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
    verified: status[file.id] === 'Approved',
    unverified: status[file.id] === 'Rejected',
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
