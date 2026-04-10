import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { getLoggedUser } from "../../../utils/utilis";

import { useNavigate } from "react-router-dom";

function AddOffertButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    const isUserLogged = getLoggedUser();
    isUserLogged ? navigate("/addOffer") : navigate("/login");
  };

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
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
}

export default AddOffertButton;
