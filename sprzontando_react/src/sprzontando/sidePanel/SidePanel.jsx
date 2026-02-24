import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarList from "./SideBarList";
import DehazeOutlinedIcon from "@mui/icons-material/DehazeOutlined";

function SidePanel() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <DehazeOutlinedIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <SideBarList toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
}

export default SidePanel;
