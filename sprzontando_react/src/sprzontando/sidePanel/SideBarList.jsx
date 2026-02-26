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

const SideBarList = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem key={1} disablePadding>
          <ListItemButton onClick={() => navigate("/sprzontando")}>
            <ListItemIcon>
              <GridOnIcon />
            </ListItemIcon>
            <ListItemText primary={"Ogłoszenia"} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem key={2} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Mój profil"} />
          </ListItemButton>
        </ListItem>

        <ListItem key={3} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ChairOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Moje ogłoszenia"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={4} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CampaignOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Moje zgłoszenia"} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem key={5} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LeaderboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Ranking użytkoników"} />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem key={6} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Ustawienia"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SideBarList;
