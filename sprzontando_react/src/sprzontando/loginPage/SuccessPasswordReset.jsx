import Container from "@mui/material/Container";
import CheckCircleOutlineOutlined from "@mui/icons-material/CheckCircleOutlineOutlined";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function SuccessPasswordReset() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <Container>
      <CheckCircleOutlineOutlined />
      <Typography>Pomyślnie zmieniono hasło!</Typography>
      <Typography>Kliknij przycisk aby przejść na stronę logowania</Typography>
      <Button onClick={handleClick}>zaloguj się</Button>
    </Container>
  );
}

export default SuccessPasswordReset;
