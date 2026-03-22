import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import { useState } from "react";

import SideBarList from "./SideBarList";
import DehazeOutlinedIcon from "@mui/icons-material/DehazeOutlined";
import Toolbar from "@mui/material/Toolbar";

function SidePanel() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => () => {
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={toggleDrawer()}>
        <DehazeOutlinedIcon />
      </Button>

      <Drawer
        variant="permanent"
        open={open}
        onClose={toggleDrawer()}
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        <Toolbar />
        <SideBarList toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
}

export default SidePanel;
