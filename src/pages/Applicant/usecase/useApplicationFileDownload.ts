import FileSaver from 'file-saver';
import { useState } from 'react';
import { useLazyApplicationDetail, useLazyApplicationFiles } from 'api/application';


const useApplicationFileDownload = () => {
  const [downloading, setDownloading] = useState(false);

  const getApplicationDetail = useLazyApplicationDetail();
  const getApplicationFiles = useLazyApplicationFiles();

  const downloadFile = async (applicationId: number) => {
    setDownloading(true);

    try {
      const detail = await getApplicationDetail(applicationId);
      const files = detail?.data?.files;

      if (!files?.length) {
        throw new Error('No files found for this application.');
      };

      const results = await getApplicationFiles(applicationId, files);

      results.forEach((result, index) => {
        FileSaver.saveAs(result, files[index].fileName);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setDownloading(false);
    }
  }

  return { downloadFile, downloading };
}

export default useApplicationFileDownload;