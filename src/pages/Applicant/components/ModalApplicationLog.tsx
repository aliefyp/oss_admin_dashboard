import { Modal } from "@mui/material";
import ModalSheet from "components/ModalSheet";
import Timeline from "components/Timeline";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Log } from "../usecase/useLogViewer";

interface ModalApplicationLogProps {
  open: boolean;
  data: Log[];
  onClose: () => void;
}

const ModalApplicationLog = ({ open, data, onClose }: ModalApplicationLogProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalSheet
        title={t('page_applicant.detail_status.title')}
        onClose={onClose}
        sx={{
          width: 600,
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
      >
        <div className="py-4">
          <Timeline data={data.map((item, index) => ({
            id: item.id,
            upperContent: dayjs(item.createdAt).format('DD MMMM YYYY HH:mm'),
            mainContent: t(`application_status.${item.status.toLowerCase()}`),
            lowerContent: item.notes,
            isActive: index === data.length - 1,
          }))} />
        </div>
      </ModalSheet>
    </Modal>
  );
}

export default ModalApplicationLog;
