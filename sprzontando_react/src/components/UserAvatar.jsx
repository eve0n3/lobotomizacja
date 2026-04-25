import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const UserAvatar = ({ loggedUser }) => {
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

  return (
    <Grid item>
      <Avatar sx={{ bgcolor: stringToColor(username) }}>
        {username.charAt(0).toUpperCase()}{" "}
      </Avatar>
    </Grid>
  );
};
export default UserAvatar;
