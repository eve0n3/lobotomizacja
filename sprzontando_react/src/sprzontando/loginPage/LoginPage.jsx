import Container from "@mui/material/Container";
import LoginForm from "./LoginForm";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <LoginForm></LoginForm>
      <Typography>Nie masz konta?</Typography>
      <Button onClick={() => navigate("/register")}>Stwórz je !</Button>
    </Container>
  );
}

export default LoginPage;
