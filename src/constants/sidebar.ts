import { HiOutlineClipboard, HiOutlineCreditCard, HiOutlineHome, HiOutlineCog, HiOutlineUsers } from "react-icons/hi";
import { HiCalendarDays } from "react-icons/hi2";
import i18next from "i18next";

export const MAIN_MENU = {
  key: 'main',
  title: i18next.t('sidebar.main_function'),
  items: [
    { key: 'overview', text: i18next.t('sidebar.overview'), icon: HiOutlineHome, url: "/" },
    { key: 'applicant', text: i18next.t('sidebar.applicant'), icon: HiOutlineClipboard, url: "/applicant" },
    { key: 'issued_card', text: i18next.t('sidebar.issued_card'), icon: HiOutlineCreditCard, url: "/issued-card" },
    { key: 'appointment', text: i18next.t('sidebar.appointment'), icon: HiCalendarDays, url: "/appointment" },
    { key: 'management', text: i18next.t('sidebar.management'), icon: HiOutlineUsers, url: "/management" },
  ],
};

export const OTHER_MENU = {
  key: 'other',
  title: i18next.t('sidebar.other'),
  items: [
    { key: 'settings', text: i18next.t('sidebar.settings'), icon: HiOutlineCog, url: "/settings" },
  ],
};