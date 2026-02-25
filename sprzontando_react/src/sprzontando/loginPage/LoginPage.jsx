import Container from "@mui/material/Container";
import LoginForm from "./LoginForm";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <LoginForm></LoginForm>
      <Typography onClick={() => navigate("/register")}>
        Nie masz konta? Stwórz je !
      </Typography>
    </Container>
  );
}

export default LoginPage;
