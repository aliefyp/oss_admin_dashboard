import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useMunicipality } from "api/region";
import PageHeading from "components/PageHeading";
import ModalConfirmation from "./components/ModalConfirmation";
import ModalSuccess from "./components/ModalSuccess";

interface AccountForm {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  organization: string;
  role: string;
  services: string[];
  municipality: string[];
}

const ROLES = [
  { id: '1', key: 'fo', name: 'FO' },
  { id: '2', key: 'fom', name: 'FO Manager' },
  { id: '3', key: 'bo', name: 'BO' },
  { id: '4', key: 'bom', name: 'BO Manager' },
  { id: '5', key: 'admin', name: 'Super Admin' },
]

const ManagementForm = () => {
  const { t } = useTranslation();
  const { user_id } = useParams();

  const { watch, control, register, handleSubmit, formState, setValue } = useForm<AccountForm>({
    defaultValues: {
      first_name: undefined,
      last_name: undefined,
      email: undefined,
      phone_number: undefined,
      organization: undefined,
      role: undefined,
      services: [],
      municipality: ['0'],
    }
  });

  const watchMunicipality = watch('municipality');

  useEffect(() => {
    const hasMunicipalityAll = watchMunicipality.includes('0');
    const lastMunicipality = watchMunicipality?.[watchMunicipality?.length - 1];
    const lastMunicipalityIsAll = lastMunicipality === '0';

    if (hasMunicipalityAll && watchMunicipality.length > 1) {
      if (lastMunicipalityIsAll) {
        setValue('municipality', ['0']);
      } else {
        setValue('municipality', watchMunicipality.filter((item: string) => item !== '0'));
      }
    }

  }, [setValue, watchMunicipality])

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

  const { data: dataMunicipality } = useMunicipality({
    countryCode: 'TL',
  });

  const municipalityList = [{ key: '0', label: 'All Municipality' }, ...dataMunicipality?.data?.map((item) => ({
    key: item.code,
    label: item.name,
  })) || []];

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
                  fullWidth
                  required
                  error={!!formState.errors.email}
                  helperText={formState.errors.email?.message}
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'This field is required'
                    },
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />

                <TextField
                  variant="standard"
                  label={t('page_management_form.section_identity.label_phone_number')}
                  fullWidth
                  required
                  error={!!formState.errors.phone_number}
                  helperText={formState.errors.phone_number?.message}
                  {...register('phone_number', {
                    required: {
                      value: true,
                      message: 'This field is required'
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: 'Invalid phone number'
                    }
                  })}
                />

                <FormControl>
                  <InputLabel
                    id="input-role-label"
                    required
                    sx={{
                      [`&.MuiInputLabel-root`]: {
                        marginLeft: '-14px',
                      }
                    }}
                  >
                    {t('page_management_form.section_identity.label_role')}
                  </InputLabel>
                  <Controller
                    control={control}
                    name="role"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        variant="standard"
                        labelId="role"
                        id="input-role"
                        error={!!formState.errors.role}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                      >
                        {ROLES.map((role) => (
                          <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {formState.errors.role?.message && (
                    <FormHelperText error>{formState.errors.role?.message}</FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <InputLabel
                    id="input-organization-label"
                    required
                    sx={{
                      [`&.MuiInputLabel-root`]: {
                        marginLeft: '-14px',
                      }
                    }}
                  >
                    {t('page_management_form.section_identity.label_organization')}
                  </InputLabel>
                  <Controller
                    control={control}
                    name="organization"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        variant="standard"
                        labelId="organization"
                        id="input-organization"
                        error={!!formState.errors.organization}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                      >
                        {/* {DUMMY_REASON.map((svc) => (
                          <MenuItem key={svc.id} value={svc.id}>{svc.name}</MenuItem>
                        ))} */}
                      </Select>
                    )}
                  />
                  {formState.errors.organization?.message && (
                    <FormHelperText error>{formState.errors.organization?.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
            </section>

            <section>
              <Typography variant="h5">{t('page_management_form.section_municipality.title')}</Typography>
              <FormGroup className="!grid grid-cols-4 gap-2 mt-6">
                {municipalityList.map(municipality => (
                  <Controller
                    key={municipality.key}
                    control={control}
                    name="municipality"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <FormControlLabel
                          label={municipality.label}
                          control={
                            <Checkbox
                              value={municipality.key}
                              checked={value?.includes(municipality.key)}
                              onChange={e => {
                                if (e.target.checked) {
                                  onChange([...watchMunicipality, e.target.value]);
                                  return;
                                }

                                onChange(watchMunicipality?.filter((item: string) => item !== e.target.value));
                              }}
                            />
                          }
                        />
                      )
                    }}
                  />
                ))}
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