import Container from "@mui/material/Container";
import CheckCircleOutlineOutlined from "@mui/icons-material/CheckCircleOutlineOutlined";
import RegisterForm from "./RegisterForm";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function SuccessRegister() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <Container>
      <CheckCircleOutlineOutlined />
      <Typography>Pomyślnie utworzono nowego użytkownika !</Typography>
      <Typography>Kliknij przycisk aby przejść na stronę logowania</Typography>
      <Button onClick={handleClick}>zaloguj się</Button>
    </Container>
  );
}

export default SuccessRegister;
