import { useMemo } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Response } from 'types/application/application-detail';

const useNormalizedData = (data: Response) => {
  const { t } = useTranslation();

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
      {
        label: t('page_applicant_detail.section_identity.label_sucos'),
        value: birthDetail.sucos,
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
      {
        label: t('page_applicant_detail.section_identity.label_sucos'),
        value: residenceDetail.sucos
      },
    ];
  }, [data])

  return [
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
    }
  ]
}

export default useNormalizedData;