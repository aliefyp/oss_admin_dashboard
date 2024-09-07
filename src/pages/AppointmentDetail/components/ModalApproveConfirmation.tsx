import { Button, Modal, TextField } from "@mui/material";
import ModalSheet from "components/ModalSheet";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormType {
  reason: string;
}

interface ModalApproveConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const ModalApproveConfirmation = ({ open, onClose, onConfirm }: ModalApproveConfirmationProps) => {
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
        title={t('page_appointment_detail.modal_approve.title')}
        description={t('page_appointment_detail.modal_approve.description')}
        onClose={onClose}
        sx={{
          width: 600,
        }}
      >
        <form noValidate onSubmit={handleSubmit(submitForm)} className="mt-4">
          <div className="flex flex-col gap-4">
            <TextField
              multiline
              minRows={3}
              label={t('page_appointment_detail.modal_approve.label_reason')}
              variant="outlined"
              fullWidth
              error={!!errors.reason}
              helperText={errors.reason?.message}
              {...register('reason')}
            />

            <div className="flex gap-4 justify-center mt-4">
              <Button type="button" variant="outlined" className="w-full" onClick={onClose}>
                {t('page_appointment_detail.modal_approve.cta_recheck')}
              </Button>
              <Button type="submit" variant="contained" className="w-full">
                {t('page_appointment_detail.modal_approve.cta_approve')}
              </Button>
            </div>
          </div>
        </form>
      </ModalSheet>
    </Modal>
  );
}

export default ModalApproveConfirmation;
