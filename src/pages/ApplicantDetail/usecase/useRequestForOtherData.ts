import { useTranslation } from "react-i18next";
import { Response } from 'types/application/application-detail';

const useRequestForOtherData = (data: Response) => {
  const { t } = useTranslation();

  if (!data?.data) return [];

  const familyDetail = data?.data?.familyDetail;

  return [
    {
      label: t('page_applicant_detail.section_others.label_request_for'),
      value: familyDetail?.familyType,
    },
    {
      label: t('page_applicant_detail.section_others.label_first_name'),
      value: familyDetail?.firstName,
    },
    {
      label: t('page_applicant_detail.section_others.label_last_name'),
      value: familyDetail.lastName,
    },
    {
      label: t('page_applicant_detail.section_others.label_birth_date'),
      value: familyDetail.dateOfBirth,
    },
    {
      label: t('page_applicant_detail.section_others.label_gender'),
      value: familyDetail.gender,
    }
  ]
}

export default useRequestForOtherData;