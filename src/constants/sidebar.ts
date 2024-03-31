import { HiOutlineClipboard, HiOutlineCreditCard, HiOutlineHome, HiOutlineCog } from "react-icons/hi";
import { HiCalendarDays } from "react-icons/hi2";

export const MAIN_MENU = {
  title: "Main Function",
  items: [
    { text: "Overview", icon: HiOutlineHome, url: "/" },
    { text: "Applicants", icon: HiOutlineClipboard, url: "/applicant" },
    { text: "Issued Cards", icon: HiOutlineCreditCard, url: "/issued-card" },
    { text: "Appointment", icon: HiCalendarDays, url: "/appointment" },
  ],
};

export const EXTRAS_MENU = {
  title: "Other",
  items: [
    { text: 'Settings', icon: HiOutlineCog, url: "/settings" },
  ],
};