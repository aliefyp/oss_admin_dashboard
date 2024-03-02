import { Button, Typography } from "@mui/material";
import PageHeading from "components/PageHeading";
import { HiOutlineDownload } from "react-icons/hi";
import Table from "./components/Table";
import { useState } from "react";
import ModalApproveConfirmation from "./components/ModalApproveConfirmation";
import ModalRejectConfirmation from "./components/ModalRejectConfirmation";
import { useTranslation } from "react-i18next";

const ApplicantDetail: React.FC = () => {
  const { t } = useTranslation();

  const [openApproveConfirmation, setOpenApproveConfirmation] = useState(false);
  const [openRejectConfirmation, setOpenRejectConfirmation] = useState(false);



const PERSONAL_DETAILS = [
  {
    label: t('page_applicant_detail.section_identity.label_id'),
    value: "099-864-351-uu",
  },
  {
    label: t('page_applicant_detail.section_identity.label_identity_number'),
    value: "12345678901234",
  },
  {
    label: t('page_applicant_detail.section_identity.label_first_name'),
    value: "Manuel",
  },
  {
    label: t('page_applicant_detail.section_identity.label_email'),
    value: "Manuel.Belo@gmail.com",
  },
  {
    label: t('page_applicant_detail.section_identity.label_last_name'),
    value: "Manuel Moniz Belo",
  },
  {
    label: t('page_applicant_detail.section_identity.label_phone'),
    value: "+92 234 434 222",
  },
  {
    label: t('page_applicant_detail.section_identity.label_identity_type'),
    value: "Citizen Card",
  },
  {
    label: t('page_applicant_detail.section_identity.label_gender'),
    value: "Male",
  },
];

const BIRTH_DETAILS = [
  {
    label: t('page_applicant_detail.section_identity.label_birth_date'),
    value: "12-09-1993",
  },
  {
    label: t('page_applicant_detail.section_identity.label_country'),
    value: "Timor-Leste",
  },
  {
    label: t('page_applicant_detail.section_identity.label_state'),
    value: "Aileu",
  },
  {
    label: t('page_applicant_detail.section_identity.label_city'),
    value: "Laulara",
  },
];

const LOCAL_RESIDENCE = [
  {
    label: t('page_applicant_detail.section_identity.label_country'),
    value: "Timor-Leste",
  },
  {
    label: t('page_applicant_detail.section_identity.label_state'),
    value: "Aileu",
  },
  {
    label: t('page_applicant_detail.section_identity.label_city'),
    value: "Laulara",
  },
];

const DETAILS_DATA = [
  {
    span: 2,
    title: t('page_applicant_detail.section_identity.subtitle_personal'),
    data: PERSONAL_DETAILS,
  },
  {
    span: 1,
    title: t('page_applicant_detail.section_identity.subtitle_birth'),
    data: BIRTH_DETAILS,
  },
  {
    span: 1,
    title: t('page_applicant_detail.section_identity.subtitle_local'),
    data: LOCAL_RESIDENCE,
  },
];

  return (
    <>
      <PageHeading title={t('page_applicant_detail.title')} withBackButton />

      <div className="space-y-4">

        {/* card status */}
        <div className="border rounded-lg py-2 px-3">
          <div className="flex justify-between items-center">
            <Typography variant="body2" className="m-0">
              {t('page_applicant_detail.applying_for')}: <b>Re-new Passport</b>
            </Typography>
            <Typography variant="body2" className="m-0">
              {t('page_applicant_detail.deliver')}: <b>Normal</b>
            </Typography>
            <Button variant="text" className="flex items-center gap-1 !py-1">
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
            <div className="col-span-1">
              <img
                src="https://via.placeholder.com/150"
                alt="citizen identity"
              />
            </div>
            {DETAILS_DATA.map(item => (
              <div key={item.title} className={`col-span-${item.span} border-r last:border-r-0 pl-4 pr-2`}>
                <Typography variant="h6" className="!mb-7">
                  {item.title}
                </Typography>
                <div className={`grid grid-cols-${item.span} gap-4`}>
                  {item.data.map(i => (
                    <div key={i.label} className="col-span-1">
                      <Typography variant="body2" className="!text-gray-500">{i.label}</Typography>
                      <Typography variant="body2" className="!font-bold">{i.value}</Typography>
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