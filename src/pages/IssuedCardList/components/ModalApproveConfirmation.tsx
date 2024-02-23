import { Button, Modal } from "@mui/material";
import ModalSheet from "components/ModalSheet";

interface ModalApproveConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalApproveConfirmation = ({ open, onClose, onConfirm }: ModalApproveConfirmationProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalSheet
        title="Are Your Sure to Approve?"
        description="Please check your data before submitting, make sure all data meet the criteria to help our officer"
        onClose={onClose}
        sx={{
          width: 600,
        }}
      >
        <div className="flex gap-4 justify-center mt-4">
          <Button variant="outlined" className="w-full" onClick={onClose}>Recheck</Button>
          <Button variant="contained" className="w-full" onClick={onConfirm}>Approve</Button>
        </div>
      </ModalSheet>
    </Modal>
  );
}

export default ModalApproveConfirmation;
