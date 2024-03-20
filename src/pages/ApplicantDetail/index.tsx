import { useCallback, useEffect, useState } from "react";
import FileSaver from "file-saver";
import { HiOutlineDownload } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useApplicationDetail, useLazyApplicationFiles } from "api/application";
import { useLazyFiles } from "api/files";
import PageHeading from "components/PageHeading";
import PageLoader from "components/PageLoader";
import Table from "./components/Table";
import ModalApproveConfirmation from "./components/ModalApproveConfirmation";
import ModalRejectConfirmation from "./components/ModalRejectConfirmation";
import useNormalizedData from "./usecase/useNormalizedData";

const ApplicantDetail: React.FC = () => {
  const { t } = useTranslation();
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);
  const [downloading, setDownloading] = useState(false);

  const { applicant_id } = useParams();

  const [openApproveConfirmation, setOpenApproveConfirmation] = useState(false);
  const [openRejectConfirmation, setOpenRejectConfirmation] = useState(false);

  const getFiles = useLazyFiles();
  const getApplicationFiles = useLazyApplicationFiles();
  const { data, isFetching } = useApplicationDetail(Number(applicant_id));
  const normalizedData = useNormalizedData(data);

  const getProfilePicture = useCallback(async () => {
    try {
      const blob = await getFiles([data?.data?.personalDetail?.photo?.id])
      
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob[0]);
      setProfilePicture(imageUrl);
    } catch (error) {
      console.error(error);
    }
  }, [data?.data?.personalDetail?.photo?.id, getFiles])
  
  const handleDownloadFiles = async () => {
    try {
      setDownloading(true);
      const files = data?.data?.files;
      const results = await getApplicationFiles(Number(applicant_id), files.map((file) => file.id));

      results.forEach((result, index) => {
        FileSaver.saveAs(result, files[index].fileName);
      });
      setDownloading(false);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (data?.data?.personalDetail?.photo && !profilePicture) {
      getProfilePicture()
    }
  }, [data?.data?.personalDetail?.photo, profilePicture, getProfilePicture])

  return (
    <>
      {(isFetching || downloading) && (
        <PageLoader />
      )}

      <PageHeading title={t('page_applicant_detail.title')} withBackButton />

      <div className="space-y-4">

        {/* card status */}
        <div className="border rounded-lg py-2 px-3">
          <div className="flex justify-between items-center">
            <Typography variant="body2" className="m-0">
              {t('page_applicant_detail.applying_for')}: <b>{data?.data?.service}</b>
            </Typography>
            <Typography variant="body2" className="m-0">
              {t('page_applicant_detail.deliver')}: <b>{data?.data?.deliveryTime}</b>
            </Typography>
            <Button variant="text" className="flex items-center gap-1 !py-1" onClick={handleDownloadFiles}>
              <HiOutlineDownload /> {t('page_applicant_detail.download')}
            </Button>
          </div>
        </div>

        {/* card detail */}
        <div className="border rounded-lg pt-4 pb-6 px-3">
          <Typography variant="h4" className="!mb-6">
            {t('page_applicant_detail.section_identity.title')}
          </Typography>
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-1 pr-4">
              <img
                src={profilePicture || '/image_photo_placeholder.jpeg'}
                alt="citizen identity"
              />
            </div>
            {normalizedData?.map(item => (
              <div key={item.title} className={`col-span-${item.span} border-r last:border-r-0 pl-4 pr-2`}>
                <Typography variant="h6" className="!mb-7">
                  {item.title}
                </Typography>
                <div className={`grid grid-cols-${item.span} gap-4`}>
                  {item.data.map(i => (
                    <div key={i.label} className="col-span-1">
                      <Typography variant="body2" className="!text-gray-500">{i.label}</Typography>
                      <Typography variant="body2" className="!font-bold">{i.value || ''}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="py-4 space-y-4">
          <Typography variant="h4">
            {t('page_applicant_detail.section_document.title')}
          </Typography>
          <Table />
          <div className="flex justify-end gap-4">
            <Button
              variant="contained"
              className="w-[200px]"
              onClick={() => setOpenApproveConfirmation(true)}
            >
              {t('page_applicant_detail.section_document.cta_approve')}
            </Button>
            <Button
              variant="contained"
              color="error"
              className="w-[200px]"
              onClick={() => setOpenRejectConfirmation(true)}
            >
              {t('page_applicant_detail.section_document.cta_reject')}
            </Button>
          </div>
        </div>
      </div>

      <ModalApproveConfirmation
        open={openApproveConfirmation}
        onClose={() => setOpenApproveConfirmation(false)}
        onConfirm={() => { }}
      />

      <ModalRejectConfirmation
        open={openRejectConfirmation}
        onClose={() => setOpenRejectConfirmation(false)}
        onConfirm={() => { }}
      />
    </>
  );
}

export default ApplicantDetail;