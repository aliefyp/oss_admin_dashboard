import { Button, Typography } from "@mui/material"
import { ReactNode } from "react";
import { HiInbox, HiExclamationTriangle, HiOutlineInformationCircle } from "react-icons/hi2";

interface Props {
  title: string;
  type?: 'warning' | 'error' | 'info' | 'empty';
  children: ReactNode;
  actionText?: string;
  onClick?: () => void;
}

const EmptyState = ({ title, type = 'empty', children, actionText, onClick }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 px-2 py-6">
      {type === 'empty' && <HiInbox size={80} className=" text-gray-500" />}
      {type === 'warning' && <HiExclamationTriangle size={80} className=" text-yellow-500" />}
      {type === 'info' && <HiOutlineInformationCircle size={80} className=" text-blue-500" />}
      {type === 'error' && <HiExclamationTriangle size={80} className=" text-red-500" />}
      <div className="text-center">
        <Typography variant="h4" className="mb-1">{title}</Typography>
        <Typography variant="body1" className="text-gray-600">{children}</Typography>
      </div>
      {onClick && actionText && (
        <Button variant="outlined" color="primary" onClick={onClick} className="mt-6">
          {actionText}
        </Button>
      )}
    </div>
  )
}

export default EmptyState;
