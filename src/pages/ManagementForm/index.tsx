import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { useMunicipality } from "api/region";
import { useServicesType } from "api/service";
import PageHeading from "components/PageHeading";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ModalConfirmation from "./components/ModalConfirmation";
import { useState } from "react";
import ModalSuccess from "./components/ModalSuccess";
import { Controller, useForm } from "react-hook-form";

interface AccountForm {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  id_card: string;
  organization: string;
  role: string;
  services: string[];
  municipality: string;
}

const ROLES = [
  { id: 1, key: 'fo', name: 'FO', description: 'This role assisting visitors and managing inquiries effectively' },
  { id: 2, key: 'fom', name: 'FO Manager', description: 'This role assisting visitors and managing inquiries effectively' },
  { id: 3, key: 'bo', name: 'BO', description: 'This role assisting visitors and managing inquiries effectively' },
  { id: 4, key: 'bom', name: 'BO Manager', description: 'This role assisting visitors and managing inquiries effectively' },
  { id: 5, key: 'admin', name: 'Super Admin', description: 'This role assisting visitors and managing inquiries effectively' },
]

const ManagementForm = () => {
  const { t } = useTranslation();
  const { user_id } = useParams();

  const { watch, control, register, handleSubmit, formState } = useForm<AccountForm>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      id_card: '',
      organization: '',
      role: '',
      services: [],
      municipality: '',
    }
  });
  const watchServices = watch('services');

  console.log(formState.errors)

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

  console.log(setModalSuccess)

  const isEdit = !!user_id;

  const { data: dataServices } = useServicesType();
  const { data: dataMunicipality } = useMunicipality({
    countryCode: 'TL',
  });

  const serviceList = dataServices?.data?.map((item) => ({
    key: item.code,
    label: item.name,
  })) || [];

  const municipalityList = dataMunicipality?.data?.map((item) => ({
    key: item.code,
    label: item.name,
  })) || [];

  const handleEdit = (data: AccountForm) => {
    setModalConfirmation({ ...modalConfirmation, open: false });
    console.log('edit', data)
  }

  const handleCreate = (data: AccountForm) => {
    console.log('create')
  }

  const submitForm = (data: AccountForm) => {
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
      return;
    }

    handleCreate(data);
  }

  return (
    <>
      <div className="max-w-screen-lg">
        <PageHeading
          withBackButton
          title={isEdit ? t('page_management_form.title_edit') : t('page_management_form.title_new')}
        />

        <form noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
          <div className="space-y-14">
            <section>
              <Typography variant="h5">{t('page_management_form.section_identity.title')}</Typography>
              <div className="grid grid-cols-2 gap-6 gap-y-8 mt-6">
                <TextField
                  variant="standard"
                  label={t('page_management_form.section_identity.label_first_name')}
                  placeholder={t('page_management_form.section_identity.label_first_name')}
                  fullWidth
                  required
                  error={!!formState.errors.first_name}
                  helperText={formState.errors.first_name?.message}
                  {...register('first_name', {
                    required: {
                      value: true,
                      message: 'This field is required'
                    }
                  })}
                />
                <TextField
                  variant="standard"
                  label={t('page_management_form.section_identity.label_last_name')}
                  placeholder={t('page_management_form.section_identity.label_last_name')}
                  fullWidth
                  required
                  error={!!formState.errors.last_name}
                  helperText={formState.errors.last_name?.message}
                  {...register('last_name', {
                    required: {
                      value: true,
                      message: 'This field is required'
                    }
                  })}
                />
                <TextField
                  variant="standard"
                  label={t('page_management_form.section_identity.label_email')}
                  placeholder={t('page_management_form.section_identity.label_email')}
                  fullWidth
                  required
                  error={!!formState.errors.email}
                  helperText={formState.errors.email?.message}
                  {...register('email', {
                    required: { value: true, message: 'This field is required' },
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                  })}
                />
                <TextField
                  variant="standard"
                  label={t('page_management_form.section_identity.label_phone_number')}
                  placeholder={t('page_management_form.section_identity.label_phone_number')}
                  fullWidth
                  required
                  error={!!formState.errors.phone_number}
                  helperText={formState.errors.phone_number?.message}
                  {...register('phone_number', {
                    required: { value: true, message: 'This field is required' },
                    pattern: { value: /^\d+$/, message: 'Invalid phone number' }
                  })}
                />
                <TextField
                  variant="standard"
                  label={t('page_management_form.section_identity.label_id_card')}
                  placeholder={t('page_management_form.section_identity.label_id_card')}
                  fullWidth
                  required
                  error={!!formState.errors.id_card}
                  helperText={formState.errors.id_card?.message}
                  {...register('id_card', {
                    required: {
                      value: true,
                      message: 'This field is required'
                    }
                  })}
                />

                <FormControl>
                  <InputLabel error={!!formState.errors.organization}>{t('page_management_form.section_identity.label_organization')}</InputLabel>
                  <Select
                    variant="standard"
                    labelId="organization"
                    id="input-organization"
                    label={t('page_management_form.section_identity.label_organization')}
                    placeholder={t('page_management_form.section_identity.label_organization')}
                    error={!!formState.errors.organization}
                    {...register('organization', {
                      required: {
                        value: true,
                        message: 'This field is required'
                      },
                    })}
                  >
                    <MenuItem value="0" className=" !text-gray-400">{t('page_management_form.section_identity.label_organization')}</MenuItem>
                    {/* {DUMMY_REASON.map((svc) => (
                      <MenuItem key={svc.id} value={svc.id}>{svc.name}</MenuItem>
                    ))} */}
                  </Select>
                  {formState.errors.organization?.message && (
                    <FormHelperText error>{formState.errors.organization?.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
            </section>

            <section>
              <Typography variant="h5">{t('page_management_form.section_role.title')}</Typography>
              <RadioGroup
                className="!grid grid-cols-4 gap-6 my-6"
                {...register('role', {
                  required: {
                    value: true,
                    message: 'This field is required'
                  }
                })}>
                {ROLES.map(role => (
                  <FormControlLabel
                    value={role.id}
                    control={<Radio />}
                    className="!items-start"
                    label={(
                      <div>
                        <Typography variant="h6">{t(`page_management_form.section_role.role_${role.key}`)}</Typography>
                        <Typography variant="body2">{t(`page_management_form.section_role.role_${role.key}_description`)}</Typography>
                      </div>
                    )}
                  />
                ))}
              </RadioGroup>
              {formState.errors.role?.message && (
                <FormHelperText error>{formState.errors.role?.message}</FormHelperText>
              )}
            </section>

            <section>
              <Typography variant="h5">{t('page_management_form.section_services.title')}</Typography>
              <FormGroup className="!grid grid-cols-4 gap-6 mt-6">
                {serviceList.map(service => (
                  <Controller
                    key={service.key}
                    control={control}
                    name="services"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <FormControlLabel
                          label={t(`services.${service.label}`)}
                          control={
                            <Checkbox
                              value={service.key}
                              checked={value?.includes(service.key)}
                              onChange={e => {
                                if (e.target.checked) {
                                  onChange([...watchServices, e.target.value]);
                                  return;
                                }

                                onChange(watchServices?.filter((item: string) => item !== e.target.value));
                              }}
                            />
                          }
                        />
                      )
                    }}
                  />
                ))}
                {formState.errors.services?.message && (
                  <FormHelperText error>{formState.errors.services?.message}</FormHelperText>
                )}
              </FormGroup>
            </section>

            <section>
              <Typography variant="h5">{t('page_management_form.section_municipality_area.title')}</Typography>
              <FormGroup className="mt-6 w-1/2">
                <Select
                  variant="standard"
                  labelId="municipality"
                  id="input-municipality"
                  defaultValue="0"
                  label={t('page_management_form.section_municipality_area.label_municipality')}
                  placeholder={t('page_management_form.section_municipality_area.label_municipality')}
                  {...register('municipality', {
                    required: {
                      value: true,
                      message: 'This field is required'
                    }
                  })}
                >
                  <MenuItem value="0" className=" !text-gray-400">{t('page_management_form.section_municipality_area.label_municipality')}</MenuItem>
                  {municipalityList.map((m) => (
                    <MenuItem key={m.key} value={m.key}>{m.label}</MenuItem>
                  ))}
                </Select>
                {formState.errors.municipality?.message && (
                  <FormHelperText error>{formState.errors.municipality?.message}</FormHelperText>
                )}
              </FormGroup>
            </section>

            <section>
              <Button type="submit" variant="contained" color="primary" className="w-[200px]">
                {isEdit ? t('page_management_form.cta_submit_edit') : t('page_management_form.cta_submit_new')}
              </Button>
            </section>
          </div>
        </form>
      </div>

      <ModalConfirmation {...modalConfirmation} />

      <ModalSuccess {...modalSuccess} />

    </>
  );
}

export default ManagementForm;