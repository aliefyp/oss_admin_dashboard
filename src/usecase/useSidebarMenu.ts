import { MAIN_MENU, OTHER_MENU } from "constants/sidebar"
import useRoleAccess from "./useRoleAccess"
import { useTranslation } from "react-i18next";

const useSidebarMenu = () => {
  const { hasAccessAppointmentMenu, hasAccessUserManagement } = useRoleAccess();
  const { t } = useTranslation();

  const otherMenu = {
    ...OTHER_MENU,
    title: t(`sidebar.${OTHER_MENU.key}`),
    items: OTHER_MENU.items.map(item => ({
      ...item,
      text: t(`sidebar.${item.key}`)
    }))
  };

  const mainMenu = {
    ...MAIN_MENU,
    title: t(`sidebar.${MAIN_MENU.key}`),
    items: MAIN_MENU.items.filter(item => {
      if (item.key === 'appointment') {
        return hasAccessAppointmentMenu
      }

      if (item.key === 'management') {
        return hasAccessUserManagement
      }

      return true
    }).map(item => ({
      ...item,
      text: t(`sidebar.${item.key}`)
    }))
  };

  return [mainMenu, otherMenu]
}

export default useSidebarMenu;
