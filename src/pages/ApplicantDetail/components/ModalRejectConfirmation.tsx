import { Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material";
import ModalSheet from "components/ModalSheet";
import { ChangeEvent, useState } from "react";

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
        title="Are Your Sure to Reject?"
        description="Please check your data before submitting, make sure all data meet the criteria to help our officer"
        onClose={onClose}
        sx={{
          width: 600,
        }}
      >
        <div className="space-y-8 mt-4">
          <FormControl className="w-full">
            <InputLabel id="reason">Reason</InputLabel>
            <Select
              label="Reason"
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
            label="Message"
            placeholder="Type your message here..."
            multiline
            minRows={2}
            value={reason}
            onChange={handleReasonChange}
          />
        </div>
        <div className="flex gap-4 justify-center mt-6">
          <Button variant="outlined" className="w-full" onClick={onClose}>Recheck</Button>
          <Button variant="contained" className="w-full" onClick={onConfirm}>Reject</Button>
        </div>
      </ModalSheet>
    </Modal>
  );
}

export default ModalRejectConfirmation;
