import { Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers";
import ModalSheet from "components/ModalSheet";
import { REJECTION_REASONS } from "constants/appointment";
// import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ModalRescheduleConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
}

const ModalRescheduleConfirmation = ({ open, onClose, onConfirm }: ModalRescheduleConfirmationProps) => {
  const { t } = useTranslation();

  const [reasonType, setReasonType] = useState(REJECTION_REASONS[0].code);
  // const [date, setDate] = useState(dayjs().add(1, 'day'));

  const handleReasonTypeChange = (event: SelectChangeEvent<string>) => {
    setReasonType(event.target.value);
  };

  const handleConfirmClick = () => {
    onConfirm(reasonType)
  }

  // const handleDateChange = (newDate) => {
  //   setDate(newDate);
  // };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalSheet
        title={t('page_appointment_detail.modal_reject.title')}
        description={t('page_appointment_detail.modal_reject.description')}
        onClose={onClose}
        sx={{
          width: 600,
        }}
      >
        <div className="space-y-8 mt-4">
          <FormControl className="w-full">
            <InputLabel
              id="label-reason"
              sx={{
                [`&.MuiInputLabel-root`]: {
                  marginLeft: '-14px',
                }
              }}
            >
              {t('page_appointment_detail.modal_reject.label_reason')}
            </InputLabel>
            <Select
              label={t('page_appointment_detail.modal_reject.label_reason')}
              variant="standard"
              labelId="reason"
              id="input-reason"
              value={reasonType}
              placeholder="Select Reason"
              onChange={e => handleReasonTypeChange(e)}
            >
              {REJECTION_REASONS.map((reason) => (
                <MenuItem key={reason.id} value={reason.code}>
                  {t(`page_appointment_detail.modal_reject.reason_${reason.code}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <FormControl className="w-full">
            <DatePicker
              value={date}
              minDate={dayjs().add(1, 'day')}
              onChange={handleDateChange}
              className="w-full"
              slotProps={{
                textField: {
                  variant: "standard",
                  id: "input-date",
                  label: t('page_appointment_detail.modal_reject.label_date'),
                  placeholder: t('page_appointment_detail.modal_reject.placeholder_date')
                }
              }}
            />
          </FormControl> */}
          <div className="flex gap-4 justify-center mt-6">
            <Button variant="outlined" className="w-full" onClick={onClose}>
              {t('page_appointment_detail.modal_reject.cta_recheck')}
            </Button>
            <Button variant="contained" className="w-full" onClick={handleConfirmClick}>
              {t('page_appointment_detail.modal_reject.cta_reject')}
            </Button>
          </div>
        </div>
      </ModalSheet>
    </Modal>
  );
}

export default ModalRescheduleConfirmation;
