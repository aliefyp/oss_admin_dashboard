import { Button, Modal } from "@mui/material";
import ModalSheet from "components/ModalSheet";
import { useTranslation } from "react-i18next";

interface ModalApproveConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalApproveConfirmation = ({ open, onClose, onConfirm }: ModalApproveConfirmationProps) => {
  const { t } = useTranslation();

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
        <div className="flex gap-4 justify-center mt-4">
          <Button variant="outlined" className="w-full" onClick={onClose}>
            {t('page_appointment_detail.modal_approve.cta_recheck')}
          </Button>
          <Button variant="contained" className="w-full" onClick={onConfirm}>
            {t('page_appointment_detail.modal_approve.cta_approve')}
          </Button>
        </div>
      </ModalSheet>
    </Modal>
  );
}

export default ModalApproveConfirmation;
