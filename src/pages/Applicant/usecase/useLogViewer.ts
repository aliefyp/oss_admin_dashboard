import { useState } from "react";

export interface Log {
  id: number;
  createdAt: string;
  status: string;
  notes: string | null;
}

interface UseLogViewerInterface {
  open: boolean;
  data: Log[];
  handleOpen: (id: number) => void;
  handleClose: () => void;
}

const dummyTimeline = [
  {
    "id": 153,
    "createdAt": "2024-08-29T00:33:04.4614543+00:00",
    "status": "submitted",
    "notes": null
  },
  {
    "id": 154,
    "createdAt": "2024-08-29T00:33:04.4614545+00:00",
    "status": "waitingApprovalFromFrontOffice",
    "notes": null
  },
  {
    "id": 155,
    "createdAt": "2024-08-29T00:33:50.7684778+00:00",
    "status": "approvedFromFrontOffice",
    "notes": "OK"
  },
  {
    "id": 156,
    "createdAt": "2024-08-29T00:33:50.7684779+00:00",
    "status": "waitingApprovalFromBackOffice",
    "notes": "OK"
  },
  {
    "id": 157,
    "createdAt": "2024-08-29T00:34:30.7857994+00:00",
    "status": "rejectedFromBackOffice",
    "notes": "enclose ID Card"
  },
  {
    "id": 158,
    "createdAt": "2024-08-29T00:42:51.1468426+00:00",
    "status": "resubmitted",
    "notes": null
  },
  {
    "id": 159,
    "createdAt": "2024-08-29T00:42:51.1468428+00:00",
    "status": "waitingApprovalFromFrontOffice",
    "notes": null
  },
  {
    "id": 160,
    "createdAt": "2024-08-29T00:43:20.1811848+00:00",
    "status": "approvedFromFrontOffice",
    "notes": "complete"
  },
  {
    "id": 161,
    "createdAt": "2024-08-29T00:43:20.181185+00:00",
    "status": "waitingApprovalFromBackOffice",
    "notes": "complete"
  },
  {
    "id": 162,
    "createdAt": "2024-08-29T00:44:15.3040477+00:00",
    "status": "approvedFromBackOffice",
    "notes": "complete"
  },
  {
    "id": 163,
    "createdAt": "2024-08-29T00:44:15.3040478+00:00",
    "status": "completed",
    "notes": "complete"
  },
  {
    "id": 164,
    "createdAt": "2024-08-29T00:46:42.1949833+00:00",
    "status": "receivedByOwner",
    "notes": null
  }
];

const useLogViewer = (): UseLogViewerInterface => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleOpen = (id?: number) => {
    setOpen(true);
    setData(dummyTimeline);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return {
    open,
    data,
    handleOpen,
    handleClose,
  }
}

export default useLogViewer;