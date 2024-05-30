import { Controller, useForm } from "react-hook-form";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { UserFormType } from "../types";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";


interface Option {
  key: number;
  label: string;
}

interface Option2 {
  key: string;
  label: string;
}

interface Props {
  loading: boolean;
  isEdit: boolean;
  defaultValues?: UserFormType;
  municipalityList: Option[];
  roleGroupList: Option2[];
  organizationList: Option[];
  onSubmit: (val: UserFormType) => void;
}

const UserForm = ({
  loading,
  isEdit,
  defaultValues,
  municipalityList,
  roleGroupList,
  organizationList,
  onSubmit
}: Props) => {
  const { t } = useTranslation();

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState,
    setValue,
  } = useForm<UserFormType>({ defaultValues });

  const watchStateIds = watch('stateIds');

  useEffect(() => {
    const hasMunicipalityAll = watchStateIds.includes(0);
    const lastMunicipality = watchStateIds?.[watchStateIds?.length - 1];
    const lastMunicipalityIsAll = lastMunicipality === 0;

    if (hasMunicipalityAll && watchStateIds.length > 1) {
      if (lastMunicipalityIsAll) {
        setValue('stateIds', [0]);
      } else {
        setValue('stateIds', watchStateIds.filter(item => item !== 0));
      }
    }

  }, [setValue, watchStateIds]);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-14">
        <section>
          <Typography variant="h5">{t('page_management_form.section_identity.title')}</Typography>
          <div className="grid grid-cols-2 gap-6 gap-y-8 mt-6">
            <TextField
              variant="standard"
              label={t('page_management_form.section_identity.label_first_name')}
              fullWidth
              required
              error={!!formState.errors.firstName}
              helperText={formState.errors.firstName?.message}
              {...register('firstName', {
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
              error={!!formState.errors.lastName}
              helperText={formState.errors.lastName?.message}
              {...register('lastName', {
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
              error={!!formState.errors.phoneNumber}
              helperText={formState.errors.phoneNumber?.message}
              {...register('phoneNumber', {
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
                error={!!formState.errors.roleGroup}
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
                name="roleGroup"
                rules={{ required: 'This field is required' }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    variant="standard"
                    labelId="roleGroup"
                    id="input-role-group"
                    error={!!formState.errors.roleGroup}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  >
                    {roleGroupList.map((role) => (
                      <MenuItem key={role.key} value={role.key}>{role.label}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              {formState.errors.roleGroup?.message && (
                <FormHelperText error>{formState.errors.roleGroup?.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl>
              <InputLabel
                id="input-organization-label"
                // required
                error={!!formState.errors.organizationId}
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
                name="organizationId"
                // rules={{ required: 'This field is required' }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    variant="standard"
                    labelId="organization"
                    id="input-organization"
                    error={!!formState.errors.organizationId}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                  >
                    {organizationList.map((organization) => (
                      <MenuItem key={organization.key} value={organization.key}>{organization.label}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              {formState.errors.organizationId?.message && (
                <FormHelperText error>{formState.errors.organizationId?.message}</FormHelperText>
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
                name="stateIds"
                rules={{ required: 'This field is required' }}
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
                              onChange([...watchStateIds, Number(e.target.value)]);
                              return;
                            }

                            onChange(watchStateIds?.filter(item => item !== Number(e.target.value)));
                          }}
                        />
                      }
                    />
                  )
                }}
              />
            ))}
          </FormGroup>

          {formState.errors.stateIds?.message && (
            <FormHelperText error>{formState.errors.stateIds?.message}</FormHelperText>
          )}
        </section>

        <section>
          <Button type="submit" variant="contained" color="primary" className="w-[200px]" disabled={loading}>
            {loading ? "Submitting..." : (
              <>
                {isEdit ? t('page_management_form.cta_submit_edit') : t('page_management_form.cta_submit_new')}
              </>
            )}
          </Button>
        </section>
      </div>
    </form>
  );
};

export default UserForm;