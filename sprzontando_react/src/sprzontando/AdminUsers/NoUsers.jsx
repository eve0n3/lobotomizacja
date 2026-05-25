import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function NoUsers() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 300,
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" color="textSecondary">
        Brak użytkowników do wyświetlenia
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Wszyscy użytkownicy mają dobrą opinię ✓
      </Typography>
    </Box>
  );
}

export default NoUsers;
