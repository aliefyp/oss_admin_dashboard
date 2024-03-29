import { useContext } from "react"
import { ToasterContext } from "contexts/ToasterContext";

const useToaster = () => {
  const toaster = useContext(ToasterContext);
  return toaster;
}

export default useToaster;