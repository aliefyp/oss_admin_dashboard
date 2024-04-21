import dayjs from "dayjs";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Response } from 'types/appointment/appointment-detail';

const useAppointmentData = (data: Response) => {
  const { t } = useTranslation();

  const personalDetails = useMemo(() => {
    if (data?.data === undefined) return [];

    return [
      {
        label: t('page_appointment_detail.section_identity.label_id'),
        value: data.data.id,
      },
      {
        label: t('page_appointment_detail.section_identity.label_identity_number'),
        value: data.data.identityNumber,
      },
      {
        label: t('page_appointment_detail.section_identity.label_first_name'),
        value: data.data.firstName,
      },
      {
        label: t('page_appointment_detail.section_identity.label_email'),
        value: data.data.email,
      },
      {
        label: t('page_appointment_detail.section_identity.label_last_name'),
        value: data.data.lastName,
      },
      {
        label: t('page_appointment_detail.section_identity.label_phone'),
        value: data.data.phoneNumber,
      },
      {
        label: t('page_appointment_detail.section_identity.label_identity_type'),
        value: t(`identity_type.${data.data.identityType.toLocaleLowerCase()}`),
      },
      {
        label: t('page_appointment_detail.section_identity.label_gender'),
        value: t(`gender.${data.data.gender}`),
      },
    ];
  }, [data, t]);

  const appointmentDetail = useMemo(() => {
    if (data?.data === undefined) return [];

    return [
      {
        label: t('page_appointment_detail.section_identity.label_location'),
        value: data.data.officeLocation,
      },
      {
        label: t('page_appointment_detail.section_identity.label_office'),
        value: data.data.state
      },
      {
        label: t('page_appointment_detail.section_identity.label_date'),
        value: dayjs(data.data.scheduledAt).format('DD MMM YYYY HH:mm')
      },
      {
        label: t('page_appointment_detail.section_identity.label_city'),
        value: data.data.state
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