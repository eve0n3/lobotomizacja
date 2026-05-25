import Box from "@mui/material/Box";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { useNavigate } from "react-router-dom";
import {
  REPORTED_OFFERS_LOCATION,
  USER_PROFILE_LOCATION,
  ADMIN_USERS_LOCATION,
} from "../../../utils/consts";

const SideBarAdminList = () => {
  const navigate = useNavigate();

  return (
    <>
      <Divider />
      <ListItem key={7} disablePadding>
        <ListItemButton onClick={() => navigate(REPORTED_OFFERS_LOCATION)}>
          <ListItemIcon>
            <FlagOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Zgłoszone oferty"} />
        </ListItemButton>
      </ListItem>
      <ListItem key={8} disablePadding>
        <ListItemButton onClick={() => navigate(ADMIN_USERS_LOCATION)}>
          <ListItemIcon>
            <PeopleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={"Użytkownicy"} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default SideBarAdminList;
