import Container from "@mui/material/Container";
import LoginForm from "./LoginForm";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "../../styles/App.css"

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="login-page">
    <Container maxWidth="sm" className="login-container">
      <Typography variant="h4">
          Logowanie
        </Typography>
      <LoginForm></LoginForm>
    </Container>
    </div>
  );
}

export default LoginPage;
