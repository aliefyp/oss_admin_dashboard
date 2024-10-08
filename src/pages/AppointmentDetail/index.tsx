import { Button, Typography } from "@mui/material";
import { useAppointmentDetail, useUpdateAppoinmentStatus } from "api/appointment";
import { useLazyFiles } from "api/files";
import PageHeading from "components/PageHeading";
import PageLoader from "components/PageLoader";
import { APPOINTMENT_STATUS_COLOR } from "constants/appointment";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useToaster from "usecase/useToaster";
import ModalApproveConfirmation from "./components/ModalApproveConfirmation";
import ModalRescheduleConfirmation from "./components/ModalRescheduleConfirmation";
import ModalSuccess from "./components/ModalSuccess";
import useAppointmentData from "./usecase/useAppointmentData";

const AppointmentDetail: React.FC = () => {
  const { t } = useTranslation();
  const toaster = useToaster();
  const navigate = useNavigate();
  const { appointment_id } = useParams();

  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [openApproveConfirmation, setOpenApproveConfirmation] = useState(false);
  const [openRescheduleConfirmation, setOpenRescheduleConfirmation] = useState(false);
  const [successModal, setSuccessModal] = useState({
    open: false,
    title: "",
    description: "",
    ctaText: "",
  })

  const getFiles = useLazyFiles();
  const updateAppointmentStatus = useUpdateAppoinmentStatus({
    appointmentId: Number(appointment_id),
  });

  const { data, isFetching } = useAppointmentDetail(Number(appointment_id));
  const appointmentData = useAppointmentData(data);

  const getProfilePicture = useCallback(async () => {
    try {
      const blob = await getFiles([data?.data?.photoFileId])

      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob[0]);
      setProfilePicture(imageUrl);
    } catch (error) {
      console.error(error);
    }
  }, [data?.data?.photoFileId, getFiles])

  const handleApproveAppointment = async (notes: string) => {
    try {
      setLoading(true);
      setOpenApproveConfirmation(false);
      const res = await updateAppointmentStatus({ status: 'confirm', notes })
      if (!res) throw new Error('Failed to approve appointment');

      setSuccessModal({
        open: true,
        title: t('page_appointment_detail.modal_approve.success_title'),
        description: t('page_appointment_detail.modal_approve.success_description'),
        ctaText: t('page_appointment_detail.modal_approve.success_cta'),
      })
    } catch (error) {
      console.error(error);
      toaster.open(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleRescheduleAppointment = async (notes: string) => {
    try {
      setLoading(true);
      setOpenRescheduleConfirmation(false);
      const res = await updateAppointmentStatus({ status: 'reject', notes })
      if (!res) throw new Error('Failed to reject application');

      setSuccessModal({
        open: true,
        title: t('page_appointment_detail.modal_reject.success_title'),
        description: t('page_appointment_detail.modal_reject.success_description'),
        ctaText: t('page_appointment_detail.modal_reject.success_cta'),
      })
    } catch (error) {
      console.error(error);
      toaster.open(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (data?.data?.photoFileId && !profilePicture) {
      getProfilePicture()
    }
  }, [data?.data?.photoFileId, profilePicture, getProfilePicture])

  const status = data?.data?.status?.toLowerCase();
  const statusColor = APPOINTMENT_STATUS_COLOR[status];

  const isEligibleToAction = status === 'waitingapproval';

  return (
    <>
      {(isFetching || loading) && (
        <PageLoader />
      )}

      <PageHeading title={t('page_appointment_detail.title')} withBackButton />

      <div className="space-y-4">

        {/* card status */}
        <div className="border rounded-lg py-2 px-3">
          <div className="flex justify-between items-center">
            <Typography variant="body2" className="m-0">
              {t('page_appointment_detail.service')}: <b>{t(`services.${data?.data?.serviceType}`)}</b>
            </Typography>
            <Typography variant="body2" className="m-0">
              {t('page_appointment_detail.purpose')}: <b>{t(`sub_services.${data?.data?.service}`)}</b>
            </Typography>
            <Typography variant="body2" className="m-0">
              {t('page_appointment_detail.status')}: <b className={`text-${statusColor}-500`}>{t(`appointment_status.${status}`)}</b>
            </Typography>
          </div>
        </div>

        {/* card detail */}
        <div className="border rounded-lg pt-4 pb-6 px-3">
          <Typography variant="h4" className="!mb-6">
            {t('page_appointment_detail.section_identity.title')}
          </Typography>
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-1 pr-4">
              <img
                src={profilePicture || '/image_photo_placeholder.jpeg'}
                alt="citizen identity"
              />
            </div>
            {appointmentData?.map(item => (
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

        <div className="flex justify-between gap-4 items-center">
          <Typography variant="body1" className="grow text-gray-600">
            {t('page_appointment_detail.instruction')}
          </Typography>
          <Button
            variant="contained"
            className="w-[200px] shrink-0"
            disabled={!isEligibleToAction}
            onClick={() => setOpenApproveConfirmation(true)}
          >
            {t('page_appointment_detail.cta_approve')}
          </Button>
          <Button
            variant="outlined"
            className="w-[200px] shrink-0"
            disabled={!isEligibleToAction}
            onClick={() => setOpenRescheduleConfirmation(true)}
          >
            {t('page_appointment_detail.cta_reject')}
          </Button>
        </div>
      </div>

      <ModalApproveConfirmation
        open={openApproveConfirmation}
        onClose={() => setOpenApproveConfirmation(false)}
        onConfirm={handleApproveAppointment}
      />

      <ModalRescheduleConfirmation
        open={openRescheduleConfirmation}
        onClose={() => setOpenRescheduleConfirmation(false)}
        onConfirm={handleRescheduleAppointment}
      />

      <ModalSuccess
        {...successModal}
        onConfirm={() => navigate('/appointment')}
      />
    </>
  );
}

export default AppointmentDetail;