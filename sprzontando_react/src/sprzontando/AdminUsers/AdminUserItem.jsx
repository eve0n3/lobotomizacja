import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { banUserInDb } from "../../api/banUserInDb";
import { unbanUserInDb } from "../../api/unbanUserInDb";
import { sqlToPlDateTime } from "../../../utils/utilisTime";

function AdminUserItem({ user, onUserBanned }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [banDays, setBanDays] = useState("7");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setBanDays("7");
  };

  const calculateBanEndDate = (days) => {
    const date = new Date();
    const parsedDays = parseInt(days, 10);
    const daysToAdd = isNaN(parsedDays) ? 0 : parsedDays;
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString("sv-SE");
  };

  const handleBanUser = async () => {
    setIsLoading(true);
    const banEndDate = calculateBanEndDate(banDays);
    const response = await banUserInDb(user.id, banEndDate);

    if (response.success) {
      handleCloseDialog();
      window.location.reload();
    } else {
      alert("Błąd podczas banowania użytkownika: " + response.message);
    }
    setIsLoading(false);
  };

  const handleUnbanUser = async () => {
    setIsLoading(true);
    const response = await unbanUserInDb(user.id);
    if (response.success) {
      if (onUserBanned) {
        onUserBanned();
        window.location.reload();
      }
    } else {
      alert("Błąd podczas odbanowywania użytkownika: " + response.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          py: 1,
          px: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">{user.nazwa}</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap" }}>
            <Box>
              <Typography variant="body2" color="textSecondary">
                ID: {user.id}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="textSecondary">
                Ocena:
              </Typography>
              <Rating
                value={parseFloat(user.avgocena) || 0}
                precision={0.1}
                readOnly
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Zgłoszenia: {user.liczba_checi || 0}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Wykonane: {user.liczba_wykonan || 0}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Ogłoszenia: {user.liczba_ogloszen || 0}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Konto od: {sqlToPlDateTime(user.utworzenie) || 0}
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  backgroundColor: user.ban == 1 ? "#d32f2f" : "#1976d2",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  minWidth: "120px",
                  boxShadow: 2,
                }}
              >
                <Typography variant="body2">
                  {user.ban == 1 ? "Zbanowany" : "Niezbanowany"}
                </Typography>
              </Box>

              {user.ban == 1 && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 0.5,
                    fontSize: "0.75rem",
                    color: "#d32f2f",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Ban do: {sqlToPlDateTime(user.ban_end)}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={handleOpenDialog}
            sx={{ ml: 2 }}
          >
            Banuj
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={handleUnbanUser}
            sx={{ ml: 2 }}
            disabled={isLoading}
          >
            Odbanuj
          </Button>
        </Box>
      </ListItem>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Banuj użytkownika: {user.nazwa}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Liczba dni banu"
            type="number"
            value={banDays}
            onChange={(e) => setBanDays(e.target.value)}
            inputProps={{ min: "1", max: "365" }}
            helperText={`Ban do: ${calculateBanEndDate(banDays)}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={isLoading}>
            Anuluj
          </Button>
          <Button
            onClick={handleBanUser}
            variant="contained"
            color="error"
            disabled={isLoading}
          >
            {isLoading ? "Banowanie..." : "Potwierdź ban"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdminUserItem;
