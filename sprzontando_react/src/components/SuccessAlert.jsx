import {
  Alert,
  AlertTitle,
  Box,
  Collapse,
  IconButton,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SuccessAlert = ({ message, open, onClose }) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={12000}
      onClose={(_, reason) => {
        if (reason === "clickaway") return;
        onClose();
      }}
    >
      <Alert
        severity="success"
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>Operacja zakończona sukcesem</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default SuccessAlert;
