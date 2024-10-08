import { Button, Typography } from "@mui/material";
import { useApplicationDetail, useLazyApplicationFileApprove, useLazyApplicationFileReject, useLazyApplicationFiles } from "api/application";
import useLazyApplicationApprove from "api/application/useLazyApplicationApprove";
import useLazyApplicationReject from "api/application/useLazyApplicationReject";
import { useLazyFiles } from "api/files";
import PageHeading from "components/PageHeading";
import PageLoader from "components/PageLoader";
import FileSaver from "file-saver";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useTranslation } from "react-i18next";
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { UserData } from "types/auth/user";
import useRoleGroup from "usecase/useRoleGroup";
import useToaster from "usecase/useToaster";
import ModalApproveConfirmation from "./components/ModalApproveConfirmation";
import ModalImagePreview from "./components/ModalImagePreview";
import ModalRejectConfirmation from "./components/ModalRejectConfirmation";
import ModalSuccess from "./components/ModalSuccess";
import Table from "./components/Table";
import useCitizenIdentityData from "./usecase/useCitizenIdentityData";
import useRequestForOtherData from "./usecase/useRequestForOtherData";

const ApplicantDetail: React.FC = () => {
  const { t } = useTranslation();
  const toaster = useToaster();
  const navigate = useNavigate();
  const auth = useAuthUser<UserData>();
  const { applicant_id } = useParams();
  const { isFoGroup, isBoGroup } = useRoleGroup(auth?.roleGroup || '');

  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);
  const [previewPicture, setPreviewPicture] = useState<string[] | undefined>([]);
  const [loading, setLoading] = useState(false);
  const [openApproveConfirmation, setOpenApproveConfirmation] = useState(false);
  const [openRejectConfirmation, setOpenRejectConfirmation] = useState(false);
  const [filesStatus, setFilesStatus] = useState({});
  const [successModal, setSuccessModal] = useState({
    open: false,
    title: "",
    description: "",
    ctaText: "",
  })

  const getFiles = useLazyFiles();
  const getApplicationFiles = useLazyApplicationFiles();
  const submitApproveFile = useLazyApplicationFileApprove();
  const submitRejectFile = useLazyApplicationFileReject();
  const submitApproveApplication = useLazyApplicationApprove();
  const submitRejectApplication = useLazyApplicationReject();

  const { data, isFetching } = useApplicationDetail(Number(applicant_id));
  const citizenIdentityData = useCitizenIdentityData(data);
  const requestForOtherData = useRequestForOtherData(data);

  const getFileStatus = useCallback((foStatus: string, boStatus: string) => {
    if (isFoGroup) return foStatus;
    if (isBoGroup) return boStatus;
    return 'pending';
  }, [isBoGroup, isFoGroup]);

  useEffect(() => {
    const st = {}
    const files = data?.data?.files;
    files?.forEach((file) => {
      st[file.id] = getFileStatus(file.frontOfficeStatus, file.backOfficeStatus);
    })
    setFilesStatus(st);
  }, [auth.roleGroup, data?.data?.files, getFileStatus]);

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

  const getFilePreview = useCallback(async (fileIds: number[]) => {
    try {
      const blobs = await getApplicationFiles(data?.data?.id, fileIds);

      const urls = blobs.map((blob) => {
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        return imageUrl;
      });

      setPreviewPicture(urls);
    } catch (error) {
      console.error(error);
    }
  }, [data?.data?.id, getApplicationFiles])

  const downloadFiles = async (files) => {
    try {
      setLoading(true);
      const results = await getApplicationFiles(Number(applicant_id), files.map((file) => file.id));

      results.forEach((result, index) => {
        FileSaver.saveAs(result, files[index].fileName);
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      toaster.open(error.message);
    }
  }

  const handleDownloadAllFiles = () => {
    downloadFiles(data?.data?.files)
  }

  const handleDownloadSingleFile = file => {
    downloadFiles([file])
  }

  const handlePreviewSingleFile = file => {
    getFilePreview([file.id]);
  }

  const handleApproveFile = async (fileId, cb) => {
    try {
      setLoading(true);
      const res = await submitApproveFile(data?.data?.id, fileId)
      if (!res) throw new Error('Failed to approve file');

      cb();
    } catch (error) {
      console.error(error);
      toaster.open(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleRejectFile = async (fileId, cb) => {
    try {
      setLoading(true);
      const res = await submitRejectFile(data?.data?.id, fileId)
      if (!res) throw new Error('Failed to reject file');

      cb();
    } catch (error) {
      console.error(error);
      toaster.open(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleApproveApplication = async (notes: string) => {
    try {
      setLoading(true);
      setOpenApproveConfirmation(false);
      const res = await submitApproveApplication(data?.data?.id, notes)
      if (!res) throw new Error('Failed to approve application');


      setSuccessModal({
        open: true,
        title: t('page_applicant_detail.modal_approve.success_title'),
        description: t('page_applicant_detail.modal_approve.success_description'),
        ctaText: t('page_applicant_detail.modal_approve.success_cta'),
      })
    } catch (error) {
      console.error(error);
      toaster.open(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleRejectApplication = async (notes: string) => {
    try {
      setLoading(true);
      setOpenRejectConfirmation(false);
      const res = await submitRejectApplication(data?.data?.id, notes)
      if (!res) throw new Error('Failed to reject application');

      setSuccessModal({
        open: true,
        title: t('page_applicant_detail.modal_reject.success_title'),
        description: t('page_applicant_detail.modal_reject.success_description'),
        ctaText: t('page_applicant_detail.modal_reject.success_cta'),
      })
    } catch (error) {
      console.error(error);
      toaster.open(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = (fileId: number, status: 'approved' | 'rejected') => {
    const cb = () => {
      setFilesStatus({
        ...filesStatus,
        [fileId]: filesStatus[fileId] === status ? undefined : status
      })
    }

    if (status === 'approved') {
      handleApproveFile(fileId, cb);
    }

    if (status === 'rejected') {
      handleRejectFile(fileId, cb);
    }
  }

  useEffect(() => {
    if (data?.data?.personalDetail?.photo && !profilePicture) {
      getProfilePicture()
    }
  }, [data?.data?.personalDetail?.photo, profilePicture, getProfilePicture])

  const isEligibleToAction = useMemo(() => {
    if (!isBoGroup && !isFoGroup) return false;

    if (isBoGroup) return data?.data?.reviewStep === 'back-office' && data?.data?.status === 'waitingApproval';
    if (isFoGroup) return data?.data?.reviewStep === 'front-office' && data?.data?.status === 'waitingApproval';

    return false;
  }, [data?.data, isBoGroup, isFoGroup])

  const allowToApprove = Object.values(filesStatus).some(status => status === 'approved') && isEligibleToAction;
  const allowToReject = Object.values(filesStatus).some(status => status === 'rejected') && isEligibleToAction;

  return (
    <>
      {(isFetching || loading) && (
        <PageLoader />
      )}

      <PageHeading title={t('page_applicant_detail.title')} withBackButton />

      <div className="space-y-4">

        {/* card status */}
        <div className="border rounded-lg py-2 px-3">
          <div className="flex justify-between items-center">
            <Typography variant="body2" className="m-0">
              {t('page_applicant_detail.applying_for')}: <b>{t(`sub_services.${data?.data?.service}`)}</b>
            </Typography>
            <Typography variant="body2" className="m-0">
              {t('page_applicant_detail.deliver')}: <b>{t(`deliver.${data?.data?.deliveryTime}`)}</b>
            </Typography>
            <Button variant="text" className="flex items-center gap-1 !py-1" onClick={handleDownloadAllFiles}>
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
            {citizenIdentityData?.map(item => (
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

        {/* request for other */}
        {data?.data?.familyDetail?.familyType?.toLocaleLowerCase() !== 'self' && (
          <div className="border rounded-lg pt-4 pb-6 px-3">
            <Typography variant="h4" className="!mb-6">
              {t('page_applicant_detail.section_others.title')}
            </Typography>
            <div className="grid grid-cols-5 gap-2">
              {requestForOtherData.map(i => (
                <div key={i.label} className="col-span-1">
                  <Typography variant="body2" className="!text-gray-500">{i.label}</Typography>
                  <Typography variant="body2" className="!font-bold">{i.value || ''}</Typography>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="py-4 space-y-4">
          <Typography variant="h4">
            {t('page_applicant_detail.section_document.title')}
          </Typography>
          <Table
            files={data?.data?.files || []}
            filesStatus={filesStatus}
            disableAction={!isEligibleToAction}
            onPreviewFile={handlePreviewSingleFile}
            onDownloadFile={handleDownloadSingleFile}
            onFileStatusChange={handleStatusChange}
          />
          <div className="flex justify-between gap-4 items-center">
            <div>
              {!isEligibleToAction && (
                <Typography variant="body2" className="!text-gray-500">
                  You're not eligible to do approval/rejection
                </Typography>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <Button
                disabled={!allowToApprove}
                variant="contained"
                className="w-[200px]"
                onClick={() => setOpenApproveConfirmation(true)}
              >
                {t('page_applicant_detail.section_document.cta_approve')}
              </Button>
              <Button
                disabled={!allowToReject}
                variant="outlined"
                className="w-[200px]"
                onClick={() => setOpenRejectConfirmation(true)}
              >
                {t('page_applicant_detail.section_document.cta_reject')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ModalApproveConfirmation
        open={openApproveConfirmation}
        onClose={() => setOpenApproveConfirmation(false)}
        onConfirm={handleApproveApplication}
      />

      <ModalRejectConfirmation
        open={openRejectConfirmation}
        onClose={() => setOpenRejectConfirmation(false)}
        onConfirm={handleRejectApplication}
      />

      <ModalImagePreview
        images={previewPicture || []}
        open={previewPicture?.length > 0}
        onClose={() => setPreviewPicture([])}
      />

      <ModalSuccess
        {...successModal}
        onConfirm={() => navigate('/applicant')}
      />
    </>
  );
}

export default ApplicantDetail;