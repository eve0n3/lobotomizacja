import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";
import LockIcon from "@mui/icons-material/Lock";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Ustawienia
      </Typography>

      <Paper elevation={2}>
        <List>
          {/* Tryb Ciemny */}
          <ListItem>
            <ListItemIcon>
              <DarkModeIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Tryb ciemny" 
              secondary="Zmień wygląd aplikacji na ciemny" 
            />
            <Switch 
              checked={darkMode} 
              onChange={() => setDarkMode(!darkMode)} 
            />
          </ListItem>
          

          <Divider variant="inset" component="li" />

          <ListItem button>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Prywatność i bezpieczeństwo" 
              secondary="Zmień hasło lub ustawienia widoczności" 
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Settings;