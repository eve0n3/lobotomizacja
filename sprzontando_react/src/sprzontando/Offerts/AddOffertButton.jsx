import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";

function AddOffertButton() {
  return (
    <Tooltip title="Dodaj nowe ogłoszenie" placement="top" arrow>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 50,
          right: 50,
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
}

export default AddOffertButton;
