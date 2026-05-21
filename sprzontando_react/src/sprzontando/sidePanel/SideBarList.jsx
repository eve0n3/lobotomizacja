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
import { useNavigate } from "react-router-dom";
import { USER_PROFILE_LOCATION } from "../../../utils/consts";
import { getIsLoggedUserAdmin } from "../../../utils/utilis";
import SideBarAdminList from "./SideBarAdminList";
import MyOffersList from "./MyOffersList";
import MyApplicationsList from "./MyApplicationsList";

const SideBarList = () => {
  const navigate = useNavigate();
  const isAdmin = getIsLoggedUserAdmin();
  return (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem key={1} disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <GridOnIcon />
            </ListItemIcon>
            <ListItemText primary={"Ogłoszenia"} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem
          key={2}
          onClick={() => navigate(USER_PROFILE_LOCATION)}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Mój profil"} />
          </ListItemButton>
        </ListItem>
        <MyOffersList />
        <MyApplicationsList />
        <Divider />

        <ListItem key={5} disablePadding>
          <ListItemButton onClick={() => navigate("./usersRanking")}>
            <ListItemIcon>
              <LeaderboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Ranking użytkoników"} />
          </ListItemButton>
        </ListItem>

        {isAdmin && <SideBarAdminList />}
      </List>
    </Box>
  );
};

export default SideBarList;
