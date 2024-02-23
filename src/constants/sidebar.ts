import { HiOutlineClipboard, HiOutlineCreditCard, HiOutlineHome, HiOutlineCog } from "react-icons/hi";

export const MAIN_MENU = {
  title: "Main Function",
  items: [
    { text: "Overview", icon: HiOutlineHome, url: "/" },
    { text: "Applicants", icon: HiOutlineClipboard, url: "/applicant" },
    { text: "Issued Cards", icon: HiOutlineCreditCard, url: "/issued" },
  ],
};

export const EXTRAS_MENU = {
  title: "Other",
  items: [
    { text: 'Settings', icon: HiOutlineCog, url: "/settings" },
  ],
};