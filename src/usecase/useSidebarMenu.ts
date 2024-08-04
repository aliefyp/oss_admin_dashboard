import { MAIN_MENU, OTHER_MENU } from "constants/sidebar";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useTranslation } from "react-i18next";
import { UserData } from "types/auth/user";
import useRoleGroup from "./useRoleGroup";

const useSidebarMenu = () => {
  const { t } = useTranslation();
  const auth = useAuthUser<UserData>();
  const { isFoGroup, isAdminGroup } = useRoleGroup(auth?.roleGroup || '');

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
        return isFoGroup;
      }

      if (item.key === 'management') {
        return isAdminGroup;
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
