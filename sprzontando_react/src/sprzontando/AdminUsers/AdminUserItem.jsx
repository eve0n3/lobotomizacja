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
    date.setDate(date.getDate() + parseInt(days));
    return date.toISOString().split("T")[0];
  };

  const handleBanUser = async () => {
    setIsLoading(true);
    const banEndDate = calculateBanEndDate(banDays);
    const response = await banUserInDb(user.id, banEndDate);

    if (response.success) {
      onUserBanned(user.id);
      handleCloseDialog();
    } else {
      alert("Błąd podczas banowania użytkownika: " + response.message);
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
          </Box>
        </Box>
        <Button
          variant="contained"
          color="error"
          onClick={handleOpenDialog}
          sx={{ ml: 2 }}
        >
          Banuj
        </Button>
      </ListItem>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
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
