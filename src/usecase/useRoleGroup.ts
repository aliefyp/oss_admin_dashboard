interface RoleGroup {
  isFoGroup: boolean;
  isBoGroup: boolean;
  isAdminGroup: boolean;
}

const useRoleGroup = (role: string): RoleGroup => {
  const isFoGroup = role.toLocaleLowerCase().includes('frontoffice');
  const isBoGroup = role.toLocaleLowerCase().includes('backoffice');
  const isAdminGroup = role.toLocaleLowerCase().includes('admin');

  return {
    isFoGroup,
    isBoGroup,
    isAdminGroup,
  }
}

export default useRoleGroup;
