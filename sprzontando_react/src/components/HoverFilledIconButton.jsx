import { IconButton } from "@mui/material";

function HoverFilledIconButton({ OutlineIcon, FilledIcon, onClick, ...props }) {
  return (
    <IconButton onClick={onClick} {...props}>
      <OutlineIcon className="outline" />
      <FilledIcon className="filled" />
    </IconButton>
  );
}
export default HoverFilledIconButton;
