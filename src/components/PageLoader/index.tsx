import { CircularProgress } from "@mui/material";
import { createPortal } from "react-dom";

const PageLoader = () => {
  return (
    <>
      {createPortal(
        <div className="fixed bottom-0 pointer-events-none left-0 right-0 top-0 z-[1000] flex h-screen w-screen items-center justify-center bg-gray-100 opacity-50 backdrop-blur-3xl">
          <CircularProgress />
        </div>,
        document.body
      )}
    </>
  );
};

export default PageLoader;
