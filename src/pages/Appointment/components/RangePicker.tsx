import { useEffect, useRef, useState } from "react"
import { Popover, TextField, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface Props {
  value: [Date | null, Date | null];
  onChange: (value: [Date | null, Date | null]) => void;
}

const RangePicker = ({ value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [dateStart, setDateStart] = useState<Date | null>(value[0]);
  const [dateEnd, setDateEnd] = useState<Date | null>(value[1]);

  const [anchorStart, setAnchorStart] = useState<HTMLDivElement | null>(null);
  const [anchorEnd, setAnchorEnd] = useState<HTMLDivElement | null>(null);

  const handleOpenStart = () => {
    setAnchorStart(inputRef.current);
  };

  const handleCloseStart = () => {
    setAnchorStart(null);
  };

  const handleOpenEnd = () => {
    setAnchorEnd(inputRef.current);
  }

  const handleCloseEnd = () => {
    setAnchorEnd(null);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    handleOpenStart();
  }

  const handleStartChange = (date: Date) => {
    setDateStart(date);
    handleCloseStart();
    handleOpenEnd();
  }

  const handleEndChange = (date: Date) => {
    setDateEnd(date);
    handleCloseEnd();
    onChange([dateStart, date]);
  }

  useEffect(() => {
    if (value[0] === null) setDateStart(value[0]);
    if (value[1] === null) setDateEnd(value[1]);
  }, [value]);

  const openStart = Boolean(anchorStart);
  const openEnd = Boolean(anchorEnd);
  const idStart = openStart ? 'start-popover' : undefined;
  const idEnd = openEnd ? 'end-popover' : undefined;

  const startValue = dateStart ? dayjs(dateStart).format('DD MMM YYYY') : 'Start Date';
  const endValue = dateEnd ? dayjs(dateEnd).format('DD MMM YYYY') : 'End Date';
  const inputValue = (dateStart || dateEnd) ? `${startValue}  —  ${endValue}` : '';

  return (
    <div className="relative">
      <TextField
        ref={inputRef}
        size="small"
        placeholder="Select Date"
        sx={{ minWidth: 240 }}
        value={inputValue}
        onClick={handleInputClick}
        InputProps={{
          readOnly: true
        }}
      />
      <Popover
        id={idStart}
        open={openStart}
        anchorEl={anchorStart}
        onClose={handleCloseStart}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className="p-4 border-b text-center">
          <Typography variant="h6">From Date</Typography>
        </div>
        <DateCalendar onChange={handleStartChange} />
      </Popover>
      <Popover
        id={idEnd}
        open={openEnd}
        anchorEl={anchorEnd}
        onClose={handleCloseEnd}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className="p-4 border-b text-center">
          <Typography variant="h6">To Date</Typography>
        </div>
        <DateCalendar minDate={dayjs(dateStart)} onChange={handleEndChange} />
      </Popover>
    </div>
  )
}

export default RangePicker;