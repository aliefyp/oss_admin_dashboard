import { Box, BoxProps, IconButton, Typography } from "@mui/material";
import { HiX } from "react-icons/hi";

interface ModalSheetProps extends BoxProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  onClose: () => void;
}

const ModalSheet = ({ children, onClose, ...otherProps }: ModalSheetProps) => {
  const { sx, title, description, ...otherBoxProps } = otherProps;

  return (
    <Box
      sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 4,
        boxShadow: 24,
        p: 3,
        ...sx,
      }}
      {...otherBoxProps}
    >
      <div className="flex justify-end mb-1 sticky top-0">
        <IconButton onClick={onClose}>
          <HiX className="cursor-pointer" size={20} onClick={onClose} />
        </IconButton>
      </div>
      {title && (
        <Typography variant="h3" component="h3" sx={{ fontWeight: 600, marginBottom: 2, textAlign: 'center' }}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body1" component="p" sx={{ textAlign: 'center' }}>
          {description}
        </Typography>
      )}
      {children}
    </Box>
  )
}

export default ModalSheet;