import { HiOutlineClipboard, HiOutlineCreditCard, HiOutlineHome, HiOutlineCog } from "react-icons/hi";
import { HiCalendarDays } from "react-icons/hi2";

export const MAIN_MENU = {
  title: "Main Function",
  items: [
    { key: 'overview', text: "Overview", icon: HiOutlineHome, url: "/" },
    { key: 'applicants', text: "Applicants", icon: HiOutlineClipboard, url: "/applicant" },
    { key: 'issued-card', text: "Issued Cards", icon: HiOutlineCreditCard, url: "/issued-card" },
    { key: 'appoinment', text: "Appointment", icon: HiCalendarDays, url: "/appointment" },
  ],
};

export const EXTRAS_MENU = {
  title: "Other",
  items: [
    { key: 'settings', text: 'Settings', icon: HiOutlineCog, url: "/settings" },
  ],
};