import { Button, Typography } from "@mui/material";
import PageHeading from "components/PageHeading";
import { HiOutlineDownload } from "react-icons/hi";
import Table from "./components/Table";
import { useMemo, useState } from "react";
import ModalApproveConfirmation from "./components/ModalApproveConfirmation";
import ModalRejectConfirmation from "./components/ModalRejectConfirmation";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const DUMMY_DATA = {
  "success": true,
  "errorMessage": "string",
  "data": {
    "id": 0,
    "personalDetail": {
      "firstName": "string",
      "lastName": "string",
      "identityType": "CitizenCard",
      "identityNumber": "string",
      "email": "string",
      "phoneNumber": "string",
      "gender": "Female",
      "photo": {
        "id": 0,
        "fileName": "string"
      },
      "identity": {
        "id": 0,
        "fileName": "string"
      }
    },
    "birthDetail": {
      "dateOfBirth": "2024-03-18T14:47:42.900Z",
      "countryCode": "string",
      "country": "string",
      "municipalityCode": "string",
      "municipality": "string",
      "postAdministrativeCode": "string",
      "postAdministrative": "string",
      "sucosCode": "string",
      "sucos": "string"
    },
    "residenceDetail": {
      "address": "string",
      "countryCode": "string",
      "country": "string",
      "municipalityCode": "string",
      "municipality": "string",
      "postAdministrativeCode": "string",
      "postAdministrative": "string",
      "sucosCode": "string",
      "sucos": "string"
    },
    "familyDetail": {
      "familyType": "Self",
      "firstName": "string",
      "lastName": "string",
      "gender": "Female",
      "dateOfBirth": "2024-03-18T14:47:42.901Z"
    },
    "files": [
      {
        "id": 0,
        "fileName": "string",
        "status": "Pending"
      }
    ],
    "serviceType": "string",
    "service": "string",
    "submissionAt": "string",
    "reviewStep": "string",
    "status": "string",
    "deliveryTime": "Normal"
  },
  "metadata": {
    "currentPage": 0,
    "totalPages": 0,
    "pageSize": 0,
    "totalCount": 0
  }
}

const ApplicantDetail: React.FC = () => {
  const { t } = useTranslation();

  const [openApproveConfirmation, setOpenApproveConfirmation] = useState(false);
  const [openRejectConfirmation, setOpenRejectConfirmation] = useState(false);

  const data = DUMMY_DATA;

  const personalDetails = useMemo(() => {
    if (data?.data === undefined) return [];
    const { personalDetail } = data.data;

    return [
      {
        label: t('page_applicant_detail.section_identity.label_id'),
        value: data?.data.id,
      },
      {
        label: t('page_applicant_detail.section_identity.label_identity_number'),
        value: personalDetail.identityNumber,
      },
      {
        label: t('page_applicant_detail.section_identity.label_first_name'),
        value: personalDetail.firstName,
      },
      {
        label: t('page_applicant_detail.section_identity.label_email'),
        value: personalDetail.email,
      },
      {
        label: t('page_applicant_detail.section_identity.label_last_name'),
        value: personalDetail.lastName,
      },
      {
        label: t('page_applicant_detail.section_identity.label_phone'),
        value: personalDetail.phoneNumber,
      },
      {
        label: t('page_applicant_detail.section_identity.label_identity_type'),
        value: personalDetail.identityType,
      },
      {
        label: t('page_applicant_detail.section_identity.label_gender'),
        value: personalDetail.gender,
      },
    ];
  }, [data]);


  const birthDetails = useMemo(() => {
    if (data?.data === undefined) return [];
    const { birthDetail } = data.data;

    return [
      {
        label: t('page_applicant_detail.section_identity.label_birth_date'),
        value: dayjs(birthDetail.dateOfBirth).format('DD-MM-YYYY'),
      },
      {
        label: t('page_applicant_detail.section_identity.label_country'),
        value: birthDetail.country,
      },
      {
        label: t('page_applicant_detail.section_identity.label_state'),
        value: birthDetail.municipality,
      },
      {
        label: t('page_applicant_detail.section_identity.label_city'),
        value: birthDetail.postAdministrative,
      },
    ];
  }, [data])

  const residenceDetails = useMemo(() => {
    if (data?.data === undefined) return [];
    const { residenceDetail } = data.data;

    return [
      {
        label: t('page_applicant_detail.section_identity.label_country'),
        value: residenceDetail.country,
      },
      {
        label: t('page_applicant_detail.section_identity.label_state'),
        value: residenceDetail.municipality
      },
      {
        label: t('page_applicant_detail.section_identity.label_city'),
        value: residenceDetail.postAdministrative
      },
    ];
  }, [])

  const DETAILS_DATA = [
    {
      span: 2,
      title: t('page_applicant_detail.section_identity.subtitle_personal'),
      data: personalDetails,
    },
    {
      span: 1,
      title: t('page_applicant_detail.section_identity.subtitle_birth'),
      data: birthDetails,
    },
    {
      span: 1,
      title: t('page_applicant_detail.section_identity.subtitle_local'),
      data: residenceDetails,
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