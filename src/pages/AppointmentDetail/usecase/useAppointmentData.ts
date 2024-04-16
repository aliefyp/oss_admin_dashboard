import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Response } from 'types/application/application-detail';

const useAppointmentData = (data: Response) => {
  const { t } = useTranslation();

  const personalDetails = useMemo(() => {
    if (data?.data === undefined) return [];
    const { personalDetail } = data.data;

    return [
      {
        label: t('page_appointment_detail.section_identity.label_id'),
        value: data?.data.id,
      },
      {
        label: t('page_appointment_detail.section_identity.label_identity_number'),
        value: personalDetail.identityNumber,
      },
      {
        label: t('page_appointment_detail.section_identity.label_first_name'),
        value: personalDetail.firstName,
      },
      {
        label: t('page_appointment_detail.section_identity.label_email'),
        value: personalDetail.email,
      },
      {
        label: t('page_appointment_detail.section_identity.label_last_name'),
        value: personalDetail.lastName,
      },
      {
        label: t('page_appointment_detail.section_identity.label_phone'),
        value: personalDetail.phoneNumber,
      },
      {
        label: t('page_appointment_detail.section_identity.label_identity_type'),
        value: t(`identity_type.${personalDetail.identityType.toLocaleLowerCase()}`),
      },
      {
        label: t('page_appointment_detail.section_identity.label_gender'),
        value: t(`gender.${personalDetail.gender}`),
      },
    ];
  }, [data, t]);

  const appointmentDetail = useMemo(() => {
    if (data?.data === undefined) return [];
    const { residenceDetail } = data.data;

    return [
      {
        label: t('page_appointment_detail.section_identity.label_location'),
        value: residenceDetail.country,
      },
      {
        label: t('page_appointment_detail.section_identity.label_office'),
        value: residenceDetail.municipality
      },
      {
        label: t('page_appointment_detail.section_identity.label_date'),
        value: residenceDetail.postAdministrative
      },
      {
        label: t('page_appointment_detail.section_identity.label_city'),
        value: residenceDetail.sucos
      },
    ];
  }, [data, t])

  return [
    {
      span: 2,
      title: t('page_appointment_detail.section_identity.subtitle_personal'),
      data: personalDetails,
    },
    {
      span: 1,
      title: t('page_appointment_detail.section_identity.subtitle_appointment'),
      data: appointmentDetail,
    }
  ]
}

export default useAppointmentData;