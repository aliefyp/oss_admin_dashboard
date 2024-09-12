import { useLazyApplicationLog } from "api/application";
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
  loading: boolean;
  handleOpen: (id: number) => void;
  handleClose: () => void;
}

const useLogViewer = (): UseLogViewerInterface => {
  const [open, setOpen] = useState(false);

  const getApplicationLog = useLazyApplicationLog();

  const handleOpen = (id?: number) => {
    setOpen(true);
    getApplicationLog.mutate(id)
  }

  const handleClose = () => {
    setOpen(false);
  }

  return {
    open,
    data: getApplicationLog.data?.data || [],
    loading: getApplicationLog.isLoading,
    handleOpen,
    handleClose,
  }
}

export default useLogViewer;