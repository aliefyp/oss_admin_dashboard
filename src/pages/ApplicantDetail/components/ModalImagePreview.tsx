import { Modal } from "@mui/material"
import ModalSheet from "components/ModalSheet";
import { useTranslation } from "react-i18next";

const ModalImagePreview = ({ open, onClose, images }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalSheet
        title={t('page_applicant_detail.modal_preview.title')}
        onClose={onClose}
      >
        {images.map((image, index) => (
          <img width={700} height={700} key={index} src={image} alt={`Preview ${index}`} className="object-contain" />
        ))}
      </ModalSheet>
    </Modal>
  )
}

export default ModalImagePreview;
