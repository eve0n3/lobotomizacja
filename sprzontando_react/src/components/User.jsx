import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { PROFILE_LOCATION } from "../../utils/consts";
import { logoutUser } from "../../utils/utilis";

const ToolbarLoggedUser = ({ loggedUser }) => {
  const navigate = useNavigate();
  const username = loggedUser.username;

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    window.location.reload();
  };

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item>
        <Avatar
          sx={{ bgcolor: stringToColor(username), cursor: "pointer" }}
          onClick={() => navigate(PROFILE_LOCATION)}
        >
          {username.charAt(0).toUpperCase()}
        </Avatar>
      </Grid>
      <Grid item>
        <Typography variant="h6">{username}</Typography>
      </Grid>
      {loggedUser.role === "admin" && (
        <Grid item>
          <Chip label="admin" size="small" color="secondary" />
        </Grid>
      )}
      <Grid item>
        <Button color="inherit" onClick={handleLogout}>
          Wyloguj
        </Button>
      </Grid>
    </Grid>
  );
};
export default ToolbarLoggedUser;
