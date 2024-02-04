// import {
//   Typography,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemIcon,
//   IconButton,
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { MAIN_MENU, EXTRAS_MENU } from "constants/sidebar";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState("");

  const menus = [MAIN_MENU, EXTRAS_MENU];

  const handleOpen = (value) => {
    setOpen(open === value ? "" : value);

    if (!isSidebarOpen && open !== value) {
      toggleSidebar();
    }
  };

  return (
    <Paper className="h-[100vh] fixed left-0 top-0 bottom-0 w-[240px]">
      <MenuList>
        {menus.map((menu, menuIndex) => (
          <div key={`menu-${menuIndex}`} className="py-2 px-3">
            <Typography variant="subtitle2" className="text-gray-500 text-xs">{menu.title}</Typography>
            <List>
              {menu.items.map((item, itemIndex) => {
                const hasChild = item?.child?.length;

                return hasChild ? (
                  <React.Fragment key={`item-$${itemIndex}`}>
                    <MenuItem
                      selected={item.child.map((c) => c.url).includes(pathname)}
                      onClick={() => handleOpen(item.text)}
                      className="rounded-md"
                    >
                      <ListItemIcon>
                        <item.icon
                          strokeWidth={1.5}
                          size={isSidebarOpen ? 20 : 24}
                        />
                      </ListItemIcon>
                      {isSidebarOpen && <div className="grow">{item.text}</div>}
                      {isSidebarOpen && (
                        <ListItemIcon>
                          <HiChevronDown
                            strokeWidth={1.1}
                            className={`mx-auto h-4 w-4 transition-transform ${open === item.text ? "rotate-180" : ""
                              }`}
                          />
                        </ListItemIcon>
                      )}
                    </MenuItem>
                    {open === item.text && (
                      <List>
                        {item.child.map((c, cIndex) => (
                          <Link
                            key={`child-${cIndex}`}
                            to={c.url}
                          >
                            <MenuItem
                              selected={pathname === c.url}
                            >
                              {isSidebarOpen && c.text}
                            </MenuItem>
                          </Link>
                        ))}
                      </List>
                    )}
                  </React.Fragment>
                ) : (
                  <Link
                    key={`item-$${itemIndex}`}
                    to={item.url}
                    className="text-initial"
                  >
                    <MenuItem
                      key={`item-${itemIndex}`}
                      selected={pathname === item.url}
                      onClick={() => handleOpen("")}
                    >
                      <ListItemIcon>
                        <item.icon
                          strokeWidth={1.5}
                          size={isSidebarOpen ? 20 : 24}
                        />
                      </ListItemIcon>
                      {isSidebarOpen && item.text}
                    </MenuItem>
                  </Link>
                );
              }
              )}
            </List>
            {menuIndex === 0 && <Divider className="py-2" />}
          </div>
        ))}
      </MenuList>

    </Paper>
  )

}

export default Sidebar;
