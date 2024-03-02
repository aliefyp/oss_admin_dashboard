import { Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material";
import ModalSheet from "components/ModalSheet";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";

const DUMMY_REASON = [
  { id: '1', name: 'Reason 1' },
  { id: '2', name: 'Reason 2' },
  { id: '3', name: 'Reason 3' },
  { id: '4', name: 'Reason 4' },
]

interface ModalRejectConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalRejectConfirmation = ({ open, onClose, onConfirm }: ModalRejectConfirmationProps) => {
  const { t } = useTranslation();

  const [reasonType, setReasonType] = useState('1');
  const [reason, setReason] = useState('');

  const handleReasonTypeChange = (event: SelectChangeEvent<string>) => {
    setReasonType(event.target.value);
  };

  const handleReasonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

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
        <div className="space-y-8 mt-4">
          <FormControl className="w-full">
            <InputLabel id="reason">
              {t('page_applicant_detail.modal_reject.label_reason')}
            </InputLabel>
            <Select
              label={t('page_applicant_detail.modal_reject.label_reason')}
              variant="standard"
              labelId="reason"
              id="inut-reason-type"
              value={reasonType}
              placeholder="Select Reason"
              onChange={e => handleReasonTypeChange(e)}
            >
              {/* <MenuItem value="0">Select Reason</MenuItem> */}
              {DUMMY_REASON.map((svc) => (
                <MenuItem key={svc.id} value={svc.id}>{svc.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            className="w-full"
            variant="standard"
            id="input-reason"
            label={t('page_applicant_detail.modal_reject.label_message')}
            placeholder={t('page_applicant_detail.modal_reject.placeholder_message')}
            multiline
            minRows={2}
            value={reason}
            onChange={handleReasonChange}
          />
        </div>
        <div className="flex gap-4 justify-center mt-6">
          <Button variant="outlined" className="w-full" onClick={onClose}>
            {t('page_applicant_detail.modal_reject.cta_recheck')}
          </Button>
          <Button variant="contained" className="w-full" onClick={onConfirm}>
            {t('page_applicant_detail.modal_reject.cta_reject')}
          </Button>
        </div>
      </ModalSheet>
    </Modal>
  );
}

export default ModalRejectConfirmation;
