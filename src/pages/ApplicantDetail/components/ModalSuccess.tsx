import { Button, Modal } from "@mui/material";
import ModalSheet from "components/ModalSheet";

interface ModalSuccessProps {
  open: boolean;
  title: string;
  description: string;
  ctaText: string;
  onConfirm: () => void;
}

const ModalSuccess = ({ open, title, ctaText, description, onConfirm }: ModalSuccessProps) => {
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
        <Button variant="contained" className="w-full !mt-8" onClick={onConfirm}>
          {ctaText}
        </Button>
      </ModalSheet>
    </Modal>
  );
}

export default ModalSuccess;
