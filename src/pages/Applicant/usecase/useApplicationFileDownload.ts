import FileSaver from 'file-saver';
import { EP_APPLICATIONS } from "constants/endpoints";
import useFetcher from "usecase/useFetcher";
import { useState } from 'react';

const useApplicationFileDownload = () => {
  const fetcher = useFetcher();
  const [downloading, setDownloading] = useState(false);

  const downloadFile = async (applicationId: number) => {
    setDownloading(true);

    try {
      const detail = await fetcher('GET', `${EP_APPLICATIONS}/${applicationId}`);

      if (detail.errorMessage) {
        throw new Error(detail.errorMessage);
      }

      const files = detail.data?.files
      const filePromises = files.map((file) => {
        return fetcher('GET', `${EP_APPLICATIONS}/${applicationId}/files/${file.id}`, {
          headers: {
            'Content-Type': 'application/octet-stream'
          }
        }, true)
      });

      const results = await Promise.all(filePromises);
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