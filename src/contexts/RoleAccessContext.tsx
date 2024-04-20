import { ROLE } from "constants/role";
import { createContext } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

interface RoleAccessContextType {
  roleId: number;
  roleLabel: string;
  showOfficeLocation: boolean;
  showServiceType: boolean;
  hasAccessMunicipalityFilter: boolean;
  hasAccessServiceTypeFilter: boolean;
  hasAccessAppointmentMenu: boolean;
  hasAccessUserManagement: boolean;
}

const RoleAccessContext = createContext<RoleAccessContextType | undefined>(undefined);

const RoleAccessProvider = ({ children }) => {
  const auth = useAuthUser<{ roleId: number }>();

  // TODO: change with real roleId
  // const auth = {
  //   roleId: ROLE.FrontOffice
  // }

  const { roleId } = auth || { roleId: 0 };

  const roleAccess = {
    roleId: roleId,
    roleLabel: ROLE[roleId],
    showOfficeLocation: roleId === ROLE.FrontOffice || roleId === ROLE.BackOffice,
    showServiceType: roleId === ROLE.BackOffice,
    hasAccessMunicipalityFilter: roleId === ROLE.FrontOfficeManager || roleId === ROLE.OssManager || roleId === ROLE.SuperAdmin || roleId === ROLE.BackOfficeManager,
    hasAccessServiceTypeFilter: roleId === ROLE.FrontOfficeManager || roleId === ROLE.OssManager || roleId === ROLE.SuperAdmin || roleId === ROLE.FrontOffice,
    hasAccessAppointmentMenu: roleId === ROLE.FrontOffice || roleId === ROLE.BackOffice || roleId === ROLE.BackOfficeManager,
    hasAccessUserManagement: roleId === ROLE.SuperAdmin,
  }

  return (
    <RoleAccessContext.Provider value={roleAccess}>
      {children}
    </RoleAccessContext.Provider>
  );
}

export { RoleAccessProvider, RoleAccessContext };

