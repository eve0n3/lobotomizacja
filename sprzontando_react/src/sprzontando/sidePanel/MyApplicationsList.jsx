import Box from "@mui/material/Box";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import GridOnIcon from "@mui/icons-material/GridOn";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { useNavigate } from "react-router-dom";
import {
  ENDED,
  IN_PROGRESS,
  MY_APPLICATIONS_LOCATION,
  USER_PROFILE_LOCATION,
} from "../../../utils/consts";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";

const MyApplicationsList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem key={4} disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <CampaignOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Moje zlecenia" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          sx={{
            listStyleType: "disc",
            color: "text.secondary",
            pl: 3,
          }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(MY_APPLICATIONS_LOCATION)}>
              <ListItemText
                sx={{ display: "list-item" }}
                primary="Aplikowane"
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() =>
                navigate(MY_APPLICATIONS_LOCATION, {
                  state: { mode: IN_PROGRESS },
                })
              }
            >
              <ListItemText
                sx={{ display: "list-item" }}
                primary="W trakcie wykonania"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() =>
                navigate(MY_APPLICATIONS_LOCATION, { state: { mode: ENDED } })
              }
            >
              <ListItemText
                sx={{ display: "list-item" }}
                primary="Zakończone"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default MyApplicationsList;
