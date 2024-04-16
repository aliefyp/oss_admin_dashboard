import { MAIN_MENU, EXTRAS_MENU } from "constants/sidebar"
import useRoleAccess from "./useRoleAccess"

const useSidebarMenu = () => {
  const { hasAccessAppointmentMenu } = useRoleAccess()

  const extrasMenu = EXTRAS_MENU;
  const mainMenu = {
    ...MAIN_MENU,
    items: MAIN_MENU.items.filter(item => {
      if (item.key === 'appoinment') {
        return hasAccessAppointmentMenu
      }
      return true
    })
  };

  return [mainMenu, extrasMenu]
}

export default useSidebarMenu;
