import { Button, ButtonProps, Modal } from "@mui/material";
import ModalSheet from "components/ModalSheet";

interface ModalConfirmationProps {
  open: boolean;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryColor?: ButtonProps['color'];
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

const ModalConfirmation = ({ open, title, ctaPrimary, ctaSecondary, description, ctaPrimaryColor, onPrimaryClick, onSecondaryClick }: ModalConfirmationProps) => {
  return (
    <Modal
      open={open}
      onClose={onSecondaryClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalSheet
        title={title}
        description={description}
        onClose={onSecondaryClick}
        sx={{
          width: 600,
        }}
      >
        <div className="grid grid-cols-2 gap-4 !mt-8">
          <Button variant="outlined" className="w-full" onClick={onSecondaryClick}>
            {ctaSecondary}
          </Button>
          <Button variant="contained" className="w-full" onClick={onPrimaryClick} color={ctaPrimaryColor || 'primary'}>
            {ctaPrimary}
          </Button>
        </div>
      </ModalSheet>
    </Modal>
  );
}

export default ModalConfirmation;
