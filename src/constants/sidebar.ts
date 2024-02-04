import {
  TbBox,
  TbLayoutDashboard,
  TbSettings,
} from "react-icons/tb";

export const MAIN_MENU = {
  title: "MENU",
  items: [
    { text: "Overview", icon: TbLayoutDashboard, url: "/" },
    {
      text: "Stok",
      icon: TbBox,
      child: [
        { text: "Data Stok", url: "/stock" },
        { text: "Data Pembelian", url: "/stock/purchase" },
        { text: "Data Stok Opname", url: "/stock/opname" },
        { text: "Data Supplier", url: "/stock/supplier" },
      ],
    },
  ],
};

export const EXTRAS_MENU = {
  title: "LAINNYA",
  items: [
    { text: 'Settings', icon: TbSettings, url: "/settings" },
  ],
};