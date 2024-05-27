import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useMunicipality } from "api/region";
import PageHeading from "components/PageHeading";
import ModalConfirmation from "./components/ModalConfirmation";
import ModalSuccess from "./components/ModalSuccess";
import { useCreateOfficer, useOfficerDetail, useUpdateOfficer } from "api/officer";
import PageLoader from "components/PageLoader";
import { UserFormType } from "./types";
import UserForm from "./components/UserForm";
import useToaster from "usecase/useToaster";

const ManagementForm = () => {
  const toaster = useToaster();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user_id } = useParams();
  const isEdit = !!user_id;

  const createOfficer = useCreateOfficer();
  const updateOfficer = useUpdateOfficer();
  const { data, isFetching } = useOfficerDetail(Number(user_id));
  const userDetail = data?.data;

  const [loading, setLoading] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState({
    open: false,
    title: '',
    description: '',
    ctaPrimary: '',
    ctaSecondary: '',
    onPrimaryClick: () => { },
    onSecondaryClick: () => { },
  });
  const [modalSuccess, setModalSuccess] = useState({
    open: false,
    title: '',
    description: '',
    ctaText: '',
    onConfirm: () => { },
  });

  const { data: dataMunicipality } = useMunicipality({
    countryCode: 'TL',
  });

  const municipalityList = [{ key: 0, label: 'All Municipality' }, ...dataMunicipality?.data?.map((item) => ({
    key: item.id,
    label: item.name,
  })) || []];

  const isAllMunicipalityChecked = (stateIds: number[]) => {
    return stateIds.includes(0);
  }

  const allMunicipalityId = municipalityList.filter(m => m.key !== 0).map(m => m.key);

  const handleEdit = async (data: UserFormType) => {
    setModalConfirmation({ ...modalConfirmation, open: false });
    try {
      setLoading(true);
      const payload = {
        ...data,
        stateIds: isAllMunicipalityChecked(data.stateIds) ? allMunicipalityId : data.stateIds,
      }
      const res = await updateOfficer(Number(user_id), payload)
      if (!res) throw new Error('Failed to update officer');


      setModalSuccess({
        open: true,
        title: t('page_management_form.modal_success.update_title'),
        description: t('page_management_form.modal_success.update_description'),
        ctaText: t('page_management_form.modal_success.update_cta'),
        onConfirm: () => navigate('/management', { replace: true }),
      })
    } catch (error) {
      console.error(error);
      toaster.open(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = async (data: UserFormType) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        stateIds: isAllMunicipalityChecked(data.stateIds) ? allMunicipalityId : data.stateIds,
      }
      const res = await createOfficer(payload)
      if (!res) throw new Error('Failed to create officer');


      setModalSuccess({
        open: true,
        title: t('page_management_form.modal_success.create_title'),
        description: t('page_management_form.modal_success.create_description'),
        ctaText: t('page_management_form.modal_success.create_cta'),
        onConfirm: () => navigate('/management', { replace: true }),
      })
    } catch (error) {
      console.error(error);
      toaster.open(error.message);
    } finally {
      setLoading(false);
    }
  }

  const submitForm = (data: UserFormType) => {
    if (isEdit) {
      setModalConfirmation({
        open: true,
        title: t('page_management_form.modal_confirmation.update_title'),
        description: t('page_management_form.modal_confirmation.update_description'),
        ctaPrimary: t('page_management_form.modal_confirmation.update_primary_cta'),
        ctaSecondary: t('page_management_form.modal_confirmation.update_secondary_cta'),
        onPrimaryClick: () => handleEdit(data),
        onSecondaryClick: () => {
          setModalConfirmation({ ...modalConfirmation, open: false });
        }
      });
    } else {
      handleCreate(data);
    }
  }

  const defaultValues = useMemo(() => {
    if (!isEdit) {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        organizationId: 0,
        roleGroup: '',
        stateIds: [0],
      }
    };

    return {
      firstName: userDetail?.firstName || '',
      lastName: userDetail?.lastName || '',
      email: userDetail?.email || '',
      phoneNumber: userDetail?.phoneNumber || '',
      organizationId: userDetail?.organizationId || 0,
      roleGroup: userDetail?.roleGroup || '',
      stateIds: userDetail?.stateIds.length === allMunicipalityId.length ? [0] : userDetail?.stateIds || [0],
    }
  }, [isEdit, allMunicipalityId, userDetail])

  return (
    <>
      {isFetching && (
        <PageLoader />
      )}
      <div className="max-w-screen-lg">
        <PageHeading
          withBackButton
          title={isEdit ? t('page_management_form.title_edit') : t('page_management_form.title_new')}
        />
        {!(isEdit && isFetching) && (
          <UserForm loading={loading} isEdit={isEdit} defaultValues={defaultValues} municipalityList={municipalityList} onSubmit={submitForm} />
        )}
      </div>

      <ModalConfirmation {...modalConfirmation} />
      <ModalSuccess {...modalSuccess} />

    </>
  );
}

export default ManagementForm;