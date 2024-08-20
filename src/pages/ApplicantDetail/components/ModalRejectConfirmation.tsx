import { Button, Modal, TextField } from "@mui/material";
import ModalSheet from "components/ModalSheet";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
interface FormType {
  reason: string;
}

interface ModalRejectConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const ModalRejectConfirmation = ({ open, onClose, onConfirm }: ModalRejectConfirmationProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm<FormType>({
    defaultValues: {
      reason: '',
    }
  });

  const submitForm = ({ reason }: FormType) => {
    onConfirm(reason);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalSheet
        title={t('page_applicant_detail.modal_reject.title')}
        description={t('page_applicant_detail.modal_reject.description')}
        onClose={onClose}
        sx={{
          width: 600,
        }}
      >
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col gap-4">
            <TextField
              label={t('page_appointment_detail.modal_approve.label_reason')}
              variant="standard"
              fullWidth
              error={!!errors.reason}
              helperText={errors.reason?.message}
              {...register('reason')}
            />

            <div className="flex gap-4 justify-center mt-6">
              <Button variant="outlined" className="w-full" onClick={onClose}>
                {t('page_applicant_detail.modal_reject.cta_recheck')}
              </Button>
              <Button type="submit" variant="contained" className="w-full">
                {t('page_applicant_detail.modal_reject.cta_reject')}
              </Button>
            </div>
          </div>
        </form>
      </ModalSheet>
    </Modal>
  );
}

export default ModalRejectConfirmation;
