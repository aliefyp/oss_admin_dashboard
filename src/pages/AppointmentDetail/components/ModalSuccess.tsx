import { Button, Modal } from "@mui/material";
import ModalSheet from "components/ModalSheet";
import { useTranslation } from "react-i18next";

interface ModalSuccessProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
}

const ModalSuccess = ({ open, title, description, onConfirm }: ModalSuccessProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onConfirm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalSheet
        title={title}
        description={description}
        onClose={onConfirm}
        sx={{
          width: 600,
        }}
      >
        <Button className="w-full" onClick={onConfirm}>
          {t('page_applicant_detail.')}
        </Button>
      </ModalSheet>
    </Modal>
  );
}

export default ModalSuccess;
