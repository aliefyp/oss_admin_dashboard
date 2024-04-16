import { useContext } from "react"
import { RoleAccessContext } from "contexts/RoleAccessContext";

const useRoleAccess = () => {
  const toaster = useContext(RoleAccessContext);
  return toaster;
}

export default useRoleAccess;