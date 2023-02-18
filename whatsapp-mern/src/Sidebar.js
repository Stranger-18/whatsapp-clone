import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./SidebarChat";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://pps.whatsapp.net/v/t61.24694-24/315749680_1923621897982928_6603898639903565102_n.jpg?ccb=11-4&oh=01_AdSsL4v4THBS6BAaqPRfBHFVRwwfJmbQEJKjyYRwojznUQ&oe=63FCAA0B" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input type={"text"} placeholder="Search or start new chat" />
        </div>
          </div>
          <div className="sidebar__chats">
              <SidebarChat />
              <SidebarChat />
              <SidebarChat />
              <SidebarChat />
          </div>
    </div>
  );
}

export default Sidebar;
