import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import GridOnIcon from "@mui/icons-material/GridOn";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { useNavigate } from "react-router-dom";

import {
  ADMIN_LOCATION,
  HOME_LOCATION,
  LOGIN_LOCATION,
  MY_APPLICATIONS_LOCATION,
  MY_OFFERS_LOCATION,
  PROFILE_LOCATION,
  USERS_RANKING_LOCATION,
} from "../../../utils/consts";
import { getLoggedUser, isLoggedUserAdmin } from "../../../utils/utilis";

const SideBarList = () => {
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();
  const privatePath = (path) => navigate(loggedUser ? path : LOGIN_LOCATION);

  return (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(HOME_LOCATION)}>
            <ListItemIcon>
              <GridOnIcon />
            </ListItemIcon>
            <ListItemText primary="Ogloszenia" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={() => privatePath(PROFILE_LOCATION)}>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Moj profil" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => privatePath(MY_OFFERS_LOCATION)}>
            <ListItemIcon>
              <ChairOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Moje ogloszenia" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => privatePath(MY_APPLICATIONS_LOCATION)}>
            <ListItemIcon>
              <CampaignOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Moje zgloszenia" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(USERS_RANKING_LOCATION)}>
            <ListItemIcon>
              <LeaderboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Ranking uzytkownikow" />
          </ListItemButton>
        </ListItem>

        {isLoggedUserAdmin() && (
          <>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(ADMIN_LOCATION)}>
                <ListItemIcon>
                  <ShieldOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItemButton>
            </ListItem>
          </>
        )}

        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={() => privatePath(PROFILE_LOCATION)}>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Ustawienia" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SideBarList;
