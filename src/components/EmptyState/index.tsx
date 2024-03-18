import { Button, Typography } from "@mui/material"
import { ReactNode } from "react";
import { HiExclamation } from "react-icons/hi";

interface Props {
  title: string;
  children: ReactNode;
  actionText?: string;
  onClick?: () => void;
}

const EmptyState = ({ title, children, actionText, onClick }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 px-2 py-6">
      <HiExclamation size={80} className=" text-gray-500" />
      <div className="text-center">
        <Typography variant="h2" className="mb-1">{title}</Typography>
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
