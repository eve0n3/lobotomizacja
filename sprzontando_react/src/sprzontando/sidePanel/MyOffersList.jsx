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
import { USER_PROFILE_LOCATION } from "../../../utils/consts";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";

const MyOffersList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem key={3} disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <ChairOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Moje ogłoszenia" />
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
            <ListItemButton onClick={() => navigate("/myOffers")}>
              <ListItemText sx={{ display: "list-item" }} primary="Aktywne" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() =>
                navigate("/myOffers", { state: { mode: "ended" } })
              }
            >
              <ListItemText
                sx={{ display: "list-item" }}
                primary="Zakończone"
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() =>
                navigate("/myOffers", { state: { mode: "banned" } })
              }
            >
              <ListItemText sx={{ display: "list-item" }} primary="Zbanowane" />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default MyOffersList;
