import ImageIcon from "@mui/icons-material/Image";
import Box from "@mui/material/Box";

function ImagePlaceHolder() {
  return (
    <Box
      sx={{
        width: "240px",
        height: "180px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid lightGray ",
        borderRadius: 1,
      }}
    >
      <ImageIcon></ImageIcon>
    </Box>
  );
}

export default ImagePlaceHolder;
