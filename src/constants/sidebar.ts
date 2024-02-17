import {
  TbCards,
  TbFile,
  TbHome,
  TbSettings,
} from "react-icons/tb";

export const MAIN_MENU = {
  title: "Main Function",
  items: [
    { text: "Overview", icon: TbHome, url: "/" },
    { text: "Applicants", icon: TbFile, url: "/applicants" },
    { text: "Issued Cards", icon: TbCards, url: "/issued-cards" },
  ],
};

export const EXTRAS_MENU = {
  title: "Other",
  items: [
    { text: 'Settings', icon: TbSettings, url: "/settings" },
  ],
};